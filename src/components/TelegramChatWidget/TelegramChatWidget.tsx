'use client'

import { FormEvent, useState } from 'react'
import './TelegramChatWidget.css'

export function TelegramChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [feedback, setFeedback] = useState('')

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const trimmedMessage = message.trim()
    if (!trimmedMessage) {
      setFeedback('Введите сообщение.')
      return
    }

    setIsSending(true)
    setFeedback('')

    try {
      const response = await fetch('/api/telegram-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: trimmedMessage }),
      })

      if (!response.ok) {
        const payload = await response.json().catch(() => null)
        const serverError =
          payload && typeof payload.error === 'string' ? payload.error : 'Не удалось отправить. Попробуйте еще раз.'
        setFeedback(serverError)
        return
      }

      setMessage('')
      setFeedback('Отправлено! Скоро вам ответим в Telegram.')
    } catch {
      setFeedback('Сетевая ошибка. Попробуйте позже.')
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="telegram-chat-widget">
      {isOpen ? (
        <div className="telegram-chat-widget__panel" role="dialog" aria-label="Чат с менеджером">
          <div className="telegram-chat-widget__header">
            <div>
              <p className="telegram-chat-widget__title">Чат с менеджером</p>
              <p className="telegram-chat-widget__subtitle">Пишете здесь - получаем в Telegram</p>
            </div>
            <button
              type="button"
              className="telegram-chat-widget__close"
              onClick={() => setIsOpen(false)}
              aria-label="Закрыть чат"
            >
              ×
            </button>
          </div>

          <form className="telegram-chat-widget__form" onSubmit={handleSubmit}>
            <textarea
              className="telegram-chat-widget__textarea"
              placeholder="Напишите сообщение..."
              value={message}
              onChange={(event) => {
                setMessage(event.target.value)
                if (feedback) {
                  setFeedback('')
                }
              }}
              disabled={isSending}
            />
            {feedback ? <p className="telegram-chat-widget__feedback">{feedback}</p> : null}
            <button className="telegram-chat-widget__send" type="submit" disabled={isSending}>
              {isSending ? 'Отправка...' : 'Отправить'}
            </button>
          </form>
        </div>
      ) : null}

      <button
        type="button"
        className="telegram-chat-widget__toggle"
        onClick={() => setIsOpen((currentState) => !currentState)}
        aria-label={isOpen ? 'Скрыть чат' : 'Открыть чат'}
      >
        <span className="telegram-chat-widget__toggle-icon" aria-hidden="true">TG</span>
        <span className="telegram-chat-widget__toggle-text">Чат в Telegram</span>
      </button>
    </div>
  )
}
