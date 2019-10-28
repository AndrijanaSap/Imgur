import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'sliceTitle'
})
export class SliceTitlePipe implements PipeTransform {

    transform(value: string): string {
        if (value.length > 30) {
            return value.slice(0, 30) + '...';
        } else {
            return value;
        }
    }

}
