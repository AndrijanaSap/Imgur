import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {MenuComponent} from "./menu/menu.component";
import {LoginComponent} from "./login/login.component";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {AppRoutingModule} from "./app-routing.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatIconModule} from "@angular/material";
import {ToastrModule} from "ngx-toastr";
import {AlbumsService} from "./services/albums.service";
import {InterceptorService} from "./services/interceptor.service";
import {AuthService} from "./services/auth.service";
import {ImageService} from "./services/image.service";
import {UploadImageService} from "./services/upload-image.service";
import {AuthGuard} from "./services/auth-guard.service";

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
        ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'imgur-app'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('imgur-app');
  });

  // xit('should render title in a h1 tag', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('Welcome to imgur-app!');
  // });
});
