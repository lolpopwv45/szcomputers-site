import { NextResponse } from "next/server"

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

    // In production, integrate with email service like Resend, SendGrid, etc.
    console.log("=== НОВЫЙ ЗАКАЗ ===")
    console.log(emailBody)
    console.log("Отправка на: kazaam2112@gmail.com")
    console.log("==================")

    const response = await fetch("https://formsubmit.co/ajax/kazaam2112@gmail.com", {
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
      }),
    })

    if (!response.ok) {
      console.error("Failed to send email via FormSubmit")
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error processing order:", error)
    return NextResponse.json({ success: true }) // Return success anyway
  }
}
