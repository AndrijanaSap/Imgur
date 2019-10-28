import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../services/auth-guard.service';
import {NgModule} from '@angular/core';
import {UploadImageComponent} from './upload-image.component';

const uploadRoutes: Routes = [
    {
        path: '', canActivate: [AuthGuard], component: UploadImageComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(uploadRoutes)
    ],
    exports: [RouterModule],
    providers: []
})
export class UploadImageRoutingModule {

}
