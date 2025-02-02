﻿import { SaveRequest, SaveResponse, DeleteRequest, DeleteResponse, RetrieveRequest, RetrieveResponse, ListRequest, ListResponse } from "@serenity-is/corelib";
import { ShipperRow } from "./Northwind.ShipperRow";
import { ServiceOptions, serviceRequest } from "@serenity-is/corelib/q";

export namespace ShipperService {
    export const baseUrl = 'Serenity.Demo.Northwind/Shipper';

    export declare function Create(request: SaveRequest<ShipperRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Update(request: SaveRequest<ShipperRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<ShipperRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<ShipperRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;

    export const Methods = {
        Create: "Serenity.Demo.Northwind/Shipper/Create",
        Update: "Serenity.Demo.Northwind/Shipper/Update",
        Delete: "Serenity.Demo.Northwind/Shipper/Delete",
        Retrieve: "Serenity.Demo.Northwind/Shipper/Retrieve",
        List: "Serenity.Demo.Northwind/Shipper/List"
    } as const;

    [
        'Create', 
        'Update', 
        'Delete', 
        'Retrieve', 
        'List'
    ].forEach(x => {
        (<any>ShipperService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}
