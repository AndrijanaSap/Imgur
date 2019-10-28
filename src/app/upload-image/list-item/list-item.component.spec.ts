import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListItemComponent } from './list-item.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SwiperModule} from "ngx-useful-swiper";
import {RouterModule} from "@angular/router";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatProgressBarModule,
    MatSelectModule
} from "@angular/material";
import {UploadImageService} from "../../services/upload-image.service";
import {CommonModule} from "@angular/common";
import {AlbumsService} from "../../services/albums.service";
import {ImageService} from "../../services/image.service";
import {AuthGuard} from "../../services/auth-guard.service";
import {ToastrModule} from "ngx-toastr";
import {NgxFileDropModule} from "ngx-file-drop";
import {AuthService} from "../../services/auth.service";
import {UploadImageRoutingModule} from "../upload-image-routing.module";
import {InterceptorService} from "../../services/interceptor.service";
import {UploadImageModule} from "../upload-image.module";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BrowserModule} from "@angular/platform-browser";
import {UploadImageComponent} from "../upload-image.component";

describe('ListItemComponent', () => {
  let component: ListItemComponent;
  let fixture: ComponentFixture<ListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListItemComponent ],
        imports: [
            CommonModule,
            BrowserModule,
            FormsModule,
            // AngularFontAwesomeModule,
            RouterModule.forRoot([]),
            ReactiveFormsModule,
            HttpClientModule,
            SwiperModule,
            BrowserAnimationsModule,
            MatDialogModule,
            MatButtonModule,
            NgxFileDropModule,
            MatSelectModule,
            MatProgressBarModule,
            MatIconModule,
            ToastrModule.forRoot(),
            // UploadImageModule
            // HttpClientTestingModule

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
    fixture = TestBed.createComponent(ListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
