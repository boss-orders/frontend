import { useState } from "react";
import { useCookies } from "react-cookie";
import classes from "../style/Login.module.css";

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
    <div className={classes.container}>
      <Box className={classes.formContainer}>
        <Text className={classes.title}>ログイン</Text>

        <FormControl>
          <FormLabel className={classes.label}>名前</FormLabel>
          <Input
            type="text"
            className={classes.form}
            onChange={handleNameChange}
          />
        </FormControl>

        <FormControl>
          <FormLabel className={classes.label}>パスワード</FormLabel>
          <Input
            type="password"
            className={classes.form}
            onChange={handlePasswordChange}
          />
        </FormControl>

        <Button className={classes.button} onClick={LogInButton}>
          ログイン
        </Button>
      </Box>
    </div>
  );
}

export default Login;
