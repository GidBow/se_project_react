function ItemModal({ activeModal, card, handleCloseClick, isOpen }) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content-type-image">
        <button
          type="button"
          className="modal__close"
          onClick={handleCloseClick}
        ></button>
        <img className="modal__image" src={card.link} alt={card.name} />
        <h2 className="modal__caption">{card.name}</h2>
        <p className="modal__weather">Weather: {card.weather} </p>
        <button className="modal__delete-btn" type="button">
          Delete Item
        </button>
      </div>
    </div>
  );
}
export default ItemModal;
