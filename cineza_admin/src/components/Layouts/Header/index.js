import "./header.css";
import logo from "../../../assets/image/logo.png";
import avatarDefault from "../../../assets/image/avatarDefault.png";
import iconMore from "../../../assets/imageButtons/more.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header-container">
      <Link className="header-logo" to="/home">
        <img className="logo-img" src={logo} />
        <p className="logo-name">CINEZA</p>
      </Link>
      <div className="header-inform">
        <img className="header-inform-avatar" src={avatarDefault} />
        <p className="header-inform-name">Đức Hiếu</p>
        <div className="header-inform-action">
          <button className="button-more">
            <img className="action-icon" src={iconMore} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
