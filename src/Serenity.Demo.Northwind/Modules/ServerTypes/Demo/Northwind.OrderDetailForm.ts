﻿import { LookupEditor, DecimalEditor, IntegerEditor, PrefixedContext } from "@serenity-is/corelib";
import { initFormType } from "@serenity-is/corelib/q";

export interface OrderDetailForm {
    ProductID: LookupEditor;
    UnitPrice: DecimalEditor;
    Quantity: IntegerEditor;
    Discount: DecimalEditor;
}

export class OrderDetailForm extends PrefixedContext {
    static formKey = 'Northwind.OrderDetail';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!OrderDetailForm.init)  {
            OrderDetailForm.init = true;

            var w0 = LookupEditor;
            var w1 = DecimalEditor;
            var w2 = IntegerEditor;

            initFormType(OrderDetailForm, [
                'ProductID', w0,
                'UnitPrice', w1,
                'Quantity', w2,
                'Discount', w1
            ]);
        }
    }
}
