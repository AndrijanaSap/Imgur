import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { UploadImageService } from '../services/upload-image.service';
import { AlbumsService } from '../services/albums.service';
import { Album } from '../models/album.model';
import { FormBuilder, Validators } from '@angular/forms';
import { validateDescription } from './validation';
import { HttpClient, HttpEventType, HttpRequest, HttpResponse } from '@angular/common/http';
var UploadImageComponent = /** @class */ (function () {
    function UploadImageComponent(uploadImage, albumsService, formBuilder, http) {
        this.uploadImage = uploadImage;
        this.albumsService = albumsService;
        this.formBuilder = formBuilder;
        this.http = http;
        this.files = [];
    }
    UploadImageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.uploadImage.comingFromAlbum.subscribe(function (id) {
            _this.albumIdFromRoute = id;
        });
        this.orderForm = this.formBuilder.group({
            selectedValue: (this.albumIdFromRoute || 'Other'),
            inputValue: '',
            items: this.formBuilder.array([])
        });
        this.albumsService.getAccountAlbumsTitlesAndIds(sessionStorage.getItem('username')).subscribe(function (v) {
            _this.albums = v;
            _this.albums.push(new Album('Other', 'Other'));
        });
        this.onChanges();
    };
    UploadImageComponent.prototype.createItem = function (file, fileUrl) {
        return this.formBuilder.group({
            fileUrl: fileUrl,
            file: file,
            nameOfImage: ['', [Validators.required]],
            descriptionOfImage: ['', [Validators.required, validateDescription]]
        });
    };
    UploadImageComponent.prototype.addItem = function (file, fileUrl) {
        this.items = this.orderForm.get('items');
        this.items.push(this.createItem(file, fileUrl));
    };
    UploadImageComponent.prototype.onChanges = function () {
        var _this = this;
        this.orderForm.get('selectedValue').valueChanges.subscribe(function (val) {
            if (val) {
                _this.orderForm.get('inputValue').setValue('');
            }
        });
        this.orderForm.get('inputValue').valueChanges.subscribe(function (val) {
            if (val) {
                _this.orderForm.get('selectedValue').setValue('');
            }
        });
    };
    UploadImageComponent.prototype.dropped = function (files) {
        var _this = this;
        var _loop_1 = function (droppedFile) {
            if (droppedFile.fileEntry.isFile && this_1.isFileExtensionAllowed(droppedFile.fileEntry.name)) {
                var fileEntry = droppedFile.fileEntry;
                var reader_1 = new FileReader();
                fileEntry.file(function (file) {
                    reader_1.readAsDataURL(file);
                    if (file.size / 1024 / 1024 < 10) {
                        _this.files.push(droppedFile);
                        reader_1.onload = function () {
                            _this.addItem(file, reader_1.result);
                        };
                    }
                    else {
                        alert('The max size of an image is 10MB');
                    }
                });
            }
            else {
                var fileEntry = droppedFile.fileEntry;
                console.log(droppedFile.relativePath, fileEntry);
            }
        };
        var this_1 = this;
        for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
            var droppedFile = files_1[_i];
            _loop_1(droppedFile);
        }
    };
    UploadImageComponent.prototype.fileOver = function (event) {
    };
    UploadImageComponent.prototype.fileLeave = function (event) {
    };
    UploadImageComponent.prototype.onClickDelete = function (i) {
        this.items = this.orderForm.get('items');
        this.items.removeAt(i);
    };
    UploadImageComponent.prototype.onSubmit = function (form) {
        var _this = this;
        this.progressValue = 0;
        var numOfImages = form['controls'].items['controls'].length;
        if (form.value.inputValue != '') {
            var newAlbumId_1;
            this.albumsService.createAlbum(form.value.inputValue).subscribe(function (val) {
                newAlbumId_1 = val;
                _this.uploadImages(numOfImages, form, newAlbumId_1);
            });
        }
        else if (form.value.selectedValue != 'Other') {
            this.uploadImages(numOfImages, form, form.value.selectedValue);
        }
        else {
            this.uploadImages(numOfImages, form, '');
        }
    };
    UploadImageComponent.prototype.uploadImages = function (numOfImages, form, albumId) {
        var _this = this;
        var _loop_2 = function (i) {
            var formData = new FormData();
            if (albumId) {
                formData.append('album', albumId);
            }
            formData.append('image', form.value.items[i].file);
            formData.append('title', form.value.items[i].nameOfImage);
            formData.append('description', form.value.items[i].descriptionOfImage);
            var req = new HttpRequest('POST', 'https://api.imgur.com/3/image', formData, {
                reportProgress: true
            });
            this_2.http.request(req).subscribe(function (event) {
                if (event.type === HttpEventType.UploadProgress) {
                    var percentDone = (Math.round(100 * event.loaded / event.total)) / numOfImages;
                    _this.progressValue += percentDone;
                }
                else if (event instanceof HttpResponse) {
                    var tempForm = form.get('items');
                    tempForm.removeAt(0);
                }
            }, function (err) {
            }, function () {
                if (i == (numOfImages - 1)) {
                    _this.progressValue = 0;
                }
            });
        };
        var this_2 = this;
        for (var i = 0; i < numOfImages; i++) {
            _loop_2(i);
        }
    };
    UploadImageComponent.prototype.isFileExtensionAllowed = function (fileName) {
        var reg = /[\/.](gif|jpg|jpeg|tiff|png)$/i;
        ;
        if (fileName.length > 0) {
            console.log(reg.test(fileName), 'test');
            if (reg.test(fileName)) {
                return true;
            }
            else {
                alert('Only .jpg, .jpeg,.png, .gif  files are allowed!');
                return false;
            }
        }
        return false;
    };
    UploadImageComponent = tslib_1.__decorate([
        Component({
            selector: 'app-upload-image',
            templateUrl: './upload-image.component.html',
            styleUrls: ['./upload-image.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [UploadImageService,
            AlbumsService,
            FormBuilder,
            HttpClient])
    ], UploadImageComponent);
    return UploadImageComponent;
}());
export { UploadImageComponent };
//# sourceMappingURL=upload-image.component.js.map