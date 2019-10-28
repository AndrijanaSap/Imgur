import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {UploadImageService} from '../services/upload-image.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
    toggleSidenav: boolean = false;
    username: string;
    avatar: string;

    constructor(
        private authService: AuthService,
        private uploadImageService: UploadImageService,
        private router: Router) {
        this.avatar = '../../assets/photos/avatar.png';
        this.username = 'Username';

    }

    ngOnInit() {
        this.authService.user.subscribe(user => {
            this.username = user.userName;
            this.avatar = user.avatar;
        });
    }

    onClickAddnewImage() {
        this.uploadImageService.comingFromAlbum.next('Other');
    }

    onClickLogout() {
        this.avatar = '../../assets/photos/avatar.png';
        this.username = 'Username';
        this.router.navigateByUrl('/logout');

    }

}
