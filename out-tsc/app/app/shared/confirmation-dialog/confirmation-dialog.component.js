import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
var ConfirmationDialogComponent = /** @class */ (function () {
    function ConfirmationDialogComponent(dialogRef, message) {
        this.dialogRef = dialogRef;
        this.message = message;
    }
    ConfirmationDialogComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    ConfirmationDialogComponent = tslib_1.__decorate([
        Component({
            selector: 'app-confirmation-dialog',
            templateUrl: './confirmation-dialog.component.html',
            styleUrls: ['./confirmation-dialog.component.css']
        }),
        tslib_1.__param(1, Inject(MAT_DIALOG_DATA)),
        tslib_1.__metadata("design:paramtypes", [MatDialogRef, String])
    ], ConfirmationDialogComponent);
    return ConfirmationDialogComponent;
}());
export { ConfirmationDialogComponent };
//# sourceMappingURL=confirmation-dialog.component.js.map