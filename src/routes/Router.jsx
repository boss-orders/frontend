import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "../pages/Home";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import CreatePost from "../pages/CreatePost";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<CreatePost />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/login" element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
