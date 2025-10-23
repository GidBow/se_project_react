import hlogo from "../assets/wtwr-header.svg";
import avatar from "../assets/avatar.svg";
import ToggleSwitch from "./ToggleSwitch";
import { Link } from "react-router-dom";

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    <header className="header">
      <Link to="/">
        <img src={hlogo} alt="WTWR logo" className="header__logo" />
      </Link>
      <div className="header__date-location">
        {currentDate}, {weatherData.city}
      </div>
      <ToggleSwitch />
      <button
        type="button"
        className="header__add-clothes"
        onClick={handleAddClick}
      >
        +Add garment
      </button>
      <Link to="/Profile" className="header__profile-link">
        <p className="header__user-name">Terrence Tegegne</p>
        <img src={avatar} alt="User Avatar" className="header__user-avatar" />
      </Link>
    </header>
  );
}
export default Header;
