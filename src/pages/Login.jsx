import { useState } from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useCookies } from "react-cookie";

import {
  Box,
  Input,
  Text,
  Button,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";

function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [, setCookie] = useCookies();

  const container = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    margin-bottom: 70px;
    background-color: #002417;
  `;

  const title = css`
    color: white;
    font-size: 25px;
    margin: 30px 0;
  `;

  const formContainer = css`
    width: 60%;
    margin: 30px 0;
  `;

  const form = css`
    border: 2px solid white;
    margin-bottom: 20px;
    color: white;
  `;

  const label = css`
    color: white;
  `;

  const button = css`
    background-color: rgb(6, 130, 68);
    padding: 10px 20px;
    color: white;

    &:hover {
      background-color: #004d29;
    }
  `;

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  async function LogInButton() {
    const data = new URLSearchParams({
      grant_type: "",
      username: name,
      password: password,
      scope: "",
      client_id: "",
      client_secret: "",
    });

    fetch("http://127.0.0.1:8000/token", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: data,
    })
      .then((res) => {
        return res.json();
      })
      .then((token) => {
        console.log(token);
        setCookie("token", token.access_token);
      })

      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div css={container}>
      <Box css={formContainer}>
        <Text css={title}>ログイン</Text>

        <FormControl>
          <FormLabel css={label}>名前</FormLabel>
          <Input type="text" css={form} onChange={handleNameChange} />
        </FormControl>

        <FormControl>
          <FormLabel css={label}>パスワード</FormLabel>
          <Input type="password" css={form} onChange={handlePasswordChange} />
        </FormControl>

        <Button css={button} onClick={LogInButton}>
          ログイン
        </Button>
      </Box>
    </div>
  );
}

export default Login;
