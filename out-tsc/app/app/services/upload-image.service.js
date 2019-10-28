import { BehaviorSubject } from 'rxjs';
var UploadImageService = /** @class */ (function () {
    function UploadImageService() {
        this.comingFromAlbum = new BehaviorSubject(null);
        this.files = [];
    }
    UploadImageService.prototype.dropped = function (files) {
        var _loop_1 = function (droppedFile) {
            this_1.files.push(droppedFile);
            // Is it a file?
            if (droppedFile.fileEntry.isFile) {
                var fileEntry = droppedFile.fileEntry;
                fileEntry.file(function (file) {
                    // Here you can access the real file
                    console.log(droppedFile.relativePath, file);
                    // You could upload it like this:
                    // const formData = new FormData();
                    // formData.append('logo', file, relativePath);
                    //            // Headers
                    //            const headers = new HttpHeaders({
                    //   'security-token': 'mytoken'
                    // })
                    // this.http.post('https://mybackend.com/api/upload/sanitize-and-save-logo', formData, {
                    //     headers: headers,
                    //     responseType: 'blob'
                    // })
                    //     .subscribe(data => {
                    //         // Sanitized logo returned from backend
                    //     });
                });
            }
            else {
                // It was a directory (empty directories are added, otherwise only files)
                var fileEntry = droppedFile.fileEntry;
                console.log(droppedFile.relativePath, fileEntry);
            }
        };
        var this_1 = this;
        for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
            var droppedFile = files_1[_i];
            _loop_1(droppedFile);
        }
        return this.files;
    };
    return UploadImageService;
}());
export { UploadImageService };
//# sourceMappingURL=upload-image.service.js.map