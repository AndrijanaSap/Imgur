import {Component, Input, OnInit} from '@angular/core';
import {Album} from '../../models/album.model';


@Component({
    selector: 'app-album',
    templateUrl: './album.component.html',
    styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {

    @Input() source: Album;
    currAlbum: Album;

    constructor() {
    }

    ngOnInit() {
        this.currAlbum = this.source;
    }

}
