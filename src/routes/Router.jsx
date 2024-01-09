import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useCookies } from "react-cookie";

import Home from "../pages/Home";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import CreatePost from "../pages/CreatePost";

function Router() {
  const [cookies] = useCookies();
  const token = cookies.token;

  return (
    <BrowserRouter>
      <Routes>
        {token ? (
          <Route path="/" element={<Home />} />
        ) : (
          <Route path="/" element={<Login />} />
        )}
        <Route path="/" element={<Home />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/new" element={<CreatePost />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
