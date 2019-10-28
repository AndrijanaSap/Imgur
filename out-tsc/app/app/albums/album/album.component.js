import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { Album } from '../../models/album.model';
var AlbumComponent = /** @class */ (function () {
    function AlbumComponent() {
    }
    AlbumComponent.prototype.ngOnInit = function () {
        this.currAlbum = this.source;
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Album)
    ], AlbumComponent.prototype, "source", void 0);
    AlbumComponent = tslib_1.__decorate([
        Component({
            selector: 'app-album',
            templateUrl: './album.component.html',
            styleUrls: ['./album.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], AlbumComponent);
    return AlbumComponent;
}());
export { AlbumComponent };
//# sourceMappingURL=album.component.js.map