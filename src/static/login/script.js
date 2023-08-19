//DOMContentLoaded イベントを使用することで、DOMが完全に構築されてからコードが実行されることが保証される。
document.addEventListener("DOMContentLoaded", () => {
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const loginButton = document.getElementById("loginButton");

  loginButton.addEventListener("click", () => {
    const username = usernameInput.value;
    const password = passwordInput.value;

    // サーバーにデータを送信してCookieを保存
    fetch("http://localhost:3000/sendUserName", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("ログイン成功！");
        } else {
          alert("ログイン失敗");
        }
      })
      .catch((error) => {
        console.error("エラー:", error);
      });
  });
});
