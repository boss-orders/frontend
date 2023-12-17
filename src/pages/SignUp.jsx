import { useState } from "react";

function SignUp() {
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRe, setPasswordRe] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleMailChange = (e) => {
    setMail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordReChange = (e) => {
    setPasswordRe(e.target.value);
  };

  const SignInButton = () => {
    fetch("http://localhost:8080/auth/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: mail,
        password: password,
        password_confirmation: passwordRe,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((ans) => {
        console.log(ans);
      });
  };

  return (
    <div className="main">
      <h2>サインイン</h2>

      <form className="signin-form">
        <label htmlFor="email">
          名前
          <br />
          <input
            type="name"
            className="name-input"
            id="name"
            onChange={handleNameChange}
          />
        </label>

        <br />
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

        <label htmlFor="password-form" onChange={handlePasswordChange}>
          パスワード
          <br />
          <input
            type="password"
            className="password-input"
            id="password-form"
          />
        </label>

        <label htmlFor="password-form-re">
          もう一度パスワードを入力してください
          <br />
          <input
            type="password"
            className="password-input-re"
            id="password-form-re"
            onChange={handlePasswordReChange}
          />
        </label>

        <br />
        <button type="button" id="signin-button" onClick={SignInButton}>
          サインイン
        </button>
      </form>
    </div>
  );
}

export default SignUp;
