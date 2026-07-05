import { NextResponse } from 'next/server'

const isValidBotToken = (value: string) => /^\d+:[A-Za-z0-9_-]{20,}$/.test(value)
const isValidChatId = (value: string) => /^-?\d+$/.test(value)

export async function POST(request: Request) {
  try {
    const { message } = await request.json()
    const botToken = process.env.TELEGRAM_BOT_TOKEN?.trim() ?? ''
    const chatId = process.env.TELEGRAM_CHAT_ID?.trim() ?? ''
    const parsedMessage = typeof message === 'string' ? message.trim() : ''

    if (!botToken || !chatId) {
      return NextResponse.json(
        { success: false, error: 'Не заданы TELEGRAM_BOT_TOKEN или TELEGRAM_CHAT_ID.' },
        { status: 500 }
      )
    }

    if (!isValidBotToken(botToken) || !isValidChatId(chatId)) {
      return NextResponse.json(
        { success: false, error: 'Неверный формат TELEGRAM_BOT_TOKEN или TELEGRAM_CHAT_ID.' },
        { status: 500 }
      )
    }

    if (!parsedMessage) {
      return NextResponse.json(
        { success: false, error: 'Пустое сообщение отправлять нельзя.' },
        { status: 400 }
      )
    }

    const telegramText = ['Новый диалог с сайта', '', parsedMessage].join('\n')

    const telegramResponse = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: telegramText,
      }),
      signal: AbortSignal.timeout(8000),
    })

    if (!telegramResponse.ok) {
      const telegramError = await telegramResponse.text()
      console.error('Ошибка Telegram API:', telegramError)
      return NextResponse.json({ success: false, error: 'Ошибка отправки в Telegram.' }, { status: 502 })
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    if (error instanceof Error && error.name === 'TimeoutError') {
      return NextResponse.json(
        { success: false, error: 'Нет доступа к Telegram API (timeout).' },
        { status: 504 }
      )
    }

    console.error('Ошибка отправки в Telegram:', error)
    return NextResponse.json(
      { success: false, error: 'Не удалось подключиться к Telegram API.' },
      { status: 500 }
    )
  }
}
