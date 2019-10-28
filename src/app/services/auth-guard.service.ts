import {CanActivate, CanActivateChild} from '@angular/router';
import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(private authService: AuthService) {
    }

    canActivate() {
        // console.log('AlwaysAuthGuard', this.authService.updateIsLoggedIn());
        return this.authService.updateIsLoggedIn();
    }

    canActivateChild() {
        // console.log('Child', this.authService.updateIsLoggedIn());
        return this.authService.updateIsLoggedIn();
    }
}
