import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {MenuComponent} from './menu/menu.component';
import {LoginComponent} from './login/login.component';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {InterceptorService} from './services/interceptor.service';
import {AuthService} from './services/auth.service';
import {AlbumsService} from './services/albums.service';
import {ImageService} from './services/image.service';
import {UploadImageService} from './services/upload-image.service';
import {MatIconModule} from '@angular/material/icon';
import {AuthGuard} from './services/auth-guard.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';

@NgModule({
    declarations: [
        AppComponent,
        MenuComponent,
        LoginComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        RouterModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatIconModule,
        ToastrModule.forRoot()
    ],
    providers: [
        AlbumsService,
        InterceptorService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: InterceptorService,
            multi: true
        },
        AuthService,
        ImageService,
        UploadImageService,
        AuthGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
