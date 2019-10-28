import {Component, OnInit} from '@angular/core';
import {Album} from '../models/album.model';
import {AlbumsService} from '../services/albums.service';

@Component({
    selector: 'app-albums',
    templateUrl: './albums.component.html',
    styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {
    albums: Album[] = [];
    hiddenAlbums: Album[] = [];
    numOfPage: number = 0;
    showLoading: boolean = false;

    constructor(private albumService: AlbumsService) {
        this.albums = [];
    }

    ngOnInit() {

        let section = location.href.slice(location.href.lastIndexOf('/') + 1);
        if (section == 'hot' || section == 'top') {
            this.albumService.getGallery(section, this.numOfPage).subscribe(
                val => {
                    const filtered = val.filter(element => element !== undefined);
                    this.albums = filtered.slice(0, 18);
                    this.hiddenAlbums = filtered.slice(18);

                });
        } else {
            this.albumService.getUserAlbums().subscribe(val => {
                    const filtered = val.filter(element => element !== undefined);
                    this.albums = filtered;
                }
            );
            this.albumService.getNonAlbumImagesIds().subscribe(
                value => {
                    console.log(this.albumService.getImagesFromOther(sessionStorage.getItem('username'), value).subscribe(value1 => this.albums.push(value1)));
                }
            );
        }

    }

    onScroll(event: any) {
        // visible height + pixel scrolled >= total height
        if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight) {
            if (this.hiddenAlbums.length >= 18) {
                this.showLoading = true;
                this.albums = this.albums.concat(this.hiddenAlbums.slice(0, 18));
                this.hiddenAlbums = this.hiddenAlbums.slice(18);
                this.showLoading = false;
            } else {
                this.numOfPage += 1;
                let section = location.href.slice(location.href.lastIndexOf('/') + 1);
                if (section == 'hot' || section == 'top') {
                    this.showLoading = true;
                    this.albumService.getGallery(section, this.numOfPage).subscribe(
                        val => {
                            const filtered = val.filter(element => element !== undefined);
                            this.hiddenAlbums = this.hiddenAlbums.concat(filtered);
                            this.albums = this.albums.concat(this.hiddenAlbums.slice(0, 18));
                            this.hiddenAlbums = this.hiddenAlbums.slice(18);
                        });
                } else {

                    this.albumService.accountAlbums.subscribe(val => {
                            this.albums = val;
                        }
                    );
                }
            }
        }
    }
}
