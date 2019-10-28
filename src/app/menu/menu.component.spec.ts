import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuComponent } from './menu.component';
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatIconModule} from "@angular/material";
import {AlbumsService} from "../services/albums.service";
import {InterceptorService} from "../services/interceptor.service";
import {AuthService} from "../services/auth.service";
import {ImageService} from "../services/image.service";
import {UploadImageService} from "../services/upload-image.service";
import {AuthGuard} from "../services/auth-guard.service";

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuComponent ],
        imports: [
            BrowserModule,
            FormsModule,
            RouterModule.forRoot([]),
            ReactiveFormsModule,
            HttpClientModule,
            BrowserAnimationsModule,
            MatIconModule
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
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
