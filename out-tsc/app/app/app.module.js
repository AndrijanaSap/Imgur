import * as tslib_1 from "tslib";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { MenuComponent } from './menu/menu.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { InterceptorService } from './services/interceptor.service';
import { AuthService } from './services/auth.service';
import { AlbumsService } from './services/albums.service';
import { ImagesComponent } from './albums/images/images.component';
import { AlbumsComponent } from './albums/albums.component';
import { AlbumComponent } from './albums/album/album.component';
import { SwiperModule } from 'ngx-useful-swiper';
import { ImageService } from './services/image.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmationDialogComponent } from './shared/confirmation-dialog/confirmation-dialog.component';
import { UploadImageComponent } from './upload-image/upload-image.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { UploadImageService } from './services/upload-image.service';
import { MatProgressBarModule, MatSelectModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib_1.__decorate([
        NgModule({
            declarations: [
                AppComponent,
                MenuComponent,
                LoginComponent,
                ImagesComponent,
                AlbumsComponent,
                AlbumComponent,
                AlbumComponent,
                ConfirmationDialogComponent,
                UploadImageComponent
            ],
            imports: [
                BrowserModule,
                FormsModule,
                AngularFontAwesomeModule,
                RouterModule,
                AppRoutingModule,
                ReactiveFormsModule,
                HttpClientModule,
                SwiperModule,
                BrowserModule,
                BrowserAnimationsModule,
                MatDialogModule,
                MatButtonModule,
                NgxFileDropModule,
                MatSelectModule,
                MatProgressBarModule,
                MatIconModule
            ],
            entryComponents: [
                ConfirmationDialogComponent
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
                UploadImageService
            ],
            bootstrap: [AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map