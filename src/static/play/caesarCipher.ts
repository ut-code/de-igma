export function caesarCipher(text: string, key: number): string {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    let result = '';

    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        if (char.match(/[a-zA-Z]/)) {
            const isUpperCase = char === char.toUpperCase();    //charが大文字かどうか
            const index = alphabet.indexOf(char.toLowerCase()); //charのアルファベット順番
            const newIndex = (index + key) % 26;
            const newChar = isUpperCase
                ? alphabet[newIndex].toUpperCase()  //charが大文字なら、暗号化した文字も大文字にする
                : alphabet[newIndex];
            result += newChar;
        } else {
            result += char;
        }
    }

    return result;
}

