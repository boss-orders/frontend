import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useCookies } from "react-cookie";

import Home from "../pages/Home";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import DetailUser from "../pages/DetailUser";

function Router() {
  const [cookies] = useCookies();
  const token = cookies.token;

  return (
    <BrowserRouter>
      <Routes>
        {token ? (
          <>
            <Route path="/" element={<Home />} />
            <Route exact path="/user/:id" element={<DetailUser />} />
          </>
        ) : (
          <Route path="/" element={<Login />} />
        )}

        <Route exact path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
