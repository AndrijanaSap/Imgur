export class Image {

    public id: string;
    public title: string;
    public description: string;
    public link: string;

    constructor(
        id?: string,
        title?: string,
        description?: string,
        link?: string,
    ) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.link = link;
    }

    deserializeImage(json: string) {
        this.id = json['id'];
        this.title = json['title'];
        this.description = json['description'];
        // @ts-ignore
        if (json['animated']) {
            this.link = json['gifv'];
            this.link = this.link.slice(0, this.link.length - 1);
        } else {
            // @ts-ignore
            this.link = json['link'];
        }

    }
}
