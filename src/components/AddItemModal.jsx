import ModalWithForm from "./ModalWithForm";
import { useForm } from "../hooks/useForm";
import { useEffect } from "react";

const AddItemModal = ({ isOpen, onAddItem, onClose }) => {
  const defaultValues = {
    name: "",
    imageUrl: "",
    weather: "",
  };
  const { values, handleChange, handleReset } = useForm(defaultValues);

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddItem(values);
  }
  useEffect(() => {
    if (isOpen) {
      handleReset();
    }
  }, [isOpen]);

  return (
    <ModalWithForm
      buttonText="Add garment"
      title="New Garment"
      name="new-card"
      onClose={onClose}
      onSubmit={handleSubmit}
      isOpen={isOpen}
    >
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          type="text"
          name="name"
          className="modal__input"
          id="name"
          placeholder="name"
          value={values.name}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image{" "}
        <input
          type="url"
          name="imageUrl"
          className="modal__input"
          id="imageUrl"
          placeholder="Image URL"
          value={values.imageUrl}
          onChange={handleChange}
        />
      </label>
      <fieldset className="modal__radio-btns">
        <legend className="modal__legend">Select the weather type:</legend>

        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            id="hot"
            value="hot"
            type="radio"
            name="weather"
            className="modal__radio-input"
            onChange={handleChange}
            checked={values.weather === "hot"}
          />
          Hot
        </label>

        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            id="warm"
            value="warm"
            type="radio"
            name="weather"
            className="modal__radio-input"
            onChange={handleChange}
            checked={values.weather === "warm"}
          />
          Warm
        </label>

        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            id="cold"
            value="cold"
            type="radio"
            name="weather"
            className="modal__radio-input"
            onChange={handleChange}
            checked={values.weather === "cold"}
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
