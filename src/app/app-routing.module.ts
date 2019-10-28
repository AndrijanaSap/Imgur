import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './services/auth-guard.service';

const appRoutes: Routes = [
    {path: '', component: LoginComponent},
    {path: 'login', component: LoginComponent},
    {path: 'hot', canActivate: [AuthGuard], loadChildren: 'src/app/albums/albums.module#AlbumsModule'},
    {path: 'top', canActivate: [AuthGuard], loadChildren: 'src/app/albums/albums.module#AlbumsModule'},
    {path: 'user', canActivate: [AuthGuard], loadChildren: 'src/app/albums/albums.module#AlbumsModule'},
    {path: 'upload', canActivate: [AuthGuard], loadChildren: 'src/app/upload-image/upload-image.module#UploadImageModule'},
    {path: 'logout', component: LoginComponent},
    {path: '**', redirectTo: '/hot'},
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
