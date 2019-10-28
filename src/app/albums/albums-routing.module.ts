import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AlbumsComponent} from './albums.component';
import {AuthGuard} from '../services/auth-guard.service';
import {ImagesComponent} from './images/images.component';

const albumsRoutes: Routes = [
    {
        path: '', canActivate: [AuthGuard], canActivateChild: [AuthGuard], children: [
            {path: '', component: AlbumsComponent},
            {path: ':id', component: ImagesComponent}
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(albumsRoutes)
    ],
    exports: [RouterModule],
    providers: []
})
export class AlbumsRoutingModule {
}
