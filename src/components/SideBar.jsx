import avatar from "../assets/avatar.svg";
import "../blocks/SideBar.css";

function SideBar() {
  return (
    <div className="sidebar">
      <img className="sidebar__avatar" src={avatar} alt="user profile avatar" />
      <p className="sidebar__username">Terrence Tegenge</p>
    </div>
  );
}

export default SideBar;
