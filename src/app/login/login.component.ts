import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {environment} from '../../environments/environment';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    clicked: boolean = false;
    loginForm = new FormGroup({
        username: new FormControl(''),
        password: new FormControl(''),
    });

    constructor(private authService: AuthService) {
    }

    ngOnInit() {
    }

    onSignIn() {
        window.open('https://api.imgur.com/oauth2/authorize?client_id=' + environment.clientId + '&response_type=' + environment.responseType, '_self');
    }
}
