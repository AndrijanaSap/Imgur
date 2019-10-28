import {Component, OnInit} from '@angular/core';
import {UploadImageService} from '../services/upload-image.service';
import {FileSystemDirectoryEntry, FileSystemFileEntry, NgxFileDropEntry} from 'ngx-file-drop';
import {AlbumsService} from '../services/albums.service';
import {Album} from '../models/album.model';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {validateDescription} from './validation';
import {HttpClient, HttpEventType, HttpRequest, HttpResponse} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {environment} from '../../environments/environment';

@Component({
    selector: 'app-upload-image',
    templateUrl: './upload-image.component.html',
    styleUrls: ['./upload-image.component.css']
})

export class UploadImageComponent implements OnInit {
    public files: NgxFileDropEntry[] = [];
    albums: Album[];
    selectedValue: string;
    orderForm: FormGroup;
    items: FormArray;
    albumIdFromRoute: string;
    progressValue: number;

    constructor(
        private uploadImage: UploadImageService,
        private albumsService: AlbumsService,
        private formBuilder: FormBuilder,
        private http: HttpClient,
        private toastr: ToastrService) {
    }

    ngOnInit(): void {

        this.uploadImage.comingFromAlbum.subscribe(
            id => {
                this.albumIdFromRoute = id;
            }
        );

        this.orderForm = this.formBuilder.group({
            selectedValue: (this.albumIdFromRoute || 'Other'),
            inputValue: '',
            items: this.formBuilder.array([])
        });


        this.albumsService.getAccountAlbumsTitlesAndIds(sessionStorage.getItem('username')).subscribe(
            albums => {
                this.albums = albums;
                this.albums.push(new Album('Other', 'Other'));
            }
        );
        this.onChanges();
        this.uploadImage.progressBarChild.subscribe(percent => this.progressValue = percent);
    }

    createItem(file: File, fileUrl?: any): FormGroup {
        return this.formBuilder.group({
            fileUrl: fileUrl,
            file: file,
            nameOfImage: ['', [Validators.required]],
            descriptionOfImage: ['', [Validators.required, validateDescription]]
        });
    }

    addItem(file: File, fileUrl?: any): void {
        this.items = this.orderForm.get('items') as FormArray;
        this.items.push(this.createItem(file, fileUrl));
    }

    onChanges(): void {
        this.orderForm.get('selectedValue').valueChanges.subscribe(val => {
            if (val) {
                this.orderForm.get('inputValue').setValue('');
            }
        });
        this.orderForm.get('inputValue').valueChanges.subscribe(val => {
            if (val) {
                this.orderForm.get('selectedValue').setValue('');
            }
        });
    }

    public dropped(files: NgxFileDropEntry[]) {
        for (const droppedFile of files) {
            if (droppedFile.fileEntry.isFile && this.isFileExtensionAllowed(droppedFile.fileEntry.name)
            ) {
                const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
                const reader = new FileReader();
                fileEntry.file((file: File) => {
                    reader.readAsDataURL(file);
                    if (file.size / 1024 / 1024 < 10) {
                        this.files.push(droppedFile);
                        reader.onload = () => {
                            this.addItem(file, reader.result);
                        };
                    } else {
                        alert('The max size of an image is 10MB');
                    }
                });
            } else {
                const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
            }
        }
    }

    onSubmit(form: FormGroup) {
        this.progressValue = 1;
        let numOfImages = form['controls'].items['controls'].length;
        if (form.value.inputValue != '') {
            let newAlbumId: string;
            this.albumsService.createAlbum(form.value.inputValue).subscribe(
                val => {
                    newAlbumId = val;
                    this.uploadImages(numOfImages, form, newAlbumId);
                }
            );
        } else if (form.value.selectedValue != 'Other') {
            this.uploadImages(numOfImages, form, form.value.selectedValue);
        } else {
            this.uploadImages(numOfImages, form, '');
        }
    }

    uploadImages(numOfImages: any, form: FormGroup, albumId: string) {
        for (let i = 0; i < numOfImages; i++) {
            const formData = new FormData();
            if (albumId) {
                formData.append('album', albumId);
            }
            formData.append('image', form.value.items[i].file);
            formData.append('title', form.value.items[i].nameOfImage);
            formData.append('description', form.value.items[i].descriptionOfImage);
            const req = new HttpRequest('POST', environment.apiUrl + 'image', formData, {
                reportProgress: true
            });

            this.http.request(req).subscribe(event => {
                if (event.type === HttpEventType.UploadProgress) {
                    const percentDone = (Math.round(100 * event.loaded / event.total)) / numOfImages;
                    this.progressValue += percentDone;
                } else if (event instanceof HttpResponse) {
                    let tempForm = form.get('items') as FormArray;
                    tempForm.removeAt(0);
                }
            }, err => {
            }, () => {
                if (i == (numOfImages - 1)) {
                    this.progressValue = 0;
                    this.toastr.success('Upload successful');
                }
            });
        }
    }

    isFileExtensionAllowed(fileName: string): boolean {
        let reg = /[\/.](gif|jpg|jpeg|tiff|png)$/i;
        ;
        if (fileName.length > 0) {
            console.log(reg.test(fileName), 'test');
            if (reg.test(fileName)) {
                return true;
            } else {
                alert('Only .jpg, .jpeg,.png, .gif  files are allowed!');
                return false;
            }
        }
        return false;
    }


}
