import {FormControl} from '@angular/forms';

export function validateDescription(formControl: FormControl) {

    let sentence: string = formControl.value;
    let numOFWords = sentence.trim().split(' ').length;
    return numOFWords >= 10 ? null : {
        validateDescription: {
            valid: false
        }
    };
}
