import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import { DeleteModal } from "./DeleteModal";

function ItemModal({
  activeModal,
  card,
  isOpen,
  onDeleteItemHandler,
  handleDeleteClick,
  onClose,
}) {
  const { currentUser } = useContext(CurrentUserContext);
  const isOwn = currentUser && card.owner === currentUser._id;
  const itemDeleteButtonClassName = `modal__delete-btn ${
    isOwn ? "" : "modal__delete-btn_hidden"
  }`;

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content-type-image">
        <button
          type="button"
          className="modal__close"
          onClick={onClose}
        ></button>
        <img className="modal__image" src={card.imageUrl} alt={card.name} />
        <h2 className="modal__caption">{card.name}</h2>
        <p className="modal__weather">Weather: {card.weather} </p>
        <button
          className={itemDeleteButtonClassName}
          type="button"
          onClick={() => handleDeleteClick(card)}
        >
          Delete Item
        </button>
        <DeleteModal
          isOpen={activeModal === "delete"}
          onClose={onClose}
          onDeleteItemHandler={onDeleteItemHandler}
          card={card}
        />
      </div>
    </div>
  );
}
export default ItemModal;
