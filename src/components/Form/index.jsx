import React from "react";
import { useState } from "react";
import styles from "./form.module.scss";

const Form = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (email && cardNumber) {
      setFormSubmitted(true);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Электронная почта
            </label>
            <input
              type="email"
              id="email"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="cardNumber" className={styles.label}>
              Номер банковской карты
            </label>
            <input
              type="text"
              id="cardNumber"
              className={styles.input}
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              required
            />
          </div>
          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.submitButton}>
              Подтвердить
            </button>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={onClose}
            >
              Вернуться назад
            </button>
          </div>
        </form>
        {formSubmitted && <p className={styles.successMessage}>Успешно!</p>}
      </div>
    </div>
  );
};

export default Form;
