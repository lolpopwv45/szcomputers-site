"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Monitor, Mouse, Headphones, Keyboard, Wifi, ShoppingCart, Filter } from "lucide-react"
import { useCartStore } from "@/lib/cart-store"

type Peripheral = {
  id: string
  name: string
  price: number
  category: "monitor" | "mouse" | "headphones" | "mousepad" | "keyboard" | "wifi"
  specs: string[]
  image?: string
}

const categoryIcons = {
  monitor: Monitor,
  mouse: Mouse,
  headphones: Headphones,
  mousepad: ShoppingCart,
  keyboard: Keyboard,
  wifi: Wifi,
}

export default function PeripheralsCatalog() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const addItem = useCartStore((state) => state.addItem)

  const peripherals: Peripheral[] = [
    {
      id: "mon-1",
      name: 'AOC 24G2 24" 144Hz',
      price: 18000,
      category: "monitor",
      specs: ['24" IPS', "1920x1080", "144Hz", "1ms"],
    },
    {
      id: "mon-2",
      name: 'Samsung Odyssey G5 27" 165Hz',
      price: 28000,
      category: "monitor",
      specs: ['27" VA', "2560x1440", "165Hz", "1ms"],
    },
    {
      id: "mon-3",
      name: 'LG UltraGear 27" 240Hz',
      price: 45000,
      category: "monitor",
      specs: ['27" IPS', "2560x1440", "240Hz", "1ms", "G-Sync"],
    },
    {
      id: "mouse-1",
      name: "Logitech G102",
      price: 2500,
      category: "mouse",
      specs: ["8000 DPI", "RGB подсветка", "6 кнопок"],
    },
    {
      id: "mouse-2",
      name: "Razer DeathAdder V3",
      price: 7500,
      category: "mouse",
      specs: ["30000 DPI", "Беспроводная", "8 кнопок"],
    },
    {
      id: "mouse-3",
      name: "Logitech G Pro X Superlight",
      price: 12000,
      category: "mouse",
      specs: ["25600 DPI", "63г", "Беспроводная", "Hero сенсор"],
    },
    {
      id: "head-1",
      name: "HyperX Cloud II",
      price: 8500,
      category: "headphones",
      specs: ["7.1 Surround", "USB звуковая карта", "Микрофон"],
    },
    {
      id: "head-2",
      name: "SteelSeries Arctis 7",
      price: 15000,
      category: "headphones",
      specs: ["Беспроводные", "DTS Headphone:X", "24 часа работы"],
    },
    {
      id: "kb-1",
      name: "HyperX Alloy FPS Pro",
      price: 7000,
      category: "keyboard",
      specs: ["Cherry MX Red", "TKL", "RGB подсветка"],
    },
    {
      id: "kb-2",
      name: "Razer BlackWidow V3",
      price: 12000,
      category: "keyboard",
      specs: ["Razer Green", "Full-size", "RGB Chroma"],
    },
    {
      id: "kb-3",
      name: "Logitech G Pro X",
      price: 14000,
      category: "keyboard",
      specs: ["GX Blue", "TKL", "Сменные свитчи", "RGB"],
    },
    {
      id: "pad-1",
      name: "SteelSeries QcK Large",
      price: 1500,
      category: "mousepad",
      specs: ["450x400mm", "Тканевая поверхность"],
    },
    {
      id: "pad-2",
      name: "Razer Goliathus Extended Chroma",
      price: 4500,
      category: "mousepad",
      specs: ["920x294mm", "RGB подсветка", "Micro-textured"],
    },
    {
      id: "wifi-1",
      name: "TP-Link Archer T4U",
      price: 1800,
      category: "wifi",
      specs: ["AC1300", "Dual Band", "USB 3.0"],
    },
    {
      id: "wifi-2",
      name: "ASUS PCE-AX58BT",
      price: 4500,
      category: "wifi",
      specs: ["Wi-Fi 6", "AX3000", "Bluetooth 5.2", "PCIe"],
    },
  ]

  const categories = [
    { id: "all", name: "Все", icon: Filter },
    { id: "monitor", name: "Мониторы", icon: Monitor },
    { id: "keyboard", name: "Клавиатуры", icon: Keyboard },
    { id: "mouse", name: "Мыши", icon: Mouse },
    { id: "headphones", name: "Наушники", icon: Headphones },
    { id: "mousepad", name: "Коврики", icon: ShoppingCart },
    { id: "wifi", name: "Wi-Fi адаптеры", icon: Wifi },
  ]

  const filteredPeripherals =
    selectedCategory === "all" ? peripherals : peripherals.filter((p) => p.category === selectedCategory)

  const handleAddToCart = (peripheral: Peripheral) => {
    addItem({
      id: peripheral.id,
      name: peripheral.name,
      price: peripheral.price,
      type: "peripheral",
      image: peripheral.image,
    })
  }

  return (
    <div className="container px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-balance">Периферия и аксессуары</h1>
        <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
          Мониторы, клавиатуры, мыши, наушники и другие аксессуары для вашего игрового ПК
        </p>
      </div>

      <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-2">
        {categories.map((cat) => {
          const Icon = cat.icon
          return (
            <Button
              key={cat.id}
              variant={selectedCategory === cat.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(cat.id)}
              className="whitespace-nowrap"
            >
              <Icon className="w-4 h-4 mr-2" />
              {cat.name}
            </Button>
          )
        })}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredPeripherals.map((peripheral) => {
          const Icon = categoryIcons[peripheral.category]
          return (
            <Card
              key={peripheral.id}
              className="group overflow-hidden hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300"
            >
              <div className="h-40 relative overflow-hidden bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center">
                <Icon className="w-20 h-20 text-primary/40" />
              </div>

              <div className="p-5 space-y-4">
                <div>
                  <h3 className="text-lg font-bold mb-2 text-balance">{peripheral.name}</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-primary">
                      {peripheral.price.toLocaleString("ru-RU")} ₽
                    </span>
                  </div>
                </div>

                <div className="space-y-1 text-sm">
                  {peripheral.specs.map((spec, idx) => (
                    <div key={idx} className="text-muted-foreground">
                      • {spec}
                    </div>
                  ))}
                </div>

                <Button className="w-full group/btn" onClick={() => handleAddToCart(peripheral)}>
                  <ShoppingCart className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform" />В корзину
                </Button>
              </div>
            </Card>
          )
        })}
      </div>

      {filteredPeripherals.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Товары не найдены</p>
        </div>
      )}
    </div>
  )
}
