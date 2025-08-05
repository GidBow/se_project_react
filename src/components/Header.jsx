import hlogo from "../assets/wtwr-header.svg";
import avatar from "../assets/avatar.svg";

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    <header className="header">
      <img src={hlogo} alt="WTWR logo" className="header__logo" />
      <div className="header__date-location">
        {currentDate}, {weatherData.city}
      </div>
      <button
        type="button"
        className="header__add-clothes"
        onClick={handleAddClick}
      >
        Add garment
      </button>
      <p className="header__user-name">Terrence Tegegne</p>
      <img src={avatar} alt="User Avatar" className="header__user-avatar" />
    </header>
  );
}
export default Header;
