'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';

type ContactFormState = {
  email: string;
  message: string;
  error: string;
};

export function ContactForm() {
  const submitTimeoutRef = useRef<number | null>(null);
  const [formState, setFormState] = useState<ContactFormState>({
    email: '',
    message: '',
    error: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    return () => {
      if (submitTimeoutRef.current !== null) {
        window.clearTimeout(submitTimeoutRef.current);
      }
    };
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuccessMessage('');

    if (!formState.message.trim()) {
      setFormState((currentState) => ({
        ...currentState,
        error: 'Введите сообщение, а не только пробелы.',
      }));
      return;
    }

    setIsSubmitting(true);

    submitTimeoutRef.current = window.setTimeout(() => {
      setIsSubmitting(false);
      setFormState({
        email: '',
        message: '',
        error: '',
      });
      setSuccessMessage('Сообщение успешно отправлено.');
    }, 1200);
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="contact-field">
        <label htmlFor="email">Адрес электронной почты *</label>
        <input
          type="email"
          id="email"
          name="email"
          className="contact-input"
          required
          placeholder="ваш@email.com"
          value={formState.email}
          onChange={(event) => {
            setFormState((currentState) => ({ ...currentState, email: event.target.value, error: '' }));
            setSuccessMessage('');
          }}
          disabled={isSubmitting}
        />
      </div>

      <div className="contact-field">
        <label htmlFor="message">Ваше сообщение *</label>
        <textarea
          id="message"
          name="message"
          className="contact-textarea"
          required
          placeholder="Напишите всё, что вы о нас думаете..."
          value={formState.message}
          onChange={(event) => {
            setFormState((currentState) => ({ ...currentState, message: event.target.value, error: '' }));
            setSuccessMessage('');
          }}
          disabled={isSubmitting}
        />
      </div>

      {formState.error ? <p className="contact-error">{formState.error}</p> : null}
      {successMessage ? <p className="contact-success">{successMessage}</p> : null}

      <button 
        type="submit" 
        className="contact-submit" 
        disabled={isSubmitting}
        onClick={() => setSuccessMessage('')}
      >
        {isSubmitting ? (
          <>
            <span className="contact-spinner" aria-hidden="true" />
            <span>Отправка...</span>
          </>
        ) : (
          'Отправить'
        )}
      </button>
    </form>
  );
}
