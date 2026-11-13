function ModalWithForm({
  children,
  buttonText,
  title,
  onClose,
  isOpen,
  onSubmit,
  switchButtonText,
  onSwitchButtonClick,
  isSubmitDisabled = false,
  contentClassName = "",
}) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className={`modal__content ${contentClassName}`}>
        <h2 className="modal__title">{title}</h2>
        <button type="button" className="modal__close" onClick={onClose} />
        <form className="modal__form" onSubmit={onSubmit}>
          {children}
          <div className="modal__actions">
            <button
              className="modal__submit"
              type="submit"
              disabled={isSubmitDisabled}
            >
              {buttonText}
            </button>
            {switchButtonText && onSwitchButtonClick && (
              <button
                type="button"
                className="modal__link-button"
                onClick={onSwitchButtonClick}
              >
                {switchButtonText}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
