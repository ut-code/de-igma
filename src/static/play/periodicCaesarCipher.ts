export function periodicCaesarCipher(text: string, key: number[]): string {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';//英文字の順番
    let result = '';
    if (text.length < key.length) {
        throw new Error('Text length must be greater than key length');
    }
    const period = Math.floor(text.length / key.length);//暗号の変化周期
    for (let i = 0; i < key.length+1; i++) {    //key.length+1にすることで、最後のkeyを使い続ける
        for (let j = 0; j < period; j++) {
            const char = text[period * i + j];
            if (char === undefined) {   //textを暗号化しきったら終了
                break;
            }
            if (char.match(/[a-zA-Z]/)) {
                if (key[i] === undefined ){
                    key[i] = key[i-1];  //keyの数が足りない場合、keyの最後の数字を使い続ける
                }
                const isUpperCase = char === char.toUpperCase();    //charが大文字かどうか
                const index = alphabet.indexOf(char.toLowerCase()); //charのアルファベット順番
                const newIndex = (index + key[i]) % 26;
                const newChar = isUpperCase
                    ? alphabet[newIndex].toUpperCase()  //charが大文字なら、暗号化した文字も大文字にする
                    : alphabet[newIndex];
                result += newChar;
            } else {
            result += char;
            }
        }
    }
    return result;
}
