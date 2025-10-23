import { DeleteModal } from "./DeleteModal";
function ItemModal({
  activeModal,
  card,
  isOpen,
  onDeleteItemHandler,
  handleDeleteClick,
  onClose,
}) {
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
          className="modal__delete-btn"
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
