"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useCartStore } from "@/lib/cart-store"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function CartPage() {
  const router = useRouter()
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCartStore()

  const handleCheckout = () => {
    router.push("/checkout")
  }

  if (items.length === 0) {
    return (
      <div className="container px-4 py-12">
        <div className="max-w-2xl mx-auto text-center py-12">
          <ShoppingBag className="w-24 h-24 mx-auto mb-6 text-muted-foreground" />
          <h1 className="text-3xl font-bold mb-4">Корзина пуста</h1>
          <p className="text-muted-foreground mb-8">Добавьте товары в корзину, чтобы оформить заказ</p>
          <div className="flex gap-4 justify-center">
            <Button asChild>
              <Link href="/catalog">Готовые ПК</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/peripherals">Периферия</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Корзина</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <Card key={item.id} className="p-6">
              <div className="flex gap-6">
                <div className="w-24 h-24 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                  <ShoppingBag className="w-12 h-12 text-muted-foreground" />
                </div>

                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-2">{item.name}</h3>
                  <div className="text-xl font-bold text-primary mb-4">{item.price.toLocaleString("ru-RU")} ₽</div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Button size="icon" variant="outline" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="w-12 text-center font-medium">{item.quantity}</span>
                      <Button size="icon" variant="outline" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>

                    <Button size="icon" variant="ghost" onClick={() => removeItem(item.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xl font-bold">{(item.price * item.quantity).toLocaleString("ru-RU")} ₽</div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="lg:col-span-1">
          <Card className="p-6 sticky top-24">
            <h2 className="text-2xl font-bold mb-6">Итого</h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-muted-foreground">
                <span>Товары ({items.reduce((sum, item) => sum + item.quantity, 0)} шт.)</span>
                <span>{getTotalPrice().toLocaleString("ru-RU")} ₽</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Доставка</span>
                <span>Бесплатно</span>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between text-2xl font-bold">
                  <span>Итого</span>
                  <span className="text-primary">{getTotalPrice().toLocaleString("ru-RU")} ₽</span>
                </div>
              </div>
            </div>

            <Button className="w-full mb-3" size="lg" onClick={handleCheckout}>
              Оформить заказ
            </Button>
            <Button variant="outline" className="w-full bg-transparent" onClick={clearCart}>
              Очистить корзину
            </Button>
          </Card>
        </div>
      </div>
    </div>
  )
}
