import ClothesSection from "./ClothesSection";
import SideBar from "./SideBar";
import EditProfileModal from "./EditProfileModal";
import "../blocks/Profile.css";

function Profile({
  onCardClick,
  onCardLike,
  handleAddClick,
  clothingItems,
  isEditProfileModalOpen,
  onEditProfileModalOpen,
  onEditProfileModalClose,
  onUpdateProfile,
  onLogout,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar
          onEditProfileClick={onEditProfileModalOpen}
          onLogout={onLogout}
        />
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          onCardClick={onCardClick}
          onCardLike={onCardLike}
          handleAddClick={handleAddClick}
          clothingItems={clothingItems}
        />
      </section>

      <EditProfileModal
        isOpen={isEditProfileModalOpen}
        onClose={onEditProfileModalClose}
        onUpdateProfile={onUpdateProfile}
      />
    </div>
  );
}

export default Profile;
