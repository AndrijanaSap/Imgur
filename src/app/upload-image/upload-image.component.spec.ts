import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadImageComponent } from './upload-image.component';
import {ListItemComponent} from "./list-item/list-item.component";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {SwiperModule} from "ngx-useful-swiper";
import {
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatProgressBarModule,
    MatSelectModule
} from "@angular/material";
import {NgxFileDropModule} from "ngx-file-drop";
import {UploadImageRoutingModule} from "./upload-image-routing.module";
import {InterceptorService} from "../services/interceptor.service";
import {AlbumsService} from "../services/albums.service";
import {AuthService} from "../services/auth.service";
import {UploadImageService} from "../services/upload-image.service";
import {ImageService} from "../services/image.service";
import {AuthGuard} from "../services/auth-guard.service";
import {ToastrModule} from "ngx-toastr";
import {UploadImageModule} from "./upload-image.module";

describe('UploadImageComponent', () => {
  let component: UploadImageComponent;
  let fixture: ComponentFixture<UploadImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [
        ],
        imports: [
            CommonModule,
            FormsModule,
            // AngularFontAwesomeModule,
            RouterModule.forRoot([]),
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
            UploadImageRoutingModule,
            ToastrModule.forRoot(),
            UploadImageModule
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
    fixture = TestBed.createComponent(UploadImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
