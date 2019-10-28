import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AlbumsService} from '../../services/albums.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {Image} from '../../models/image.model';
import {ImageService} from '../../services/image.service';
import {SwiperComponent} from 'ngx-useful-swiper';
import {HttpClient} from '@angular/common/http';
import {ConfirmationDialogComponent} from '../../shared/confirmation-dialog/confirmation-dialog.component';
import {MatDialog} from '@angular/material';
import {UploadImageService} from '../../services/upload-image.service';
import * as _ from 'lodash';
import {Subscription} from 'rxjs';
import {environment} from '../../../environments/environment';

@Component({
    selector: 'app-images',
    templateUrl: './images.component.html',
    styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit, OnDestroy {
    @ViewChild('instanceOfSwiper') instanceOfSwiper: SwiperComponent;
    imagesFromAlbum: Image[] = [];
    editMode: boolean = false;
    config: any;
    indexOfCurrSlide: number;
    title = 'angular-confirmation-dialog';
    titleValue: string;
    descriptionValue: string;
    description: any;
    imagesFromAlbumCopy: Image[] = [];
    emptyAlbum: boolean = false;
    private subscriptionGetAlbumImages: Subscription;
    private subscriptionPost: Subscription;
    private subscriptionDelete: Subscription;
    private subscriptionAfterClosed: Subscription;

    constructor(
        private albumService: AlbumsService,
        private router: Router,
        private authService: AuthService,
        private imageService: ImageService,
        private http: HttpClient,
        public dialog: MatDialog,
        private uploadImageService: UploadImageService,
        private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
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

        let albumId = this.activatedRoute.snapshot.paramMap.get('id');
        if (albumId == 'Other') {
            this.albumService.getNonAlbumImagesIds().subscribe(
                value => {
                    this.albumService.getImagesFromOther(sessionStorage.getItem('username'), value)
                        .subscribe(value1 => {
                                this.imagesFromAlbum = value1.images;
                                this.imagesFromAlbumCopy = _.cloneDeep(value1.images);
                            }
                        );
                }
            );
        } else {
            this.subscriptionGetAlbumImages = this.albumService.getAlbumImages(albumId).subscribe(
                val => {
                    if (val.length == 0) {
                        this.emptyAlbum = true;
                    }
                    this.imagesFromAlbum = val;
                    this.imagesFromAlbumCopy = _.cloneDeep(val);
                });
        }
    }

    onClickEdit() {
        this.exitEditMode(false);
    }

    onClickSave() {
        this.indexOfCurrSlide = this.instanceOfSwiper.swiper.activeIndex;
        this.exitEditMode(true);
        let oldDescription = this.imagesFromAlbumCopy[this.indexOfCurrSlide].description;
        let oldTitle = this.imagesFromAlbumCopy[this.indexOfCurrSlide].title;
        let newDescription = this.imagesFromAlbum[this.indexOfCurrSlide].description;
        let newTitle = this.imagesFromAlbum[this.indexOfCurrSlide].title;

        if ((oldDescription != newDescription) || (oldTitle != newTitle)) {
            let form = new FormData();
            if (oldDescription != newDescription) {
                form.append('description', newDescription);
                this.imagesFromAlbumCopy[this.indexOfCurrSlide].description = newDescription;
            }
            if (oldTitle != newTitle) {
                form.append('title', newTitle);
                this.imagesFromAlbumCopy[this.indexOfCurrSlide].title = newTitle;
            }
            this.subscriptionPost = this.http.post(environment.apiUrl + 'image/' + this.imagesFromAlbum[this.indexOfCurrSlide].id, form).subscribe();
        }
    }

    onClickCancel() {
        this.indexOfCurrSlide = this.instanceOfSwiper.swiper.activeIndex;
        this.exitEditMode(true);
        let oldDescription = this.imagesFromAlbumCopy[this.indexOfCurrSlide].description;
        let oldTitle = this.imagesFromAlbumCopy[this.indexOfCurrSlide].title;
        let newDescription = this.imagesFromAlbum[this.indexOfCurrSlide].description;
        let newTitle = this.imagesFromAlbum[this.indexOfCurrSlide].title;

        if (oldDescription != newDescription) {
            this.imagesFromAlbum[this.indexOfCurrSlide].description = oldDescription;
        }
        if (oldTitle != newTitle) {
            this.imagesFromAlbum[this.indexOfCurrSlide].title = oldTitle;
        }
    }


    exitEditMode(status: boolean) {
        this.editMode = !status;
        this.instanceOfSwiper.swiper.allowSlideNext = status;
        this.instanceOfSwiper.swiper.allowSlidePrev = status;
        let elementDescription = <HTMLInputElement> document.querySelectorAll('.swiper-slide-active textarea').item(0);
        elementDescription.disabled = status;
        let elementTitle = <HTMLInputElement> document.querySelectorAll('.swiper-slide-active textarea').item(1);
        elementTitle.disabled = status;
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            width: '350px',
            data: 'Are you sure you want to delete this image?'
        });
        this.subscriptionAfterClosed = dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.indexOfCurrSlide = this.instanceOfSwiper.swiper.activeIndex;
                this.subscriptionDelete = this.http.delete(environment.apiUrl + 'image/' + this.imagesFromAlbum[this.indexOfCurrSlide].id).subscribe(data =>
                    location.reload());
            }
        });
    }

    onClickAdd() {
        let currAlbumId: string = this.activatedRoute.snapshot.paramMap.get('id');
        this.uploadImageService.comingFromAlbum.next(currAlbumId);
        this.router.navigateByUrl('/upload');
    }

    ngOnDestroy(): void {
        if (this.subscriptionDelete) {
            this.subscriptionDelete.unsubscribe();
        }
        if (this.subscriptionGetAlbumImages) {
            this.subscriptionGetAlbumImages.unsubscribe();
        }
        if (this.subscriptionPost) {
            this.subscriptionPost.unsubscribe();
        }
        if (this.subscriptionAfterClosed) {
            this.subscriptionAfterClosed.unsubscribe();
        }
    }
}
