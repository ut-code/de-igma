const cookieAge = 30 //cookieの保存日数


new_account_base = document.getElementById("create-account-base")
new_account_input = document.getElementById("user-name-new")
new_account_button = document.getElementById("create-account-button")
hidden_alert_new = document.getElementById("hidden-alert-new")

manage_account_base = document.getElementById("manage-account-base")
change_username_input = document.getElementsById("user-name-change")
change_username_button = document.getElementById("submit-user-name-button")
username_render = document.getElementById("user-name-current")
hidden_alert_change = document.getElementById("hidden-alert-change")

function getCookieJSON() {
    const currentCookieJSON = JSON.parse(decodeURIComponent(document.cookie.split(";")[0].split("=")[1]))
    return currentCookieJSON
}
function getUserName(){ //cookieからusernameを取得
    const json = getCookieJSON()
    const usernameEncoded = json.usernameEncoded || "";
    const username = decodeURI(usernameEncoded);
    return username;
}
function cookieCombine(ObjExpression,age){ //cookieにObjExpressionを追加、同じkeyがある場合は上書き / ageは保存日数
    const cookieJSON = getCookieJSON()
    Object.assign(cookieJSON, ObjExpression)
    document.cookie = "data=" + encodeURIComponent(JSON.stringify(cookieJSON)) + ";expires="+age.toString()
}
//ここまでlibの関数定義

const isRegistered = true
if(getUserName() == ""){ //すでにアカウントがcookie内にあるか
    isRegistered = false
}
function ErrorNullName(){ //名前が空白だった時の処理
    //見た目的にobviousなものが好ましい
    if(isRegistered){
        hidden_alert_change.textContent = "Please Input Your New Username"
    }else{
        hidden_alert_new.textContent = "Please Input Your Username"
    }
}

if(isRegistered){ //アカウントがある場合は新規登録を削除、ない場合はmanage_acc_baseを削除
    new_account_base.remove();
}else{
    manage_account_base.remove();
}
if(isRegistered == false){ //アカウント未所持時の処理
    new_account_button.onclick = () => { //アカウント作成
    const accNewName = new_account_input.value
    if(accNewName == ""){
        ErrorNullName();
    }else{
        const usernameEncoded = encodeURI(accNewName);
        const uniqueUserId = Math.floor(Math.random()* (2**64))
        cookieCombine({usernameEncoded: usernameEncoded, userid: uniqueUserId}, cookieAge)   
    }
}
}
if(isRegistered){ //アカウント所持時の処理
    username_render.textContent = getUserName(); //ユーザー名表示
    change_username_button.onclick = () => { //アカウント名変更
        const accNewName = change_username_input.value
    if(accNewName == ""){
        ErrorNullName();
    }else{
        const usernameEncoded = encodeURI(accNewName);
        cookieCombine({usernameEncoded: usernameEncoded}, cookieAge)
    }
    }
}