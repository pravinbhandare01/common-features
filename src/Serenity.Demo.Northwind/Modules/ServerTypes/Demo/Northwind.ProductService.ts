﻿import { SaveRequest, SaveResponse, DeleteRequest, DeleteResponse, RetrieveRequest, RetrieveResponse, ListRequest, ListResponse } from "@serenity-is/corelib";
import { ProductRow } from "./Northwind.ProductRow";
import { ServiceOptions, serviceRequest } from "@serenity-is/corelib/q";

export namespace ProductService {
    export const baseUrl = 'Serenity.Demo.Northwind/Product';

    export declare function Create(request: SaveRequest<ProductRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Update(request: SaveRequest<ProductRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<ProductRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<ProductRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;

    export const Methods = {
        Create: "Serenity.Demo.Northwind/Product/Create",
        Update: "Serenity.Demo.Northwind/Product/Update",
        Delete: "Serenity.Demo.Northwind/Product/Delete",
        Retrieve: "Serenity.Demo.Northwind/Product/Retrieve",
        List: "Serenity.Demo.Northwind/Product/List"
    } as const;

    [
        'Create', 
        'Update', 
        'Delete', 
        'Retrieve', 
        'List'
    ].forEach(x => {
        (<any>ProductService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}
