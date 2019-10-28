import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumsComponent } from './albums.component';
import {ImagesComponent} from "./images/images.component";
import {AlbumComponent} from "./album/album.component";
import {ConfirmationDialogComponent} from "../shared/confirmation-dialog/confirmation-dialog.component";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {SwiperModule} from "ngx-useful-swiper";
import {MatButtonModule, MatDialogModule, MatIconModule, MatSelectModule} from "@angular/material";
import {AlbumsRoutingModule} from "./albums-routing.module";
import {InterceptorService} from "../services/interceptor.service";
import {AlbumsService} from "../services/albums.service";
import {ImageService} from "../services/image.service";
import {UploadImageService} from "../services/upload-image.service";
import {AuthService} from "../services/auth.service";
import {AuthGuard} from "../services/auth-guard.service";

describe('AlbumsComponent', () => {
  let component: AlbumsComponent;
  let fixture: ComponentFixture<AlbumsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [
            ImagesComponent,
            AlbumsComponent,
            AlbumComponent,
            ConfirmationDialogComponent
        ],
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
            AlbumsRoutingModule
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
    fixture = TestBed.createComponent(AlbumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
