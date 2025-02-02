﻿using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = Serenity.Demo.Northwind.RegionRow;

namespace Serenity.Demo.Northwind
{
    public interface IRegionDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

    public class RegionDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, IRegionDeleteHandler
    {
        public RegionDeleteHandler(IRequestContext context)
             : base(context)
        {
        }
    }
}