﻿import { LookupFilterByMultipleDialog } from "@/Editors/LookupFilterByMultipleValues/LookupFilterByMultipleDialog";
import { Decorators, EntityGrid } from "@serenity-is/corelib";
import { coalesce, first, formatNumber } from "@serenity-is/corelib/q";
import { ProductRow, ProductColumns, ProductService } from "@serenity-is/demo.northwind";
import { Aggregators } from "@serenity-is/corelib/slick";

@Decorators.registerClass('Serenity.Demo.BasicSamples.GroupingAndSummariesInGrid')
export class GroupingAndSummariesInGrid extends EntityGrid<ProductRow, any> {

    protected getColumnsKey() { return ProductColumns.columnsKey; }
    protected getDialogType() { return LookupFilterByMultipleDialog; }
    protected getIdProperty() { return ProductRow.idProperty; }
    protected getLocalTextPrefix() { return ProductRow.localTextPrefix; }
    protected getService() { return ProductService.baseUrl; }

    constructor(container: JQuery) {
        super(container);
    }

    protected createSlickGrid() {
        var grid = super.createSlickGrid();

        // need to register this plugin for grouping or you'll have errors
        grid.registerPlugin(new Slick.Data.GroupItemMetadataProvider());

        this.view.setSummaryOptions({
            aggregators: [
                new Aggregators.Avg('UnitPrice'),
                new Aggregators.Sum('UnitsInStock'),
                new Aggregators.Max('UnitsOnOrder'),
                new Aggregators.Avg('ReorderLevel')
            ]
        });

        return grid;
    }

    protected getColumns() {
        var columns = super.getColumns();

        first(columns, x => x.field === 'UnitsOnOrder')
            .groupTotalsFormatter = (totals, col) =>
                (totals.max ? ('max: ' + coalesce(totals.max[col.field], '')) : '');

        first(columns, x => x.field === 'ReorderLevel')
            .groupTotalsFormatter = (totals, col) =>
                (totals.avg ? ('avg: ' + coalesce(formatNumber(totals.avg[col.field], '0.'), '')) : '');

        return columns;
    }

    protected getSlickOptions() {
        var opt = super.getSlickOptions();
        opt.showFooterRow = true;
        return opt;
    }

    protected usePager() {
        return false;
    }

    protected getButtons() {
        return [{
            title: 'Group By Category',
            cssClass: 'expand-all-button',
            onClick: () => this.view.setGrouping(
                [{
                    getter: 'CategoryName'
                }])
        },
        {
            title: 'Group By Category and Supplier',
            cssClass: 'expand-all-button',
            onClick: () => this.view.setGrouping(
                [{
                    formatter: x => 'Category: ' + x.value + ' (' + x.count + ' items)',
                    getter: 'CategoryName'
                }, {
                    formatter: x => 'Supplier: ' + x.value + ' (' + x.count + ' items)',
                    getter: 'SupplierCompanyName'
                }])
        }, {
            title: 'No Grouping',
            cssClass: 'collapse-all-button',
            onClick: () => this.view.setGrouping([])
        }];
    }
}