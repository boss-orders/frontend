import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import classes from "../style/Login.module.css";

import {
  Box,
  Input,
  Text,
  Button,
  FormControl,
  FormLabel,
  Alert,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";

function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [, setCookie] = useCookies();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
        if (!res.ok) {
          throw new Error("Failed to Login");
        }
        return res.json();
      })
      .then((token) => {
        setCookie("token", token.access_token);
        navigate("/");
      })

      .catch((error) => {
        setError(error.message);

        console.log(error.message);
      });
  }

  return (
    <div className={classes.container}>
      {error ? (
        <Alert status="error" id="alert">
          <AlertIcon />
          <AlertTitle>{error}</AlertTitle>
        </Alert>
      ) : null}

      <Box className={classes.formContainer}>
        <Text className={classes.title}>ログイン</Text>

        <FormControl className={classes.nameForm}>
          <FormLabel className={classes.label} htmlFor="name">
            名前
          </FormLabel>
          <Input
            type="text"
            id="name"
            className={classes.form}
            {...register("name", {
              required: "名前を入力してください",
              onChange: handleNameChange,
            })}
          />
          {errors.name && (
            <span id="error-name" className={classes.error}>
              {errors.name.message}
            </span>
          )}
        </FormControl>

        <br />

        <FormControl className={classes.nameForm}>
          <FormLabel className={classes.label} htmlFor="password">
            パスワード
          </FormLabel>
          <Input
            type="password"
            id="password"
            className={classes.form}
            {...register("password", {
              required: "パスワードを入力してください",
              onChange: handlePasswordChange,
            })}
          />
          {errors.password && (
            <span id="error-pass" className={classes.error}>
              {errors.password.message}
            </span>
          )}
        </FormControl>
        <br />

        <Button
          className={classes.loginButton}
          onClick={handleSubmit(LogInButton)}
        >
          ログイン
        </Button>
      </Box>
    </div>
  );
}

export default Login;
