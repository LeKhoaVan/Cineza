import React from "react";

import "./register.css";

import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const onClickLogin = async () => {
    window.location.href = "/cineza/admin/login";
  };
  return (
    <div className="container">
      <div style={{ height: 20 }}></div>
      <div className="login-container">
        <h2 id="headerTitle">Đăng ký</h2>

        <div class="row">
          <label>Email</label>
          <input type="text" placeholder="Nhập email" />
          <label>Mật khẩu</label>
          <input type="text" placeholder="Nhập mật khẩu" />
          <button onClick={onClickLogin}>Đăng ký</button>
        </div>
        {/* <div class="forget">
        <div>Quên mật khẩu?</div>
      </div> */}

        <div class="row">
          <div className="register" onClick={onClickLogin}>
            Đăng nhập
          </div>
        </div>
        <div id="alternativeLogin"></div>
      </div>
    </div>
  );
};

export default Register;
