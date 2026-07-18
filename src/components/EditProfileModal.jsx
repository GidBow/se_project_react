import { useEffect, useState } from "react";
import ModalWithForm from "./ModalWithForm";
import { useFormWithValidation } from "../hooks/useFormWithValidation";

function EditProfileModal({ isOpen, onClose, onUpdateProfile, currentUser }) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const defaultValues = {
    name: currentUser?.name || "",
    avatar: currentUser?.avatar || "",
  };

  const validationRules = {
    name: [
      (value) => (!value.trim() ? "Name is required" : ""),
      (value) =>
        value.trim().length < 2 ? "Name must be at least 2 characters" : "",
    ],
    avatar: [
      (value) => (!value.trim() ? "Avatar URL is required" : ""),
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
  };

  const { values, errors, handleChange, handleSubmit, setValues } =
    useFormWithValidation(defaultValues, validationRules);

  useEffect(() => {
    if (isOpen) {
      setValues({
        name: currentUser?.name || "",
        avatar: currentUser?.avatar || "",
      });
      setIsSubmitted(false);
    }
  }, [isOpen, currentUser, setValues]);

  const onSubmit = (formValues) => {
    onUpdateProfile(formValues);
  };

  const onFormSubmit = (event) => {
    setIsSubmitted(true);
    handleSubmit(onSubmit)(event);
  };

  return (
    <ModalWithForm
      buttonText="Save changes"
      title="Edit profile"
      onClose={onClose}
      onSubmit={onFormSubmit}
      isOpen={isOpen}
    >
      <label htmlFor="name" className="modal__label">
        Name
        <input
          type="text"
          name="name"
          className={`modal__input${
            isSubmitted && errors.name ? " modal__input--invalid" : ""
          }`}
          id="name"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
          autoComplete="off"
        />
        {isSubmitted && errors.name && (
          <span className="modal__error">{errors.name}</span>
        )}
      </label>

      <label htmlFor="avatar" className="modal__label">
        Avatar URL
        <input
          type="url"
          name="avatar"
          className={`modal__input${
            isSubmitted && errors.avatar ? " modal__input--invalid" : ""
          }`}
          id="avatar"
          placeholder="Avatar URL"
          value={values.avatar}
          onChange={handleChange}
          autoComplete="off"
        />
        {isSubmitted && errors.avatar && (
          <span className="modal__error">{errors.avatar}</span>
        )}
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
