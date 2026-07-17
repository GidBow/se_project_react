import { useState, useCallback } from "react";

export function useFormWithValidation(defaultValues, validationRules = {}) {
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(true);

  // Validate a single field
  const validateField = useCallback(
    (name, value) => {
      if (!validationRules[name]) {
        return "";
      }

      const rules = validationRules[name];

      for (const rule of rules) {
        const error = rule(value);
        if (error) {
          return error;
        }
      }

      return "";
    },
    [validationRules]
  );

  // Validate all fields
  const validateForm = useCallback(
    (formValues) => {
      const newErrors = {};

      Object.keys(validationRules).forEach((fieldName) => {
        const error = validateField(fieldName, formValues[fieldName]);
        if (error) {
          newErrors[fieldName] = error;
        }
      });

      setErrors(newErrors);
      const isFormValid = Object.keys(newErrors).length === 0;
      setIsValid(isFormValid);
      return isFormValid;
    },
    [validationRules, validateField]
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    const newValues = { ...values, [name]: value };
    setValues(newValues);

    // Validate the field as it changes
    const error = validateField(name, value);
    setErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors };
      if (error) {
        updatedErrors[name] = error;
      } else {
        delete updatedErrors[name];
      }
      setIsValid(Object.keys(updatedErrors).length === 0);
      return updatedErrors;
    });
  };

  const handleReset = () => {
    setValues(defaultValues);
    setErrors({});
    setIsValid(true);
  };

  const handleSubmit = (callback) => {
    return (event) => {
      event.preventDefault();
      if (validateForm(values)) {
        callback(values);
        handleReset();
      }
    };
  };

  return {
    values,
    setValues,
    errors,
    isValid,
    handleChange,
    handleReset,
    handleSubmit,
    validateForm,
  };
}
