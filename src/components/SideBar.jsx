import { useContext } from "react";
import avatar from "../assets/avatar.svg";
import CurrentUserContext from "../contexts/CurrentUserContext";
import "../blocks/SideBar.css";

function SideBar({ onEditProfileClick }) {
  const { currentUser } = useContext(CurrentUserContext);
  const displayName = currentUser?.name || "User";
  const displayAvatar = currentUser?.avatar || avatar;

  return (
    <div className="sidebar">
      <img
        className="sidebar__avatar"
        src={displayAvatar}
        alt="user profile avatar"
      />
      <p className="sidebar__username">{displayName}</p>
      <button
        type="button"
        className="sidebar__edit-profile"
        onClick={onEditProfileClick}
      >
        Edit profile
      </button>
    </div>
  );
}

export default SideBar;
