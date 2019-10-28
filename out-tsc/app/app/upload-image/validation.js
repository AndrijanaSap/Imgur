export function validateDescription(formControl) {
    var sentence = formControl.value;
    var numOFWords = sentence.trim().split(' ').length;
    return numOFWords >= 10 ? null : {
        validateDescription: {
            valid: false
        }
    };
}
//# sourceMappingURL=validation.js.map