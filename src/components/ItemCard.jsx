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
      <div className="cards__image-container">
        <div className="cards__image-overlay">
          <h2 className="cards__name">{item.name}</h2>
          {currentUser && (
            <button
              type="button"
              className={`cards__like${isLiked ? " cards__like_active" : ""}`}
              onClick={handleLike}
              aria-label={isLiked ? `Unlike ${item.name}` : `Like ${item.name}`}
              aria-pressed={isLiked}
            >
              <svg
                className="cards__like-icon"
                viewBox="0 0 24 24"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  d="M12 21.35 10.55 20C5.4 15.36 2 12.28 2 8.5A4.5 4.5 0 0 1 6.5 4c1.74 0 3.41.81 4.5 2.09A6.02 6.02 0 0 1 15.5 4 4.5 4.5 0 0 1 20 8.5c0 3.78-3.4 6.86-8.55 11.5L12 21.35Z"
                  fill={isLiked ? "currentColor" : "none"}
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
        </div>
        <img
          onClick={handleCardClick}
          className="cards__img"
          src={item.imageUrl}
          alt={item.name}
        />
      </div>
    </li>
  );
}

export default ItemCard;
