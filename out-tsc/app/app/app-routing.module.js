import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ImagesComponent } from './albums/images/images.component';
import { AlbumsComponent } from './albums/albums.component';
import { UploadImageComponent } from './upload-image/upload-image.component';
var appRoutes = [
    { path: '', component: LoginComponent },
    { path: 'upload', component: UploadImageComponent },
    { path: 'login', component: LoginComponent },
    {
        path: 'hot', component: AlbumsComponent, children: [
            { path: ':id', component: ImagesComponent }
        ]
    },
    {
        path: 'top', component: AlbumsComponent, children: [
            { path: ':id', component: ImagesComponent }
        ]
    },
    {
        path: 'user', component: AlbumsComponent, children: [
            { path: ':id', component: ImagesComponent }
        ]
    },
    { path: 'logout', component: LoginComponent },
    { path: '**', redirectTo: '/hot' },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib_1.__decorate([
        NgModule({
            imports: [RouterModule.forRoot(appRoutes)],
            exports: [RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map