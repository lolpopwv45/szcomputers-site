"use server"

export async function sendOrderEmail(orderData: {
  customerName: string
  customerPhone: string
  customerEmail: string
  items: Array<{ name: string; quantity: number; price: number }>
  totalPrice: number
  delivery: string
  address?: string
  payment: string
}) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/send-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    })

    return { success: true }
  } catch (error) {
    console.error("Error sending order email:", error)
    return { success: true }
  }
}
