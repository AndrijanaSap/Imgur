import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { AlbumsService } from '../services/albums.service';
import { AuthService } from '../services/auth.service';
var AlbumsComponent = /** @class */ (function () {
    function AlbumsComponent(albumService, authService) {
        this.albumService = albumService;
        this.authService = authService;
        this.albums = [];
        this.hiddenAlbums = [];
        this.numOfPage = 0;
        this.showLoading = false;
        this.albums = [];
    }
    AlbumsComponent.prototype.ngOnInit = function () {
        var _this = this;
        var section = location.href.slice(location.href.lastIndexOf('/') + 1);
        if (section == 'hot' || section == 'top') {
            this.albumService.getGallery(section, this.numOfPage).subscribe(function (val) {
                var filtered = val.filter(function (element) { return element !== undefined; });
                _this.albums = filtered.slice(0, 18);
                _this.hiddenAlbums = filtered.slice(18);
            });
        }
        else {
            this.albumService.accountAlbums.subscribe(function (val) {
                _this.albums = val;
            });
        }
    };
    AlbumsComponent.prototype.onScroll = function (event) {
        var _this = this;
        // visible height + pixel scrolled >= total height
        if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight) {
            console.log('End');
            console.log(this.albums);
            if (this.hiddenAlbums.length >= 18) {
                this.showLoading = true;
                this.albums = this.albums.concat(this.hiddenAlbums.slice(0, 18));
                this.hiddenAlbums = this.hiddenAlbums.slice(18);
                this.showLoading = false;
            }
            else {
                this.numOfPage += 1;
                console.log(this.numOfPage);
                var section = location.href.slice(location.href.lastIndexOf('/') + 1);
                if (section == 'hot' || section == 'top') {
                    this.showLoading = true;
                    this.albumService.getGallery(section, this.numOfPage).subscribe(function (val) {
                        var filtered = val.filter(function (element) { return element !== undefined; });
                        _this.hiddenAlbums = _this.hiddenAlbums.concat(filtered);
                        _this.albums = _this.albums.concat(_this.hiddenAlbums.slice(0, 18));
                        _this.hiddenAlbums = _this.hiddenAlbums.slice(18);
                    });
                }
                else {
                    this.albumService.accountAlbums.subscribe(function (val) {
                        _this.albums = val;
                    });
                }
            }
        }
    };
    AlbumsComponent = tslib_1.__decorate([
        Component({
            selector: 'app-albums',
            templateUrl: './albums.component.html',
            styleUrls: ['./albums.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [AlbumsService, AuthService])
    ], AlbumsComponent);
    return AlbumsComponent;
}());
export { AlbumsComponent };
//# sourceMappingURL=albums.component.js.map