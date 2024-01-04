import { useState } from "react";

function Login() {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  const handleMailChange = (e) => {
    setMail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const LogInButton = () => {
    fetch("http://localhost:8080/auth/sign_in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: mail,
        password: password,
      }),
    })
      .then((res) => {
        console.log(res);

        return res;
      })
      .then((ans) => {
        console.log(ans.headers.get("Authorization")); // VSJ-lEs9u2vuDrTLnqTUZw
      });
  };

  return (
    <div className="main">
      <h2>ログイn</h2>

      <form className="signin-form">
        <label htmlFor="email">
          メールアドレス
          <br />
          <input
            type="email"
            className="email-input"
            id="email"
            onChange={handleMailChange}
          />
        </label>

        <br />

        <label htmlFor="password-form">
          パスワード
          <br />
          <input
            type="password"
            className="password-input"
            id="password-form"
            onChange={handlePasswordChange}
          />
        </label>

        <br />
        <button type="button" id="signin-button" onClick={LogInButton}>
          ログイン
        </button>
      </form>
    </div>
  );
}

export default Login;
