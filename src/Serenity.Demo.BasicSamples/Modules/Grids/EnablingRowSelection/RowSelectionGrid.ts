﻿import { Decorators } from "@serenity-is/corelib";
import { SupplierRow, SupplierColumns, SupplierDialog, SupplierService } from "@serenity-is/demo.northwind";
import { SelectableEntityGrid } from "@serenity-is/extensions";

@Decorators.registerClass('Serenity.Demo.BasicSamples.RowSelectionGrid')
export class RowSelectionGrid extends SelectableEntityGrid<SupplierRow, any> {
    protected getColumnsKey() { return SupplierColumns.columnsKey; }
    protected getDialogType() { return <any>SupplierDialog; }
    protected getIdProperty() { return SupplierRow.idProperty; }
    protected getLocalTextPrefix() { return SupplierRow.localTextPrefix; }
    protected getService() { return SupplierService.baseUrl; }
}