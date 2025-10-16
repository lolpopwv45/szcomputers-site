"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCartStore } from "@/lib/cart-store"
import { useRouter } from "next/navigation"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CheckCircle } from "lucide-react"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getTotalPrice, clearCart } = useCartStore()
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    delivery: "delivery",
    payment: "card",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Prepare order details
      const orderDetails = `
НОВЫЙ ЗАКАЗ НА САЙТЕ SZ COMPUTERS!

КОНТАКТНЫЕ ДАННЫЕ:
Имя: ${formData.name}
Телефон: ${formData.phone}
Email: ${formData.email || "Не указан"}

ЗАКАЗ:
${items.map((item) => `${item.name} x ${item.quantity} - ${(item.price * item.quantity).toLocaleString("ru-RU")} ₽`).join("\n")}

ИТОГО: ${getTotalPrice().toLocaleString("ru-RU")} ₽

ДОСТАВКА: ${formData.delivery === "delivery" ? `Доставка по адресу: ${formData.address}` : "Самовывоз из Челябинска"}

СПОСОБ ОПЛАТЫ: ${
        formData.payment === "card"
          ? "Картой онлайн"
          : formData.payment === "cash"
            ? "Наличными при получении"
            : formData.payment === "transfer"
              ? "Переводом на карту"
              : "Через Авито"
      }
      `

      // Create a hidden form and submit it
      const form = document.createElement("form")
      form.method = "POST"
      form.action = "https://formsubmit.co/kazaam2112@gmail.com"
      form.target = "_blank"

      // Add form fields
      const fields = {
        name: formData.name,
        email: formData.email || "noreply@szcomputers.ru",
        phone: formData.phone,
        message: orderDetails,
        _subject: `Новый заказ от ${formData.name}`,
        _captcha: "false",
        _template: "table",
      }

      Object.entries(fields).forEach(([key, value]) => {
        const input = document.createElement("input")
        input.type = "hidden"
        input.name = key
        input.value = value
        form.appendChild(input)
      })

      document.body.appendChild(form)
      form.submit()
      document.body.removeChild(form)

      // Show success message
      setOrderSuccess(true)
      clearCart()

      setTimeout(() => {
        router.push("/")
      }, 5000)
    } catch (error) {
      console.error("Error submitting order:", error)
      alert("Произошла ошибка при оформлении заказа. Пожалуйста, позвоните нам: 8 992 504-72-98")
      setIsSubmitting(false)
    }
  }

  if (items.length === 0 && !orderSuccess) {
    router.push("/cart")
    return null
  }

  if (orderSuccess) {
    return (
      <div className="container px-4 py-12">
        <Card className="max-w-2xl mx-auto p-8 text-center">
          <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Заказ успешно оформлен!</h1>
          <p className="text-lg text-muted-foreground mb-6">
            Спасибо за ваш заказ! Информация отправлена нашему менеджеру. Мы свяжемся с вами в ближайшее время для
            подтверждения деталей.
          </p>
          <div className="bg-muted/50 rounded-lg p-6 mb-6">
            <p className="font-semibold mb-2">Ожидайте звонка менеджера</p>
            <p className="text-sm text-muted-foreground">
              Если у вас есть срочные вопросы, звоните: <br />
              <span className="font-semibold text-foreground">8 992 504-72-98</span>
            </p>
            <p className="text-xs text-muted-foreground mt-3">Также вы можете написать нам в Telegram или ВКонтакте</p>
          </div>
          <Button onClick={() => router.push("/")} size="lg">
            Вернуться на главную
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="container px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Оформление заказа</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6">Контактные данные</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Имя и фамилия *</Label>
                  <Input
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Телефон *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    placeholder="8 992 504-72-98"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6">Доставка</h2>
              <RadioGroup
                value={formData.delivery}
                onValueChange={(value) => setFormData({ ...formData, delivery: value })}
              >
                <div className="flex items-center space-x-2 p-4 border rounded-lg">
                  <RadioGroupItem value="delivery" id="delivery" />
                  <Label htmlFor="delivery" className="flex-1 cursor-pointer">
                    <div className="font-medium">Доставка по России</div>
                    <div className="text-sm text-muted-foreground">Бесплатная доставка</div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-4 border rounded-lg">
                  <RadioGroupItem value="pickup" id="pickup" />
                  <Label htmlFor="pickup" className="flex-1 cursor-pointer">
                    <div className="font-medium">Самовывоз из Челябинска</div>
                    <div className="text-sm text-muted-foreground">ул. Орджоникидзе, 43</div>
                  </Label>
                </div>
              </RadioGroup>

              {formData.delivery === "delivery" && (
                <div className="mt-4">
                  <Label htmlFor="address">Адрес доставки *</Label>
                  <Input
                    id="address"
                    required
                    placeholder="Город, улица, дом, квартира"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                </div>
              )}
            </Card>

            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6">Способ оплаты</h2>
              <RadioGroup
                value={formData.payment}
                onValueChange={(value) => setFormData({ ...formData, payment: value })}
              >
                <div className="flex items-center space-x-2 p-4 border rounded-lg">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="flex-1 cursor-pointer">
                    Картой онлайн
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-4 border rounded-lg">
                  <RadioGroupItem value="cash" id="cash" />
                  <Label htmlFor="cash" className="flex-1 cursor-pointer">
                    Наличными при получении
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-4 border rounded-lg">
                  <RadioGroupItem value="transfer" id="transfer" />
                  <Label htmlFor="transfer" className="flex-1 cursor-pointer">
                    Переводом на карту
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-4 border rounded-lg">
                  <RadioGroupItem value="avito" id="avito" />
                  <Label htmlFor="avito" className="flex-1 cursor-pointer">
                    Через Авито
                  </Label>
                </div>
              </RadioGroup>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <h2 className="text-2xl font-bold mb-6">Ваш заказ</h2>

              <div className="space-y-3 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {item.name} × {item.quantity}
                    </span>
                    <span className="font-medium">{(item.price * item.quantity).toLocaleString("ru-RU")} ₽</span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between text-2xl font-bold">
                  <span>Итого</span>
                  <span className="text-primary">{getTotalPrice().toLocaleString("ru-RU")} ₽</span>
                </div>
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                {isSubmitting ? "Оформление..." : "Оформить заказ"}
              </Button>

              <p className="text-xs text-muted-foreground mt-4 text-center">
                Нажимая кнопку, вы соглашаетесь с условиями обработки персональных данных
              </p>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}
