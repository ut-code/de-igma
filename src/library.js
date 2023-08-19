/*export function getCookieValue(key) { //cookieから自動で特定のkeyの値を読む関数(ネットからコピペ)
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        var cookiesArray = cookie.split('='); 
        if (cookiesArray[0].trim() == key.trim()) { 
            return cookiesArray[1];  // (key[0],value[1])
        }
    }
    return '';
}*/ //↑プロトコル変更によりOutdated,使わないでください

export function getCookieJSON() {
    const currentCookieJSON = JSON.parse(decodeURIComponent(document.cookie.split(";")[0].split("=")[1]))
    return currentCookieJSON
}
export function cookieCombine(ObjExpression,age){ //cookieにObjExpressionを追加、同じkeyがある場合は上書き / ageは保存日数
    const cookieJSON = getCookieJSON()
    Object.assign(cookieJSON, ObjExpression)
    document.cookie = "data=" + encodeURIComponent(JSON.stringify(cookieJSON)) + ";expires="+age.toString()
}
export function getUserName(){ //cookieからusernameを取得, requires getCookieJSON()
    const json = getCookieJSON()
    const usernameEncoded = json.usernameEncoded || ""; //undefined防止
    const username = decodeURI(usernameEncoded);
    return username;
}