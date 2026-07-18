import { useEffect, useState } from "react";
import { useFormWithValidation } from "../hooks/useFormWithValidation";
import ModalWithForm from "./ModalWithForm";

const RegisterModal = ({
  isOpen,
  onClose,
  onRegister,
  onSubmit,
  onSwitchToLogin,
}) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const defaultValues = {
    name: "",
    avatar: "",
    email: "",
    password: "",
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
    email: [
      (value) => (!value.trim() ? "Email is required" : ""),
      (value) => {
        if (!value.trim()) return "";
        return /^\S+@\S+\.\S+$/.test(value) ? "" : "Invalid email format";
      },
    ],
    password: [(value) => (!value.trim() ? "Password is required" : "")],
  };

  const { values, errors, handleChange, handleReset, handleSubmit } =
    useFormWithValidation(defaultValues, validationRules);

  useEffect(() => {
    if (isOpen) {
      handleReset();
      setIsSubmitted(false);
    }
  }, [isOpen]);

  const handleFormSubmit = (formValues) => {
    if (onRegister) {
      onRegister(formValues);
    } else if (onSubmit) {
      onSubmit(formValues);
    }
  };

  const onFormSubmit = (event) => {
    setIsSubmitted(true);
    handleSubmit(handleFormSubmit)(event);
  };

  return (
    <ModalWithForm
      buttonText="Register"
      title="Register"
      name="register"
      onClose={onClose}
      onSubmit={onFormSubmit}
      isOpen={isOpen}
    >
      <label htmlFor="name" className="modal__label">
        Name
        <input
          type="text"
          id="name"
          name="name"
          className={`modal__input${isSubmitted && errors.name ? " modal__input--invalid" : ""}`}
          value={values.name || ""}
          onChange={handleChange}
          required
        />
        {isSubmitted && errors.name && (
          <span className="modal__error">{errors.name}</span>
        )}
      </label>

      <label htmlFor="avatar" className="modal__label">
        Avatar URL
        <input
          type="url"
          id="avatar"
          name="avatar"
          className={`modal__input${isSubmitted && errors.avatar ? " modal__input--invalid" : ""}`}
          value={values.avatar || ""}
          onChange={handleChange}
          required
        />
        {isSubmitted && errors.avatar && (
          <span className="modal__error">{errors.avatar}</span>
        )}
      </label>

      <label htmlFor="email" className="modal__label">
        Email
        <input
          type="email"
          id="email"
          name="email"
          className={`modal__input${isSubmitted && errors.email ? " modal__input--invalid" : ""}`}
          value={values.email || ""}
          onChange={handleChange}
          required
        />
        {isSubmitted && errors.email && (
          <span className="modal__error">{errors.email}</span>
        )}
      </label>

      <label htmlFor="password" className="modal__label">
        Password
        <input
          type="password"
          id="password"
          name="password"
          className={`modal__input${isSubmitted && errors.password ? " modal__input--invalid" : ""}`}
          value={values.password || ""}
          onChange={handleChange}
          required
        />
        {isSubmitted && errors.password && (
          <span className="modal__error">{errors.password}</span>
        )}
      </label>

      {onSwitchToLogin && (
        <button
          type="button"
          className="modal__link-button"
          onClick={onSwitchToLogin}
        >
          Already have an account? Login
        </button>
      )}
    </ModalWithForm>
  );
};

export default RegisterModal;
