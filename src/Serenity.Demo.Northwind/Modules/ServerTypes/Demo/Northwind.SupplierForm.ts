﻿import { StringEditor, PrefixedContext } from "@serenity-is/corelib";
import { initFormType } from "@serenity-is/corelib/q";

export interface SupplierForm {
    CompanyName: StringEditor;
    ContactName: StringEditor;
    ContactTitle: StringEditor;
    Address: StringEditor;
    Region: StringEditor;
    PostalCode: StringEditor;
    Country: StringEditor;
    City: StringEditor;
    Phone: StringEditor;
    Fax: StringEditor;
    HomePage: StringEditor;
}

export class SupplierForm extends PrefixedContext {
    static formKey = 'Northwind.Supplier';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!SupplierForm.init)  {
            SupplierForm.init = true;

            var w0 = StringEditor;

            initFormType(SupplierForm, [
                'CompanyName', w0,
                'ContactName', w0,
                'ContactTitle', w0,
                'Address', w0,
                'Region', w0,
                'PostalCode', w0,
                'Country', w0,
                'City', w0,
                'Phone', w0,
                'Fax', w0,
                'HomePage', w0
            ]);
        }
    }
}
