import ItemCard from "./ItemCard";
import "../blocks/ClothesSection.css";

function ClothesSection({
  onCardClick,
  onCardLike,
  handleAddClick,
  clothingItems,
}) {
  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <p className="clothes-section__title">All items:</p>
        <button
          className="clothes-section__add-new"
          type="button"
          onClick={handleAddClick}
        >
          + Add New
        </button>
      </div>
      <ul className="clothes-section__items">
        {clothingItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
