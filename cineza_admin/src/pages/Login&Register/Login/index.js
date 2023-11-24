import React from "react";

import "./login.css";

import { useEffect, useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onClickLogin = async () => {
    try {
      // const result = await axios.get("");
      // if (result.status == 200) {
      //   if (result.data.type == "ADMIN") {
      //     localStorage.setItem("userAdmin", result.data);
      //   }
      // } else {
      //   console.log("error check role user");
      // }
      localStorage.setItem("userAdmin", { name: "ewr" })
      window.location.href = "/cineza/admin/home";
    } catch (error) {
      console.log("error check role user: ", error);
    }
  };
  const onClickForget = async () => {
    window.location.href = "/cineza/admin/forget";
  };
  const onClickRegister = async () => {
    window.location.href = "/cineza/admin/register";
  };

  const handleOnChangePassword = (text) => {
    setPassword(text.target.value);
  }
  const handleOnChangeEmail = (text) => {
    setEmail(text.target.value);
  }
  return (
    <div className="container">
      <div style={{ height: 20 }}></div>
      <div className="login-container">
        <h2 id="headerTitle">Đăng nhập</h2>

        <div className="row">
          <label>Email</label>
          <input type="text" placeholder="Nhập email" onChange={handleOnChangeEmail} />
          <label>Mật khẩu</label>
          <input type="text" placeholder="Nhập mật khẩu" onChange={handleOnChangePassword} />
          <button onClick={onClickLogin}>Đăng nhập</button>
        </div>
        <div className="forget">
          <div onClick={onClickForget}>Quên mật khẩu?</div>
        </div>

        <div className="row">
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
