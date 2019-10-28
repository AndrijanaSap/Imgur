import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AlbumsService } from './albums.service';
import { BehaviorSubject } from 'rxjs';
import { UploadImageService } from './upload-image.service';
import { User } from '../models/user.model';
var AuthService = /** @class */ (function () {
    function AuthService(http, route, router, albumService, uploadService) {
        var _this = this;
        this.http = http;
        this.route = route;
        this.router = router;
        this.albumService = albumService;
        this.uploadService = uploadService;
        this.isLoggedIn = false;
        this.isImageSliderOpen = new BehaviorSubject(false);
        this.canUnlockButtonsOnImage = new BehaviorSubject(false);
        this.user = new BehaviorSubject(new User('Username', '../../assets/photos/avatar.png'));
        // zacuvuvanje na token i username vo session storage
        console.log('konstruktor na getSErvice');
        var url = window.location.href;
        var token;
        var username;
        if (url.includes('#')) {
            var httpParams = new HttpParams({ fromString: url.split('#')[1] });
            this.token = httpParams.get('access_token');
            this.username = httpParams.get('account_username');
            sessionStorage.setItem('token', this.token);
            sessionStorage.setItem('username', this.username);
            this.isLoggedIn = true;
            this.router.navigate(['/', 'hot']);
        }
        this.updateIsLoggedIn();
        console.log(this.isLoggedIn);
        if (this.isLoggedIn) {
            var userName_1 = sessionStorage.getItem('username');
            this.http.get('https://api.imgur.com/3/account/' + userName_1 + '/avatar').subscribe(function (value) {
                _this.user.next(new User(userName_1, value['data'].avatar));
            }, function (err) { return console.log('ne e najaven'); });
        }
        // pri sekoja promena na rutata go predavame soodvetniot top hot ili user
        router.events.pipe(filter(function (event) { return event instanceof NavigationEnd; })).subscribe(function (event) {
            console.log(event.url);
            _this.updateIsLoggedIn();
            if (!_this.isLoggedIn) {
                _this.router.navigateByUrl('/login');
            }
            if (_this.isLoggedIn && (event.url == '/hot' || event.url == '/top')) {
                _this.isImageSliderOpen.next(false);
            }
            if (_this.isLoggedIn && (event.url == '/user')) {
                _this.isImageSliderOpen.next(false);
                _this.albumService.getAccountAlbums(sessionStorage.getItem('username'));
            }
            if (event.url.startsWith('/hot/') || event.url.startsWith('/top/') || event.url.startsWith('/user/')) {
                _this.canUnlockButtonsOnImage.next(event.url.startsWith('/user/'));
                _this.isImageSliderOpen.next(true);
            }
            if (event.url == '/logout') {
                _this.isLoggedIn = false;
                sessionStorage.clear();
                _this.router.navigateByUrl('/login');
            }
        });
    }
    AuthService.prototype.updateIsLoggedIn = function () {
        if (sessionStorage.getItem('token')) {
            this.isLoggedIn = true;
        }
        else {
            this.isLoggedIn = false;
        }
    };
    AuthService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient,
            ActivatedRoute,
            Router,
            AlbumsService,
            UploadImageService])
    ], AuthService);
    return AuthService;
}());
export { AuthService };
//# sourceMappingURL=auth.service.js.map