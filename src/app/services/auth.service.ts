import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import {AlbumsService} from './albums.service';
import {BehaviorSubject} from 'rxjs';
import {UploadImageService} from './upload-image.service';
import {User} from '../models/user.model';
import {environment} from '../../environments/environment';


@Injectable()
export class AuthService {
    token: string;
    username: string;
    isLoggedIn: boolean = false;
    isImageSliderOpen: BehaviorSubject<boolean> = new BehaviorSubject(false);
    canUnlockButtonsOnImage: BehaviorSubject<boolean> = new BehaviorSubject(false);
    user = new BehaviorSubject<User>(new User('Username', '../../assets/photos/avatar.png'));

    constructor(
        private http: HttpClient,
        private route: ActivatedRoute,
        private router: Router,
        private albumService: AlbumsService,
        private uploadService: UploadImageService) {
        console.log("Ako nemate imgur account mozete da go upotrebite sledniot: username: andrijanaSaplamaeva password: demoaplikacija1");
        // zacuvuvanje na token i username vo session storage
        const url = window.location.href;
        let token;
        let username;
        if (url.includes('#')) {
            const httpParams = new HttpParams({fromString: url.split('#')[1]});
            this.token = httpParams.get('access_token');
            this.username = httpParams.get('account_username');
            sessionStorage.setItem('token', this.token);
            sessionStorage.setItem('username', this.username);
            this.isLoggedIn = true;
            this.router.navigate(['/', 'hot']);
        }
        this.updateIsLoggedIn();
        if (this.isLoggedIn) {
            let userName: string = sessionStorage.getItem('username');
            this.http.get(environment.apiUrl + 'account/' + userName + '/avatar').subscribe(
                value => {
                    console.log('api Url', environment.apiUrl);
                    this.user.next(new User(userName, value['data'].avatar));
                }, err => console.log('ne e najaven'));
        }

        // pri sekoja promena na rutata go predavame soodvetniot top hot ili user
        router.events.pipe(
            filter(event => event instanceof NavigationEnd)
        ).subscribe((event: NavigationEnd) => {
            // console.log(event.url);
            if (event.url == '/login' || event.url == '/') {
                this.router.navigateByUrl('/hot');
            }
            if (event.url == '/user') {
                // this.albumService.getAccountAlbumsPlusOther(sessionStorage.getItem('username'));
            }
            if (event.url.startsWith('/hot/') || event.url.startsWith('/top/') || event.url.startsWith('/user/')) {
                this.canUnlockButtonsOnImage.next(event.url.startsWith('/user/'));
            }
            if (event.url == '/logout') {
                this.isLoggedIn = false;
                sessionStorage.clear();
                this.router.navigateByUrl('/login');
            }
        });
    }

    updateIsLoggedIn(): boolean {
        if (sessionStorage.getItem('token')) {
            this.isLoggedIn = true;
            return true;
        } else {
            this.isLoggedIn = false;
            return false;
        }
    }
}
