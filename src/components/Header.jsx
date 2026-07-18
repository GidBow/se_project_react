import { useContext } from "react";
import hlogo from "../assets/wtwr-header.svg";
import ToggleSwitch from "./ToggleSwitch";
import { Link } from "react-router-dom";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Header({
  handleAddClick,
  handleLoginClick,
  weatherData,
  isUsingFallbackLocation,
}) {
  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const getInitials = (name) => {
    if (!name) return "U";
    return name.charAt(0).toUpperCase();
  };

  return (
    <header className="header">
      <Link to="/">
        <img src={hlogo} alt="WTWR logo" className="header__logo" />
      </Link>
      <div className="header__date-location">
        {currentDate}, {weatherData.city}
        {isUsingFallbackLocation && (
          <span className="header__fallback"> (using fallback location)</span>
        )}
      </div>
      <div className="header__actions">
        <ToggleSwitch />
        <button
          type="button"
          className="header__add-clothes"
          onClick={handleAddClick}
        >
          +Add garment
        </button>
      </div>
      {isLoggedIn && currentUser ? (
        <Link to="/profile" className="header__profile-link">
          <p className="header__user-name">{currentUser.name}</p>
          {currentUser.avatar ? (
            <img
              src={currentUser.avatar}
              alt="User Avatar"
              className="header__user-avatar"
            />
          ) : (
            <div className="header__user-avatar header__user-avatar--placeholder">
              {getInitials(currentUser.name)}
            </div>
          )}
        </Link>
      ) : (
        <button
          type="button"
          className="header__profile-link"
          onClick={handleLoginClick}
        >
          <p className="header__user-name">Sign in</p>
        </button>
      )}
    </header>
  );
}
export default Header;
