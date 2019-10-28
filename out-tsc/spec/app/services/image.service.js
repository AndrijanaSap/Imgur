import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { AlbumsService } from './albums.service';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
var ImageService = /** @class */ (function () {
    function ImageService(albumService, router, authService) {
        this.albumService = albumService;
        this.router = router;
        this.authService = authService;
    }
    ImageService.prototype.closeImageSlider = function () {
        this.authService.isImageSliderOpen.next(false);
        var url = location.href;
        url = url.slice(url.indexOf('/'), url.lastIndexOf('/'));
        url = url.slice(url.lastIndexOf('/'));
        this.router.navigateByUrl(url);
    };
    ImageService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [AlbumsService,
            Router,
            AuthService])
    ], ImageService);
    return ImageService;
}());
export { ImageService };
//# sourceMappingURL=image.service.js.map