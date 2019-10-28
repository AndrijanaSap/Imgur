import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { AlbumsService } from '../../services/albums.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ImageService } from '../../services/image.service';
import { SwiperComponent } from 'ngx-useful-swiper';
import { HttpClient } from '@angular/common/http';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material';
import { UploadImageService } from '../../services/upload-image.service';
import { BehaviorSubject } from 'rxjs';
import * as _ from 'lodash';
var ImagesComponent = /** @class */ (function () {
    function ImagesComponent(albumService, router, authService, imageService, http, dialog, uploadImageService) {
        this.albumService = albumService;
        this.router = router;
        this.authService = authService;
        this.imageService = imageService;
        this.http = http;
        this.dialog = dialog;
        this.uploadImageService = uploadImageService;
        this.imagesFromAlbum = [];
        this.editMode = false;
        this.title = 'angular-confirmation-dialog';
        this.indexOfCurrentSlide = new BehaviorSubject(0);
        this.imagesFromAlbumCopy = [];
    }
    ImagesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.config = {
            pagination: {
                el: '.swiper-pagination',
            },
            paginationClickable: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            spaceBetween: 30
        };
        var albumId = location.href.slice(location.href.lastIndexOf('/') + 1);
        this.albumService.getAlbumImages(albumId).subscribe(function (val) {
            _this.imagesFromAlbum = val;
            _this.imagesFromAlbumCopy = _.cloneDeep(val);
        });
        console.log(this.titleValue, this.descriptionValue);
    };
    ImagesComponent.prototype.onClickEdit = function () {
        this.exitEditMode(false);
    };
    ImagesComponent.prototype.onClickSave = function () {
        this.indexOfCurrSlide = this.instanceOfSwiper.swiper.activeIndex;
        this.exitEditMode(true);
        //ako go smenil opisot ili naslovot napravi post
        var elementDescription = document.querySelectorAll('.swiper-slide-active textarea').item(0);
        var elementTitle = document.querySelectorAll('.swiper-slide-active textarea').item(1);
        if (this.imagesFromAlbum[this.indexOfCurrSlide].description != elementDescription.value.toString().trim() ||
            this.imagesFromAlbum[this.indexOfCurrSlide].title != elementTitle.value.toString().trim()) {
            var form = new FormData();
            if (this.imagesFromAlbum[this.indexOfCurrSlide].description != elementDescription.value.toString().trim()) {
                // neka se napravi post!!!
                console.log('razlicni se desc', this.imagesFromAlbum[this.indexOfCurrSlide].description, elementDescription.value.toString().trim());
                form.append('description', elementDescription.value.toString().trim());
            }
            var elementTitle_1 = document.querySelectorAll('.swiper-slide-active textarea').item(1);
            if (this.imagesFromAlbum[this.indexOfCurrSlide].title != elementTitle_1.value.toString().trim()) {
                // neka se napravi post!!!
                console.log('razlicni se title', this.imagesFromAlbum[this.indexOfCurrSlide].title, elementTitle_1.value.toString().trim());
                form.append('title', elementTitle_1.value.toString().trim());
            }
            this.http.post('https://api.imgur.com/3/image/' + this.imagesFromAlbum[this.indexOfCurrSlide].id, form).subscribe();
        }
    };
    ImagesComponent.prototype.onClickCancel = function () {
        this.indexOfCurrSlide = this.instanceOfSwiper.swiper.activeIndex;
        this.exitEditMode(true);
        var elementDescription = document.querySelectorAll('.swiper-slide-active textarea').item(0);
        var elementTitle = document.querySelectorAll('.swiper-slide-active textarea').item(1);
        console.log(this.imagesFromAlbum[this.indexOfCurrSlide].description, 'od album', elementDescription.value.toString().trim(), 'lokalno');
        if (this.imagesFromAlbum[this.indexOfCurrSlide].description != elementDescription.value.toString().trim()) {
            elementDescription.value = this.imagesFromAlbum[this.indexOfCurrSlide].description;
        }
        if (this.imagesFromAlbum[this.indexOfCurrSlide].title != elementTitle.value.toString().trim()) {
            elementTitle.value = this.imagesFromAlbum[this.indexOfCurrSlide].title;
        }
    };
    ImagesComponent.prototype.exitEditMode = function (status) {
        this.editMode = !status;
        this.instanceOfSwiper.swiper.allowSlideNext = status;
        this.instanceOfSwiper.swiper.allowSlidePrev = status;
        var elementDescription = document.querySelectorAll('.swiper-slide-active textarea').item(0);
        elementDescription.disabled = status;
        var elementTitle = document.querySelectorAll('.swiper-slide-active textarea').item(1);
        elementTitle.disabled = status;
    };
    ImagesComponent.prototype.openDialog = function () {
        var _this = this;
        var dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            width: '350px',
            data: 'Are you sure you want to delete this image?'
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this.indexOfCurrSlide = _this.instanceOfSwiper.swiper.activeIndex;
                _this.http.delete('https://api.imgur.com/3/image/' + _this.imagesFromAlbum[_this.indexOfCurrSlide].id).subscribe(function (data) {
                    return location.reload();
                });
            }
        });
    };
    ImagesComponent.prototype.onClickAdd = function () {
        var currAlbumId = location.href.slice(location.href.lastIndexOf('/') + 1);
        this.uploadImageService.comingFromAlbum.next(currAlbumId);
        this.router.navigateByUrl('/upload');
    };
    tslib_1.__decorate([
        ViewChild('instanceOfSwiper'),
        tslib_1.__metadata("design:type", SwiperComponent)
    ], ImagesComponent.prototype, "instanceOfSwiper", void 0);
    ImagesComponent = tslib_1.__decorate([
        Component({
            selector: 'app-images',
            templateUrl: './images.component.html',
            styleUrls: ['./images.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [AlbumsService,
            Router,
            AuthService,
            ImageService,
            HttpClient,
            MatDialog,
            UploadImageService])
    ], ImagesComponent);
    return ImagesComponent;
}());
export { ImagesComponent };
//# sourceMappingURL=images.component.js.map