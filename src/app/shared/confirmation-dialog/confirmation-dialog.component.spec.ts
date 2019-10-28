import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatDialog, MatDialogModule, MatDialogRef, MatIconModule} from "@angular/material";
import {AlbumsService} from "../../services/albums.service";
import {InterceptorService} from "../../services/interceptor.service";
import {AuthService} from "../../services/auth.service";
import {ImageService} from "../../services/image.service";
import {UploadImageService} from "../../services/upload-image.service";
import {AuthGuard} from "../../services/auth-guard.service";

describe('ConfirmationDialogComponent', () => {
  let component: ConfirmationDialogComponent;
  let fixture: ComponentFixture<ConfirmationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmationDialogComponent ],
        imports: [
            BrowserModule,
            FormsModule,
            RouterModule.forRoot([]),
            ReactiveFormsModule,
            HttpClientModule,
            BrowserAnimationsModule,
            MatIconModule,
            MatDialogModule,
            MatDialog,
            MatDialogRef
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
            AuthGuard,
            {
                provide: MatDialogRef,
                useValue: {
                    close: (dialogResult: any) => { }
                }
            }
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
