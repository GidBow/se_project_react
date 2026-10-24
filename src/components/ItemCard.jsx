import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardLike }) {
  const { currentUser } = useContext(CurrentUserContext);
  const isLiked = item.likes?.includes(currentUser?._id) ?? false;

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = () => {
    onCardLike(item);
  };

  return (
    <li className="cards__id">
      <h2 className="cards__name">{item.name}</h2>
      {currentUser && (
        <button
          type="button"
          className={`cards__like${isLiked ? " cards__like_active" : ""}`}
          onClick={handleLike}
          aria-label={isLiked ? `Unlike ${item.name}` : `Like ${item.name}`}
          aria-pressed={isLiked}
        >
          {isLiked ? "Liked" : "Like"}
        </button>
      )}
      <img
        onClick={handleCardClick}
        className="cards__img"
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
