function ItemModal({ activeModal, card, handleCloseClick }) {
  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content-type-image">
        <button
          type="button"
          className="modal__close"
          onClick={handleCloseClick}
        ></button>
        <img className="modal__image" src={card.link} alt={card.name} />
        <h2 className="modal__caption">{card.name}</h2>
        <p className="modal__weather">Weather: {card.weather} </p>
      </div>
    </div>
  );
}
export default ItemModal;
