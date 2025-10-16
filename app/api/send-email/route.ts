import { NextResponse } from "next/server"
import { Resend } from "resend"

export async function POST(request: Request) {
  try {
    const orderData = await request.json()

    const itemsList = orderData.items
      .map((item: any) => `${item.name} x ${item.quantity} - ${(item.price * item.quantity).toLocaleString("ru-RU")} ₽`)
      .join("\n")

    const emailBody = `
Новый заказ на сайте SZ Computers!

КОНТАКТНЫЕ ДАННЫЕ:
Имя: ${orderData.customerName}
Телефон: ${orderData.customerPhone}
Email: ${orderData.customerEmail || "Не указан"}

ЗАКАЗ:
${itemsList}

ИТОГО: ${orderData.totalPrice.toLocaleString("ru-RU")} ₽

ДОСТАВКА: ${orderData.delivery === "delivery" ? "Доставка по России" : "Самовывоз из Челябинска"}
${orderData.address ? `Адрес: ${orderData.address}` : ""}

СПОСОБ ОПЛАТЫ: ${
      orderData.payment === "card"
        ? "Картой онлайн"
        : orderData.payment === "cash"
          ? "Наличными при получении"
          : orderData.payment === "transfer"
            ? "Переводом на карту"
            : "Через Авито"
    }
    `

    // Try Resend first if API key present; otherwise fallback to FormSubmit
    const toEmail = process.env.ORDER_RECEIVER_EMAIL || "kazaam2112@gmail.com"
    const resendApiKey = process.env.RESEND_API_KEY

    if (resendApiKey) {
      const resend = new Resend(resendApiKey)
      const { data, error } = await resend.emails.send({
        from: process.env.ORDER_SENDER_EMAIL || "onboarding@resend.dev",
        to: [toEmail],
        subject: `Новый заказ от ${orderData.customerName}`,
        text: emailBody,
        reply_to: orderData.customerEmail ? [orderData.customerEmail] : undefined,
      })

      if (error) {
        console.error("Resend send error:", error)
        // continue to fallback
      } else {
        return NextResponse.json({ success: true, provider: "resend", id: data?.id })
      }
    }

    const response = await fetch(`https://formsubmit.co/ajax/${toEmail}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: orderData.customerName,
        phone: orderData.customerPhone,
        email: orderData.customerEmail,
        message: emailBody,
        _subject: `Новый заказ от ${orderData.customerName}`,
        _template: "box",
        _captcha: "false",
      }),
    })

    if (!response.ok) {
      const text = await response.text().catch(() => "")
      console.error("Failed to send email via FormSubmit", text)
      return NextResponse.json({ success: false, error: "FormSubmit error" }, { status: 500 })
    }

    return NextResponse.json({ success: true, provider: "formsubmit" })
  } catch (error) {
    console.error("Error processing order:", error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
