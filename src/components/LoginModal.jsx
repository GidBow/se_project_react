import { useEffect, useState } from "react";
import { useFormWithValidation } from "../hooks/useFormWithValidation";
import ModalWithForm from "./ModalWithForm";

const LoginModal = ({ isOpen, onClose, onLogin, onSubmit }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const defaultValues = {
    email: "",
    password: "",
  };

  const validationRules = {
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
    if (onLogin) {
      onLogin(formValues);
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
      buttonText="Login"
      title="Login"
      name="login"
      onClose={onClose}
      onSubmit={onFormSubmit}
      isOpen={isOpen}
    >
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
    </ModalWithForm>
  );
};

export default LoginModal;
