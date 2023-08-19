//以前のは不正な形式の可能性があるため、こっちを使ってください


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