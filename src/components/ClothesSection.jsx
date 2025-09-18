import { useState } from "react";
import { defaultClothingItems } from "../utils/constants";
import ItemCard from "./ItemCard";
import "../blocks/ClothesSection.css";

function ClothesSection({ onCardClick }) {
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);

  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <p className="clothes-section__title">Your items:</p>
        <button className="clothes-section__add-new">+ Add New</button>
      </div>
      <ul className="clothes-section__items">
        {clothingItems
          //   .filter((item) => {
          //     return item.weather === weatherData.type;
          //   })
          .map((item) => {
            return (
              <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
            );
          })}
      </ul>
    </div>
  );
}

export default ClothesSection;
