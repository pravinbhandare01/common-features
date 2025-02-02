﻿using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<Serenity.Demo.Northwind.ProductLangRow>;
using MyRow = Serenity.Demo.Northwind.ProductLangRow;

namespace Serenity.Demo.Northwind
{
    public interface IProductLangRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

    public class ProductLangRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, IProductLangRetrieveHandler
    {
        public ProductLangRetrieveHandler(IRequestContext context)
             : base(context)
        {
        }
    }
}