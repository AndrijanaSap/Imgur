import {Injectable} from '@angular/core';
import {AlbumsService} from './albums.service';
import {Router} from '@angular/router';

@Injectable()
export class ImageService {


    constructor(private albumService: AlbumsService,
                private router: Router) {

    }

    closeImageSlider() {
        let url = location.href;
        url = url.slice(url.indexOf('/'), url.lastIndexOf('/'));
        url = url.slice(url.lastIndexOf('/'));
        this.router.navigateByUrl(url);
    }

}
