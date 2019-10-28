import {Injectable} from '@angular/core';
import {Album} from '../models/album.model';
import {HttpClient} from '@angular/common/http';
import {forkJoin, Observable, Subject} from 'rxjs';
import {Image} from '../models/image.model';
import {map, mergeMap} from 'rxjs/operators';
import * as _ from 'lodash';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class AlbumsService {
    url: string = environment.apiUrl;
    albums = new Subject<Album>();
    accountAlbums = new Subject<Album[]>();
    cover: string;

    constructor(private http: HttpClient, private activatedRoute: ActivatedRoute) {
        this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
                // console.log(params.get('id'), 'p');
            }
        );
    }

    getGallery(parameter: string, numOfPage: number): Observable<Album[]> {
        return this.http.get<any[]>(this.url + 'gallery/' + parameter + '/viral/' + numOfPage + '.json').pipe(
            map(
                value => {
                    return value['data'].map(album => {
                        if (album['images'] != undefined) {
                            let tempAlbum = new Album();
                            tempAlbum.deserializeAlbum(album);
                            return tempAlbum;
                        }
                    });
                }
            ));
    }

    getAlbumImages(albumId: string): Observable<Image[]> {
        return this.http.get<any[]>(this.url + 'album/' + albumId).pipe(
            map(
                value => {
                    return value['data']['images'].map(image => {
                        let tempImage = new Image();
                        tempImage.deserializeImage(image);
                        return tempImage;
                    });
                }));
    }


    getAccountAlbumsTitlesAndIds(username: string): Observable<Album[]> {
        return this.http.get(this.url + 'account/' + username + '/albums').pipe(
            map(
                value => {
                    return value['data'].map(val => {
                        let tempAlbum = new Album();
                        tempAlbum.deserializeAlbumTitleAndIdOnly(val);
                        return tempAlbum;
                    });
                }
            )
        );
    }

    getAccountAlbumsIds(username: string): Observable<string[]> {
        return this.http.get(this.url + 'account/' + username + '/albums/ids').pipe(
            map(
                value => {
                    // console.log(value);
                    return value['data'].map(val => {
                        return val;
                    });
                }
            )
        );
    }

    createAlbum(titleOfAlbum: string): Observable<string> {
        const formDataAlbum = new FormData();
        formDataAlbum.append('title', titleOfAlbum);
        return this.http.post(this.url + 'album', formDataAlbum).pipe(
            map(
                value => {
                    return value['data'].id;
                }
            )
        );
    }

    getUserAlbums(): Observable<Album[]> {
        return this.getAccountAlbumsIds(sessionStorage.getItem('username'))
            .pipe(mergeMap(albumIds => {
                let idsArray = albumIds;
                let arrayOfObservables = idsArray
                    .map(id => {
                            return this.http.get<any[]>(this.url + 'account/' + sessionStorage.getItem('username') + '/album/' + id)
                                .pipe(map(album => {
                                    if (album['data']['images'][0]) { //praznite albumi ne gi zemam
                                        console.log('vlaga');
                                        let tempAlbum = new Album();
                                        tempAlbum.deserializeAlbum(album['data']);
                                        return tempAlbum;
                                    }
                                }));
                        }
                    );
                let observableOfArrays = forkJoin(arrayOfObservables);// od Observable<Album>[] vo Observable<Album[]>
                return observableOfArrays;
            }));
    }

    getImagesFromOther(username: string, idsOfNonAlbumImages: string[]): Observable<Album> {
        let albumOther: Album = new Album('Other', 'Other', 'Non-album images');
        albumOther.images = [];
        return this.http.get<any[]>(this.url + 'account/' + username + '/images').pipe(map(
            image => {
                return image['data'].map(val => {
                        if (idsOfNonAlbumImages.indexOf(val.id) != -1) {
                            let tempImage = new Image();
                            tempImage.deserializeImage(val);
                            return tempImage;
                        }
                    }
                ).filter(element => element !== undefined);
            }
        ), map(images => {
            albumOther.images = images;
            albumOther.cover = albumOther.images[0].link;
            return albumOther;
        }));
    }


    getAllImagesIds(): Observable<string[]> {
        return this.http.get<any[]>(this.url + 'account/' + sessionStorage.getItem('username') + '/images/ids').pipe(
            map(
                listOfIds => {
                    return listOfIds['data'];
                }));
    }

    getImagesIdsFromAlbums(): Observable<string[][]> {
        return this.getAccountAlbumsIds(sessionStorage.getItem('username'))
            .pipe(mergeMap(albumIds => {
                let idsArray = albumIds;
                let arrayOfObservables = idsArray
                    .map(id => {
                            return this.http.get<any[]>(this.url + 'account/' + sessionStorage.getItem('username') + '/album/' + id)
                                .pipe(map(album => {
                                        if (album['data']['images'][0]) { //praznite albumi ne gi zemam
                                            let tempAlbum = new Album();
                                            tempAlbum.deserializeAlbum(album['data']);
                                            return tempAlbum.imagesIds;
                                        }
                                    })
                                );
                        }
                    );
                let observableOfArrays = forkJoin(arrayOfObservables);// od Observable<Album>[] vo Observable<Album[]>
                return observableOfArrays;
            }));

    }

    getNonAlbumImagesIds(): Observable<string[]> {
        return this.getAllImagesIds().pipe(mergeMap(allIds => {
            return this.getImagesIdsFromAlbums().pipe(map(value => {
                let ids = _.flattenDeep(value);
                return allIds = allIds.filter((el) => !ids.includes(el));
            }));
        }));
    }
}
