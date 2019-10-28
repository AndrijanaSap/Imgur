import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Album } from '../models/album.model';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Image } from '../models/image.model';
import { map } from 'rxjs/operators';
var AlbumsService = /** @class */ (function () {
    function AlbumsService(http) {
        this.http = http;
        this.url = 'https://api.imgur.com/3';
        this.albums = new Subject();
        this.accountAlbums = new Subject();
        this.imagesOfOther = new Subject();
    }
    AlbumsService.prototype.getGallery = function (parameter, numOfPage) {
        return this.http.get(this.url + '/gallery/' + parameter + '/viral/' + numOfPage + '.json').pipe(map(function (value) {
            return value['data'].map(function (album) {
                if (album['images'] != undefined) {
                    var tempAlbum = new Album();
                    tempAlbum.deserializeAlbum(album);
                    return tempAlbum;
                }
            });
        }));
    };
    AlbumsService.prototype.getAccountAlbums = function (username) {
        var _this = this;
        var albumIds;
        var imagesIds = [];
        var allImagesIds = [];
        var imagesOfAlbumOther = [];
        var idsOfNonAlbumImages = [];
        var albums = [];
        var index = 0;
        this.http.get(this.url + '/account/' + username + '/images/ids').subscribe(function (listOfIds) {
            // console.log(listOfIds['data']);
            allImagesIds = listOfIds['data'];
        }, function (err) {
        }, function () {
            _this.http.get(_this.url + '/account/' + username + '/albums/ids').subscribe(function (value) {
                albumIds = value['data'];
                albumIds.forEach(function (albumId) {
                    _this.http.get(_this.url + '/account/' + username + '/album/' + albumId).subscribe(function (album) {
                        index++;
                        if (album['data']['images'][0]) {
                            var tempAlbum = new Album();
                            tempAlbum.deserializeAlbum(album['data']);
                            imagesIds = imagesIds.concat(tempAlbum.imagesIds);
                            albums.push(tempAlbum);
                        }
                    }, function (error1) {
                    }, function () {
                        if (albumIds.length == index) {
                            idsOfNonAlbumImages = allImagesIds.filter(function (id) {
                                return imagesIds.indexOf(id) == -1;
                            });
                            var albumOther_1 = new Album('Other', 'Other', 'Non-album images');
                            albumOther_1.images = [];
                            _this.http.get(_this.url + '/account/' + username + '/images').subscribe(function (image) {
                                image['data'].forEach(function (val) {
                                    if (idsOfNonAlbumImages.indexOf(val.id) != -1) {
                                        var tempImage = new Image();
                                        tempImage.deserializeImage(val);
                                        albumOther_1.images.push(tempImage);
                                    }
                                });
                            }, function () {
                            }, function () {
                                albumOther_1.cover = albumOther_1.images[0].link;
                                _this.imagesOfOther.next(albumOther_1.images);
                                albums.push(albumOther_1);
                            });
                        }
                    });
                });
                _this.accountAlbums.next(albums);
            }, function (error1) {
                console.log('error', error1);
            });
        });
    };
    AlbumsService.prototype.getAlbumImages = function (albumId) {
        return this.http.get(this.url + '/album/' + albumId).pipe(map(function (value) {
            return value['data']['images'].map(function (image) {
                var tempImage = new Image();
                tempImage.deserializeImage(image);
                return tempImage;
            });
        }));
    };
    AlbumsService.prototype.getAccountAlbumsTitles = function (username) {
        return this.http.get(this.url + '/account/' + username + '/albums').pipe(map(function (value) {
            return value['data'].map(function (val) {
                return val.title;
            });
        }));
    };
    AlbumsService.prototype.getAccountAlbumsTitlesAndIds = function (username) {
        return this.http.get(this.url + '/account/' + username + '/albums').pipe(map(function (value) {
            return value['data'].map(function (val) {
                var tempAlbum = new Album();
                tempAlbum.deserializeAlbumTitleAndIdOnly(val);
                return tempAlbum;
            });
        }));
    };
    AlbumsService.prototype.getAccountAlbumsIds = function (username) {
        return this.http.get(this.url + '/account/' + username + '/albums/ids').pipe(map(function (value) {
            console.log(value);
            return value['data'].map(function (val) {
                return val;
            });
        }));
    };
    AlbumsService.prototype.createAlbum = function (titleOfAlbum) {
        var formDataAlbum = new FormData();
        formDataAlbum.append('title', titleOfAlbum);
        return this.http.post(this.url + '/album', formDataAlbum).pipe(map(function (value) {
            return value['data'].id;
        }));
    };
    AlbumsService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], AlbumsService);
    return AlbumsService;
}());
export { AlbumsService };
//# sourceMappingURL=albums.service.js.map