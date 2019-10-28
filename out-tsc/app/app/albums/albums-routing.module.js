import * as tslib_1 from "tslib";
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AlbumsComponent } from './albums.component';
var albumsRoutes = [
    { path: '', component: AlbumsComponent }
];
var RecipesRoutingModule = /** @class */ (function () {
    function RecipesRoutingModule() {
    }
    RecipesRoutingModule = tslib_1.__decorate([
        NgModule({
            imports: [
                RouterModule.forChild(albumsRoutes)
            ],
            exports: [RouterModule],
            providers: []
        })
    ], RecipesRoutingModule);
    return RecipesRoutingModule;
}());
export { RecipesRoutingModule };
//# sourceMappingURL=albums-routing.module.js.map