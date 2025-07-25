import "../blocks/Header.css";
import hlogo from "../assets/wtwr-header.svg";
import avatar from "../assets/avatar.svg";

const currentDate = new Date().toLocaleString("default", {
  month: "long",
  day: "numeric",
});

function Header() {
  return (
    <>
      <header className="header">
        <img src={hlogo} alt="WTWR logo" className="header__logo" />
        <div className="header__date-location">Date & Location</div>
        <button className="header__add-clothes">+Add clothes</button>
        <p className="header__user-name">Terrence Tegegne</p>
        <img src={avatar} alt="User Avatar" className="header__user-avatar" />
      </header>
    </>
  );
}
export default Header;
