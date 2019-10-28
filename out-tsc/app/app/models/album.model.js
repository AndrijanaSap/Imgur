import { Image } from '../models/image.model';
var Album = /** @class */ (function () {
    function Album(id, title, description) {
        this.images = [];
        this.imagesIds = [];
        this.id = id;
        this.title = title;
        this.description = description;
    }
    Album.prototype.deserializeAlbum = function (json) {
        this.id = json['id'];
        this.title = json['title'];
        this.description = json['description'];
        for (var i = 0; i < json['images'].length; i++) {
            var tempImage = new Image();
            tempImage.deserializeImage(json['images'][i]);
            this.images.push(tempImage);
            this.imagesIds.push(tempImage.id);
        }
        //console.log(this.images);
        this.cover = this.images[0].link;
    };
    Album.prototype.deserializeAlbumTitleAndIdOnly = function (json) {
        this.id = json['id'];
        this.title = json['title'];
    };
    return Album;
}());
export { Album };
//# sourceMappingURL=album.model.js.map