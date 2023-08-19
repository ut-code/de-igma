"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.periodicCaesarCipher = void 0;
export function periodicCaesarCipher(text, key) {
    var alphabet = 'abcdefghijklmnopqrstuvwxyz'; //英文字の順番
    var result = '';
    if (text.length < key.length) {
        throw new Error('Text length must be greater than key length');
    }
    var period = Math.floor(text.length / key.length); //暗号の変化周期
    for (var i = 0; i < key.length + 1; i++) { //key.length+1にすることで、最後のkeyを使い続ける
        for (var j = 0; j < period; j++) {
            var char = text[period * i + j];
            if (char === undefined) { //textを暗号化しきったら終了
                break;
            }
            if (char.match(/[a-zA-Z]/)) {
                if (key[i] === undefined) {
                    key[i] = key[i - 1]; //keyの数が足りない場合、keyの最後の数字を使い続ける
                }
                var isUpperCase = char === char.toUpperCase(); //charが大文字かどうか
                var index = alphabet.indexOf(char.toLowerCase()); //charのアルファベット順番
                var newIndex = (index + key[i]) % 26;
                var newChar = isUpperCase
                    ? alphabet[newIndex].toUpperCase() //charが大文字なら、暗号化した文字も大文字にする
                    : alphabet[newIndex];
                result += newChar;
            }
            else {
                result += char;
            }
        }
    }
    return result;
}