﻿import { Gender } from "./Northwind.Gender";
import { getLookup, getLookupAsync, fieldsProxy } from "@serenity-is/corelib/q";

export interface EmployeeRow {
    EmployeeID?: number;
    LastName?: string;
    FirstName?: string;
    FullName?: string;
    Title?: string;
    TitleOfCourtesy?: string;
    BirthDate?: string;
    HireDate?: string;
    Address?: string;
    City?: string;
    Region?: string;
    PostalCode?: string;
    Country?: string;
    HomePhone?: string;
    Extension?: string;
    Photo?: number[];
    Notes?: string;
    ReportsTo?: number;
    PhotoPath?: string;
    ReportsToFullName?: string;
    ReportsToLastName?: string;
    ReportsToFirstName?: string;
    ReportsToTitle?: string;
    ReportsToTitleOfCourtesy?: string;
    ReportsToBirthDate?: string;
    ReportsToHireDate?: string;
    ReportsToAddress?: string;
    ReportsToCity?: string;
    ReportsToRegion?: string;
    ReportsToPostalCode?: string;
    ReportsToCountry?: string;
    ReportsToHomePhone?: string;
    ReportsToExtension?: string;
    ReportsToPhoto?: number[];
    ReportsToNotes?: string;
    ReportsToReportsTo?: number;
    ReportsToPhotoPath?: string;
    Gender?: Gender;
}

export abstract class EmployeeRow {
    static readonly idProperty = 'EmployeeID';
    static readonly nameProperty = 'FullName';
    static readonly localTextPrefix = 'Northwind.Employee';
    static readonly lookupKey = 'Northwind.Employee';

    /** @deprecated use getLookupAsync instead */
    static getLookup() { return getLookup<EmployeeRow>('Northwind.Employee') }
    static async getLookupAsync() { return getLookupAsync<EmployeeRow>('Northwind.Employee') }

    static readonly deletePermission = 'Northwind:General';
    static readonly insertPermission = 'Northwind:General';
    static readonly readPermission = 'Northwind:General';
    static readonly updatePermission = 'Northwind:General';

    static readonly Fields = fieldsProxy<EmployeeRow>();
}
