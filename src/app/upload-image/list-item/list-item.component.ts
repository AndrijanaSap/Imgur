import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {HttpClient, HttpEventType, HttpRequest, HttpResponse} from '@angular/common/http';
import {UploadImageService} from '../../services/upload-image.service';
import {AlbumsService} from '../../services/albums.service';
import {Album} from '../../models/album.model';
import {ToastrService} from 'ngx-toastr';
import {environment} from '../../../environments/environment';

@Component({
    selector: 'app-list-item',
    templateUrl: './list-item.component.html',
    styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {
    @Input() parentForm: FormGroup;
    @Input() i: number;
    @Input() imageSrc: string;
    @Input() albums: Album[];
    items: FormArray;
    private progressValue: number;

    constructor(
        private uploadImage: UploadImageService,
        private albumsService: AlbumsService,
        private formBuilder: FormBuilder,
        private http: HttpClient,
        private toastr: ToastrService) {
    }


    ngOnInit() {
        this.imageSrc = this.parentForm.value.items[this.i].fileUrl;

        console.log(this.parentForm.controls.items['controls'][this.i].controls['nameOfImage'], 'child', this.i);
    }

    onClickDelete(i: number) {
        this.items = this.parentForm.get('items') as FormArray;
        this.items.removeAt(i);
    }

    onClickUpload(i: number) {
        // this.uploadImages();
        this.onClickDelete(i);
    }

    uploadImages(form: FormGroup, albumId: string) {
        const formData = new FormData();
        if (albumId) {
            formData.append('album', albumId);
        }
        formData.append('image', form.value.items[this.i].file);
        formData.append('title', form.value.items[this.i].nameOfImage);
        formData.append('description', form.value.items[this.i].descriptionOfImage);
        const req = new HttpRequest('POST', environment.apiUrl + 'image', formData, {
            reportProgress: true
        });

        this.http.request(req).subscribe(event => {
                if (event.type === HttpEventType.UploadProgress) {
                    const percentDone = Math.round(100 * event.loaded / event.total);
                    this.uploadImage.progressBarChild.next(percentDone);
                } else if (event instanceof HttpResponse) {
                    let tempForm = form.get('items') as FormArray;
                    tempForm.removeAt(this.i);
                }
            }, (err) => {
            },
            () => {
                this.uploadImage.progressBarChild.next(0);
                this.toastr.success('Upload successful');
            }
        );

    }

    onSubmit(parentForm: FormGroup) {
        console.log(parentForm.controls.items['controls'][this.i].valid);
        this.progressValue = 0;
        console.log(this.albums, 'albumi');
        if (parentForm.value.inputValue != '') {
            let indexOfAlbum = this.albums.map(album => album.title).indexOf(parentForm.value.inputValue);
            console.log(indexOfAlbum, 'i');
            if (indexOfAlbum == -1) {
                let newAlbumId: string;
                console.log('od input');
                this.albumsService.createAlbum(parentForm.value.inputValue).subscribe(
                    val => {
                        newAlbumId = val;
                        this.albums.push(
                            new Album(
                                newAlbumId,
                                parentForm.value.inputValue));
                        this.uploadImages(parentForm, newAlbumId);
                    }
                );
            } else {
                this.uploadImages(parentForm, this.albums[indexOfAlbum].id);
            }

        } else if (parentForm.value.selectedValue != 'Other') {
            this.uploadImages(parentForm, parentForm.value.selectedValue);
        } else {
            this.uploadImages(parentForm, '');
        }
    }
}
