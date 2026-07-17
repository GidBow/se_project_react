import ModalWithForm from "./ModalWithForm";
import { useFormWithValidation } from "../hooks/useFormWithValidation";
import { useEffect, useState } from "react";

const AddItemModal = ({ isOpen, onAddItem, onClose }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const defaultValues = {
    name: "",
    imageUrl: "",
    weather: "",
  };

  const validationRules = {
    name: [
      (value) => (!value.trim() ? "Name is required" : ""),
      (value) =>
        value.trim().length < 2 ? "Name must be at least 2 characters" : "",
    ],
    imageUrl: [
      (value) => (!value.trim() ? "Image URL is required" : ""),
      (value) => {
        if (!value.trim()) return "";
        try {
          new URL(value);
          return "";
        } catch {
          return "Invalid URL format";
        }
      },
    ],
    weather: [(value) => (!value ? "Weather type is required" : "")],
  };

  const { values, errors, isValid, handleChange, handleReset, handleSubmit } =
    useFormWithValidation(defaultValues, validationRules);

  function onSubmit(formValues) {
    onAddItem(formValues);
  }

  useEffect(() => {
    if (isOpen) {
      handleReset();
      setIsSubmitted(false);
    }
  }, [isOpen]);

  // Custom submit handler to track submission attempt
  const onFormSubmit = (event) => {
    setIsSubmitted(true);
    handleSubmit(onSubmit)(event);
  };

  return (
    <ModalWithForm
      buttonText="Add garment"
      title="New Garment"
      name="new-card"
      onClose={onClose}
      onSubmit={onFormSubmit}
      isOpen={isOpen}
    >
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          type="text"
          name="name"
          className={`modal__input${
            isSubmitted && errors.name ? " modal__input--invalid" : ""
          }`}
          id="name"
          placeholder="name"
          value={values.name}
          onChange={handleChange}
          autoComplete="off"
        />
        {isSubmitted && errors.name && (
          <span className="modal__error">{errors.name}</span>
        )}
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image{" "}
        <input
          type="url"
          name="imageUrl"
          className={`modal__input${
            isSubmitted && errors.imageUrl ? " modal__input--invalid" : ""
          }`}
          id="imageUrl"
          placeholder="Image URL"
          value={values.imageUrl}
          onChange={handleChange}
          autoComplete="off"
        />
        {isSubmitted && errors.imageUrl && (
          <span className="modal__error">{errors.imageUrl}</span>
        )}
      </label>
      <fieldset className="modal__radio-btns">
        <legend className="modal__legend">Select the weather type:</legend>
        {isSubmitted && errors.weather && (
          <span className="modal__error">{errors.weather}</span>
        )}

        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            id="hot"
            value="hot"
            type="radio"
            name="weather"
            className="modal__radio-input"
            onChange={handleChange}
            checked={values.weather === "hot"}
            autoComplete="off"
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
            autoComplete="off"
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
            autoComplete="off"
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
