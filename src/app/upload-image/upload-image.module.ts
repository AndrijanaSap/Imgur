import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {SwiperModule} from 'ngx-useful-swiper';
import {MatButtonModule, MatDialogModule, MatIconModule, MatProgressBarModule, MatSelectModule} from '@angular/material';
import {NgxFileDropModule} from 'ngx-file-drop';
import {CommonModule} from '@angular/common';
import {UploadImageComponent} from './upload-image.component';
import {UploadImageRoutingModule} from './upload-image-routing.module';
import {InterceptorService} from '../services/interceptor.service';
import {ListItemComponent} from './list-item/list-item.component';

@NgModule({
    declarations: [

    ],
    imports: [
        CommonModule,
        FormsModule,
        // AngularFontAwesomeModule,
        RouterModule,
        ReactiveFormsModule,
        HttpClientModule,
        SwiperModule,
        // BrowserAnimationsModule,
        MatDialogModule,
        MatButtonModule,
        NgxFileDropModule,
        MatSelectModule,
        MatProgressBarModule,
        MatIconModule,
        UploadImageRoutingModule
    ],
    providers: [
        InterceptorService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: InterceptorService,
            multi: true
        }
    ]
})
export class UploadImageModule {

}
