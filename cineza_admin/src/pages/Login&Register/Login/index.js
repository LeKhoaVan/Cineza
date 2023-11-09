import React from "react";

import "./login.css";

import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const onClickLogin = async () => {
    window.location.href = "/cineza/admin/home";
  };
  const onClickForget = async () => {
    window.location.href = "/cineza/admin/forget";
  };
  const onClickRegister = async () => {
    window.location.href = "/cineza/admin/register";
  };
  return (
    <div className="container">
      <div style={{ height: 20 }}></div>
      <div className="login-container">
        <h2 id="headerTitle">Đăng nhập</h2>

        <div class="row">
          <label>Email</label>
          <input type="text" placeholder="Nhập email" />
          <label>Mật khẩu</label>
          <input type="text" placeholder="Nhập mật khẩu" />
          <button onClick={onClickLogin}>Đăng nhập</button>
        </div>
        <div class="forget">
          <div onClick={onClickForget}>Quên mật khẩu?</div>
        </div>

        <div class="row">
          <div className="register" onClick={onClickRegister}>
            Đăng ký
          </div>
        </div>
        <div id="alternativeLogin"></div>
      </div>
    </div>
  );
};

export default Login;
