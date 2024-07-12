"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SanitizeArray = void 0;
function SanitizeArray(inputString) {
    let unsanitizedArray = inputString.split(",");
    let sanitizedArray = Array();
    for (const unsanitizedString of unsanitizedArray) {
        sanitizedArray.push(unsanitizedString.trim());
    }
    return sanitizedArray;
}
exports.SanitizeArray = SanitizeArray;
//# sourceMappingURL=index.js.map