var Image = /** @class */ (function () {
    function Image(id, title, description, link) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.link = link;
    }
    Image.prototype.deserializeImage = function (json) {
        this.id = json['id'];
        this.title = json['title'];
        this.description = json['description'];
        // @ts-ignore
        if (json['animated']) {
            this.link = json['gifv'];
            this.link = this.link.slice(0, this.link.length - 1);
        }
        else {
            // @ts-ignore
            this.link = json['link'];
        }
    };
    return Image;
}());
export { Image };
//# sourceMappingURL=image.model.js.map