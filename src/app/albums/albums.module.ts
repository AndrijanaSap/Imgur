import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {ImagesComponent} from './images/images.component';
import {AlbumsComponent} from './albums.component';
import {AlbumComponent} from './album/album.component';
import {AlbumsRoutingModule} from './albums-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {SwiperModule} from 'ngx-useful-swiper';
import {MatButtonModule, MatDialogModule, MatIconModule, MatSelectModule} from '@angular/material';
import {CommonModule} from '@angular/common';
import {InterceptorService} from '../services/interceptor.service';
import {ConfirmationDialogComponent} from '../shared/confirmation-dialog/confirmation-dialog.component';

@NgModule({
    declarations: [
        ImagesComponent,
        AlbumsComponent,
        AlbumComponent,
        ConfirmationDialogComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        ReactiveFormsModule,
        HttpClientModule,
        SwiperModule,
        MatDialogModule,
        MatButtonModule,
        MatSelectModule,
        MatIconModule,
        AlbumsRoutingModule
    ],
    entryComponents: [
        ConfirmationDialogComponent
    ],
    providers: [
        InterceptorService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: InterceptorService,
            multi: true
        },
    ]
})
export class AlbumsModule {

}
