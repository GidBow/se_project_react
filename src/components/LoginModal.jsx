import { useEffect, useMemo, useState } from "react";
import { useFormWithValidation } from "../hooks/useFormWithValidation";
import ModalWithForm from "./ModalWithForm";

const LoginModal = ({
  isOpen,
  onClose,
  onLogin,
  onSubmit,
  onSwitchToRegister,
  hasLoginError,
  onClearLoginError,
}) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const defaultValues = useMemo(
    () => ({
      email: "",
      password: "",
    }),
    [],
  );

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

  const { values, errors, isValid, handleChange, handleReset, handleSubmit } =
    useFormWithValidation(defaultValues, validationRules);

  useEffect(() => {
    if (isOpen) {
      handleReset();
      setIsSubmitted(false);
    }
  }, [isOpen, handleReset]);

  const handleFormSubmit = (formValues) => {
    onClearLoginError?.();
    if (onLogin) {
      onLogin(formValues);
    } else if (onSubmit) {
      onSubmit(formValues);
    }
  };

  const handleInputChange = (event) => {
    onClearLoginError?.();
    handleChange(event);
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
      switchButtonText={onSwitchToRegister ? "or Sign Up" : undefined}
      onSwitchButtonClick={onSwitchToRegister}
      isSubmitDisabled={!isValid}
      contentClassName="modal__content--compact"
    >
      <label htmlFor="email-login" className="modal__label">
        Email
        <input
          type="email"
          id="email-login"
          name="email"
          className={`modal__input${isSubmitted && errors.email ? " modal__input--invalid" : ""}`}
          value={values.email || ""}
          onChange={handleInputChange}
          required
        />
        {isSubmitted && errors.email && (
          <span className="modal__error">{errors.email}</span>
        )}
      </label>

      <label htmlFor="password-login" className="modal__label">
        Password
        <input
          type="password"
          id="password-login"
          name="password"
          className={`modal__input${isSubmitted && errors.password ? " modal__input--invalid" : ""}`}
          value={values.password || ""}
          onChange={handleInputChange}
          required
        />
        {isSubmitted && errors.password && (
          <span className="modal__error">{errors.password}</span>
        )}
        {hasLoginError && (
          <span className="modal__error" role="alert">
            Email or password incorrect
          </span>
        )}
      </label>

    </ModalWithForm>
  );
};

export default LoginModal;
