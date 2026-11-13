import { useContext } from "react";
import defaultAvatar from "../assets/avatar.svg";
import CurrentUserContext from "../contexts/CurrentUserContext";
import "../blocks/SideBar.css";

function SideBar({ onEditProfileClick, onLogout }) {
  const { currentUser } = useContext(CurrentUserContext);
  const displayName = currentUser?.name || "User";

  return (
    <div className="sidebar">
      <div className="sidebar__identity">
        <img
          className="sidebar__avatar"
          src={currentUser?.avatar || defaultAvatar}
          alt={`${displayName}'s avatar`}
        />
        <p className="sidebar__username">{displayName}</p>
      </div>
      <button
        type="button"
        className="sidebar__edit-profile"
        onClick={onEditProfileClick}
      >
        Change profile data
      </button>
      <button
        type="button"
        className="sidebar__logout"
        onClick={onLogout}
      >
        Log out
      </button>
    </div>
  );
}

export default SideBar;
