import {BehaviorSubject} from 'rxjs';
import {NgxFileDropEntry} from 'ngx-file-drop';
import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class UploadImageService {
    comingFromAlbum: BehaviorSubject<string> = new BehaviorSubject<string>(null);
    progressBarChild: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    public files: NgxFileDropEntry[] = [];

    constructor() {
    }


}
