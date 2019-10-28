import {Image} from '../models/image.model';

export class Album {
    public id: string;
    public title: string;
    public description: string;
    public images: Image[] = [];
    public imagesIds: string[] = [];
    public cover: string;

    constructor(id?: string, title?: string, description?: string) {
        this.id = id;
        this.title = title;
        this.description = description;
    }

    deserializeAlbum(json: string) {
        this.id = json['id'];
        this.title = json['title'];
        this.description = json['description'];
        for (let i = 0; i < json['images'].length; i++) {
            let tempImage = new Image();
            tempImage.deserializeImage(json['images'][i]);
            this.images.push(tempImage);
            this.imagesIds.push(tempImage.id);
        }
        this.cover = this.images[0].link;

    }

    deserializeAlbumTitleAndIdOnly(json: string) {
        this.id = json['id'];
        this.title = json['title'];
    }
}
