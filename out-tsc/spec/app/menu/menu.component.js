import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UploadImageService } from '../services/upload-image.service';
var MenuComponent = /** @class */ (function () {
    function MenuComponent(authService, uploadImageService) {
        this.authService = authService;
        this.uploadImageService = uploadImageService;
        this.toggleSidenav = false;
        this.avatar = '../../assets/photos/avatar.png';
        this.username = 'Username';
    }
    MenuComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.authService.user.subscribe(function (user) {
            console.log('on init menu');
            _this.username = user.userName;
            _this.avatar = user.avatar;
        });
    };
    MenuComponent.prototype.onClickAddnewImage = function () {
        this.uploadImageService.comingFromAlbum.next('Other');
    };
    MenuComponent.prototype.onClickLogout = function () {
        this.avatar = '../../assets/photos/avatar.png';
        this.username = 'Username';
    };
    MenuComponent = tslib_1.__decorate([
        Component({
            selector: 'app-menu',
            templateUrl: './menu.component.html',
            styleUrls: ['./menu.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [AuthService, UploadImageService])
    ], MenuComponent);
    return MenuComponent;
}());
export { MenuComponent };
//# sourceMappingURL=menu.component.js.map