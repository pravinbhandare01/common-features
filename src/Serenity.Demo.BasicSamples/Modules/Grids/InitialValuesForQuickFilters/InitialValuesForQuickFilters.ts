﻿import { DateEditor, Decorators, EnumEditor, LookupEditor, QuickFilter, Widget } from "@serenity-is/corelib";
import { first } from "@serenity-is/corelib/q";
import { OrderRow, OrderGrid, OrderShippingState } from "@serenity-is/demo.northwind";

// get a reference to order row field names
const fld = OrderRow.Fields;

@Decorators.registerClass('Serenity.Demo.BasicSamples.InitialValuesForQuickFilters')
export class InitialValuesForQuickFilters extends OrderGrid {

    constructor(container: JQuery) {
        super(container);
    }

    /**
     * This method is called to get list of quick filters to be created for this grid.
     * By default, it returns quick filter objects corresponding to properties that
     * have a [QuickFilter] attribute at server side OrderColumns.cs
     */
    protected getQuickFilters(): QuickFilter<Widget<any>, any>[] {

        // get quick filter list from base class
        let filters = super.getQuickFilters();

        // quick filter init method is a good place to set initial
        // value for a quick filter editor, just after it is created

        first(filters, x => x.field == fld.OrderDate).init = w => {
            // w is a reference to the editor for this quick filter widget
            // here we cast it to DateEditor, and set its value as date.
            // note that in Javascript, months are 0 based, so date below
            // is actually 2016-05-01
            (w as DateEditor).valueAsDate = new Date(2010, 4, 1);

            // setting start date was simple. but this quick filter is actually
            // a combination of two date editors. to get reference to second one,
            // need to find its next sibling element by its class
            let endDate = w.element.nextAll(".s-DateEditor").getWidget(DateEditor);
            endDate.valueAsDate = new Date(2020, 6, 1);
        };

        first(filters, x => x.field == fld.ShippingState).init = w => {
            // enum editor has a string value, so need to call toString()
            (w as EnumEditor).value = OrderShippingState.NotShipped.toString()
        };

        return filters;
    }

    /**
     * This method is another possible place to modify quick filter widgets.
     * It is where the quick filter widgets are actually created.
     * 
     * By default, it calls getQuickFilters() then renders UI for these
     * quick filters.
     *
     * We could use getQuickFilters() method for ShipVia too,
     * but this is for demonstration purposes
     */
    protected createQuickFilters(): void {

        // let base class to create quick filters first
        super.createQuickFilters();

        // find a quick filter widget by its field name
        this.findQuickFilter(LookupEditor, fld.ShipVia).values = ["1", "2"];
    }
}