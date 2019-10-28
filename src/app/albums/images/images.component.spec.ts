import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ImagesComponent} from './images.component';
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {SwiperModule} from "ngx-useful-swiper";
import {MatButtonModule, MatDialogModule, MatIconModule, MatSelectModule} from "@angular/material";
import {AlbumsRoutingModule} from "../albums-routing.module";
import {ConfirmationDialogComponent} from "../../shared/confirmation-dialog/confirmation-dialog.component";
import {InterceptorService} from "../../services/interceptor.service";
import {AlbumsModule} from "../albums.module";
import {AlbumsService} from "../../services/albums.service";
import {AuthService} from "../../services/auth.service";
import {ImageService} from "../../services/image.service";
import {UploadImageService} from "../../services/upload-image.service";
import {AuthGuard} from "../../services/auth-guard.service";

describe('ImagesComponent', () => {
    let component: ImagesComponent;
    let fixture: ComponentFixture<ImagesComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [],
            imports: [
                CommonModule,
                FormsModule,
                RouterModule.forRoot([]),
                ReactiveFormsModule,
                HttpClientModule,
                SwiperModule,
                MatDialogModule,
                MatButtonModule,
                MatSelectModule,
                MatIconModule,
                AlbumsRoutingModule,
                AlbumsModule
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
            ]


        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ImagesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    xit('should create', () => {
        expect(component).toBeTruthy();
    });
});
