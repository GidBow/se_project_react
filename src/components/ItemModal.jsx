function ItemModal({
  activeModal,
  card,
  handleCloseClick,
  isOpen,
  onDeleteItemHandler,
}) {
  const deleteItem = () => {
    onDeleteItemHandler(card.id);
  };

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content-type-image">
        <button
          type="button"
          className="modal__close"
          onClick={handleCloseClick}
        ></button>
        <img className="modal__image" src={card.imageUrl} alt={card.name} />
        <h2 className="modal__caption">{card.name}</h2>
        <p className="modal__weather">Weather: {card.weather} </p>
        <button
          className="modal__delete-btn"
          type="button"
          onClick={deleteItem}
        >
          Delete Item
        </button>
      </div>
    </div>
  );
}
export default ItemModal;
