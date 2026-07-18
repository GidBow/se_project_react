import ClothesSection from "./ClothesSection";
import SideBar from "./SideBar";
import EditProfileModal from "./EditProfileModal";
import "../blocks/Profile.css";

function Profile({
  onCardClick,
  handleAddClick,
  clothingItems,
  isEditProfileModalOpen,
  onEditProfileModalOpen,
  onEditProfileModalClose,
  onUpdateProfile,
  currentUser,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar onEditProfileClick={onEditProfileModalOpen} />
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          onCardClick={onCardClick}
          handleAddClick={handleAddClick}
          clothingItems={clothingItems}
        />
      </section>

      <EditProfileModal
        isOpen={isEditProfileModalOpen}
        onClose={onEditProfileModalClose}
        onUpdateProfile={onUpdateProfile}
        currentUser={currentUser}
      />
    </div>
  );
}

export default Profile;
