import { TemplatedDialog, WX } from "@serenity-is/corelib";
import { confirm, text } from "@serenity-is/corelib/q";

export namespace DialogUtils {
    export function pendingChangesConfirmation(element: JQuery, hasPendingChanges: () => boolean) {
        element.on('dialogbeforeclose panelbeforeclose', function (e) {
            if (!WX.hasOriginalEvent(e) || !hasPendingChanges()) {
                return;
            }

            e.preventDefault();
            confirm(text('Site.Dialogs.PendingChangesConfirmation'),
                () => element.find('div.save-and-close-button').click(),
                {
                    onNo: function () {
                        if (element.hasClass('ui-dialog-content'))
                            element.dialog('close');
                        else if (element.hasClass('s-Panel'))
                            TemplatedDialog.closePanel(element);
                    }
                });
        });
    }
}
