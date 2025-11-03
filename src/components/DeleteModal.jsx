export const DeleteModal = ({ isOpen, onDeleteItemHandler, onClose, card }) => {
  const clickDeleteItem = (item_id) => {
    onDeleteItemHandler(item_id);
  };
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__delete-content">
        <button
          type="button"
          className="modal__close"
          onClick={onClose}
        ></button>
        <p className="modal__delete-title">
          Are you sure you want to delete this item?{" "}
        </p>
        <p className="modal__delete-subtitle">This action is irreversible.</p>
        <div className="modal__btn-choice">
          <button
            className="modal__delete-yes"
            type="button"
            onClick={() => clickDeleteItem(card._id)}
          >
            Yes, Delete item
          </button>
          <button className="modal__delete-no" type="button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
