﻿using Serenity.Data;
using Serenity.Services;
using System;
using System.Data;
using System.Globalization;
using MyRow = Serenity.Extensions.Entities.UserPreferenceRow;

namespace Serenity.Extensions.Repositories
{
    public class UserPreferenceRepository : BaseRepository
    {
        public UserPreferenceRepository(IRequestContext context)
             : base(context)
        {
        }

        public SaveResponse Update(IUnitOfWork uow, UserPreferenceUpdateRequest request)
        {
            if (request is null)
                throw new ArgumentNullException(nameof(request));
            if (request.Name is null)
                throw new ArgumentNullException(nameof(request.Name));
            if (request.PreferenceType is null)
                throw new ArgumentNullException(nameof(request.PreferenceType));

            var userId = Convert.ToInt32(Context.User.GetIdentifier(), CultureInfo.InvariantCulture);
            var fld = MyRow.Fields;

            var criteria = fld.UserId == userId &
                fld.PreferenceType == request.PreferenceType &
                fld.Name == request.Name;

            if (string.IsNullOrEmpty(request.Value))
            {
                new SqlDelete(fld.TableName)
                    .Where(criteria)
                    .Execute(uow.Connection, ExpectedRows.ZeroOrOne);

                return new SaveResponse();
            }

            if (new SqlUpdate(fld.TableName)
                    .Set(fld.Value, request.Value)
                    .Where(criteria)
                    .Execute(uow.Connection, ExpectedRows.ZeroOrOne) == 0)
            {
                try
                {
                    new SqlInsert(fld.TableName)
                        .Set(fld.UserId, userId)
                        .Set(fld.PreferenceType, request.PreferenceType)
                        .Set(fld.Name, request.Name)
                        .Set(fld.Value, request.Value)
                        .Execute(uow.Connection);
                }
                catch
                {
                    // retry update in case a race condition resulted in
                    // unique index violation during insert
                    if (new SqlUpdate(fld.TableName)
                        .Set(fld.Value, request.Value)
                        .Where(criteria)
                        .Execute(uow.Connection, ExpectedRows.ZeroOrOne) == 0)
                    {
                        // re-throw if the issue was not actually that
                        throw;
                    }
                }
            }

            return new SaveResponse();
        }

        public UserPreferenceRetrieveResponse Retrieve(IDbConnection connection, UserPreferenceRetrieveRequest request)
        {
            if (request is null)
                throw new ArgumentNullException(nameof(request));
            if (request.Name is null)
                throw new ArgumentNullException("name");
            if (request.PreferenceType is null)
                throw new ArgumentNullException("preferenceType");

            var fld = MyRow.Fields;
            var userId = Convert.ToInt32(Context.User.GetIdentifier(), CultureInfo.InvariantCulture);
            var row = connection.TryFirst<MyRow>(
                fld.UserId == userId &
                fld.PreferenceType == request.PreferenceType &
                fld.Name == request.Name);

            if (row == null)
                return new UserPreferenceRetrieveResponse();

            return new UserPreferenceRetrieveResponse
            {
                Value = row.Value
            };
        }
    }
}