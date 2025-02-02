﻿using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = Serenity.Demo.Northwind.TerritoryRow;

namespace Serenity.Demo.Northwind
{
    public interface ITerritoryDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

    public class TerritoryDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, ITerritoryDeleteHandler
    {
        public TerritoryDeleteHandler(IRequestContext context)
             : base(context)
        {
        }
    }
}