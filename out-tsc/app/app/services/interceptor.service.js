import * as tslib_1 from "tslib";
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
var InterceptorService = /** @class */ (function () {
    function InterceptorService() {
        this.token = sessionStorage.getItem('token');
    }
    InterceptorService.prototype.intercept = function (req, next) {
        var request = req.clone({
            headers: new HttpHeaders().append('Authorization', 'Bearer ' + this.token)
        });
        return next.handle(request);
    };
    InterceptorService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [])
    ], InterceptorService);
    return InterceptorService;
}());
export { InterceptorService };
//# sourceMappingURL=interceptor.service.js.map