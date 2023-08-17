"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.caesarCipher = void 0;
export function caesarCipher(text, key) {
    var alphabet = 'abcdefghijklmnopqrstuvwxyz';
    var result = '';
    for (var i = 0; i < text.length; i++) {
        var char = text[i];
        if (char.match(/[a-zA-Z]/)) {
            var isUpperCase = char === char.toUpperCase(); //charが大文字かどうか
            var index = alphabet.indexOf(char.toLowerCase()); //charのアルファベット順番
            var newIndex = (index + key) % 26;
            var newChar = isUpperCase
                ? alphabet[newIndex].toUpperCase() //charが大文字なら、暗号化した文字も大文字にする
                : alphabet[newIndex];
            result += newChar;
        }
        else {
            result += char;
        }
    }
    return result;
}

