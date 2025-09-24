import ClothesSection from "./ClothesSection";
import SideBar from "./SideBar";
import "../blocks/Profile.css";

function Profile({ onCardClick, handleAddClick }) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar />
        <img src="../assets" alt="" />
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          onCardClick={onCardClick}
          handleAddClick={handleAddClick}
        />
      </section>
    </div>
  );
}

export default Profile;
