import { useContext } from "react";
import ItemCard from "./ItemCard";
import CurrentUserContext from "../contexts/CurrentUserContext";
import "../blocks/ClothesSection.css";

function ClothesSection({ onCardClick, handleAddClick, clothingItems }) {
  const { currentUser } = useContext(CurrentUserContext);
  const userItems = clothingItems.filter(
    (item) => currentUser && item.owner === currentUser._id,
  );

  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <p className="clothes-section__title">Your items:</p>
        <button
          className="clothes-section__add-new"
          type="button"
          onClick={handleAddClick}
        >
          + Add New
        </button>
      </div>
      <ul className="clothes-section__items">
        {userItems.map((item) => {
          return (
            <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
