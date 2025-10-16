"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Monitor, Mouse, Headphones, Keyboard, Wifi, ShoppingCart, Check, Cpu } from "lucide-react"
import { useCartStore } from "@/lib/cart-store"
import { useRouter } from "next/navigation"

type SetupItem = {
  id: string
  name: string
  price: number
  category: string
}

export default function CompleteSetupBuilder() {
  const router = useRouter()
  const addItem = useCartStore((state) => state.addItem)

  const [selectedPC, setSelectedPC] = useState<SetupItem | null>(null)
  const [selectedMonitor, setSelectedMonitor] = useState<SetupItem | null>(null)
  const [selectedKeyboard, setSelectedKeyboard] = useState<SetupItem | null>(null)
  const [selectedMouse, setSelectedMouse] = useState<SetupItem | null>(null)
  const [selectedHeadphones, setSelectedHeadphones] = useState<SetupItem | null>(null)
  const [selectedMousepad, setSelectedMousepad] = useState<SetupItem | null>(null)
  const [selectedWifi, setSelectedWifi] = useState<SetupItem | null>(null)

  const pcs: SetupItem[] = [
    { id: "pc-1", name: "Starter Gaming", price: 65000, category: "pc" },
    { id: "pc-2", name: "Gaming Plus", price: 85000, category: "pc" },
    { id: "pc-3", name: "Pro Gaming", price: 120000, category: "pc" },
    { id: "pc-4", name: "Ultra Gaming", price: 200000, category: "pc" },
  ]

  const monitors: SetupItem[] = [
    { id: "mon-1", name: 'AOC 24G2 24" 144Hz', price: 18000, category: "monitor" },
    { id: "mon-2", name: 'Samsung Odyssey G5 27"', price: 28000, category: "monitor" },
    { id: "mon-3", name: 'LG UltraGear 27" 240Hz', price: 45000, category: "monitor" },
  ]

  const keyboards: SetupItem[] = [
    { id: "kb-1", name: "HyperX Alloy FPS Pro", price: 7000, category: "keyboard" },
    { id: "kb-2", name: "Razer BlackWidow V3", price: 12000, category: "keyboard" },
  ]

  const mice: SetupItem[] = [
    { id: "mouse-1", name: "Logitech G102", price: 2500, category: "mouse" },
    { id: "mouse-2", name: "Razer DeathAdder V3", price: 7500, category: "mouse" },
  ]

  const headphones: SetupItem[] = [
    { id: "head-1", name: "HyperX Cloud II", price: 8500, category: "headphones" },
    { id: "head-2", name: "SteelSeries Arctis 7", price: 15000, category: "headphones" },
  ]

  const mousepads: SetupItem[] = [
    { id: "pad-1", name: "SteelSeries QcK Large", price: 1500, category: "mousepad" },
    { id: "pad-2", name: "Razer Goliathus Extended", price: 4500, category: "mousepad" },
  ]

  const wifiAdapters: SetupItem[] = [
    { id: "wifi-1", name: "TP-Link Archer T4U", price: 1800, category: "wifi" },
    { id: "wifi-2", name: "ASUS PCE-AX58BT", price: 4500, category: "wifi" },
  ]

  const getTotalPrice = () => {
    let total = 0
    if (selectedPC) total += selectedPC.price
    if (selectedMonitor) total += selectedMonitor.price
    if (selectedKeyboard) total += selectedKeyboard.price
    if (selectedMouse) total += selectedMouse.price
    if (selectedHeadphones) total += selectedHeadphones.price
    if (selectedMousepad) total += selectedMousepad.price
    if (selectedWifi) total += selectedWifi.price
    return total
  }

  const handleAddToCart = () => {
    const items = [
      selectedPC,
      selectedMonitor,
      selectedKeyboard,
      selectedMouse,
      selectedHeadphones,
      selectedMousepad,
      selectedWifi,
    ].filter(Boolean) as SetupItem[]

    items.forEach((item) => {
      addItem({
        id: item.id,
        name: item.name,
        price: item.price,
        type: "peripheral",
      })
    })

    router.push("/cart")
  }

  const SelectionCard = ({
    title,
    icon: Icon,
    items,
    selected,
    onSelect,
  }: {
    title: string
    icon: any
    items: SetupItem[]
    selected: SetupItem | null
    onSelect: (item: SetupItem) => void
  }) => (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-4">
        <Icon className="w-6 h-6 text-primary" />
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
      <div className="space-y-2">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item)}
            className={`w-full text-left p-3 rounded-lg border transition-all ${
              selected?.id === item.id ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">{item.name}</div>
                <div className="text-sm text-muted-foreground">{item.price.toLocaleString("ru-RU")} ₽</div>
              </div>
              {selected?.id === item.id && <Check className="w-5 h-5 text-primary" />}
            </div>
          </button>
        ))}
      </div>
    </Card>
  )

  return (
    <div className="container px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-balance">Собрать полный комплект</h1>
        <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
          Выберите компьютер и всю необходимую периферию для полноценного игрового сетапа
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <SelectionCard title="Компьютер" icon={Cpu} items={pcs} selected={selectedPC} onSelect={setSelectedPC} />
        <SelectionCard
          title="Монитор"
          icon={Monitor}
          items={monitors}
          selected={selectedMonitor}
          onSelect={setSelectedMonitor}
        />
        <SelectionCard
          title="Клавиатура"
          icon={Keyboard}
          items={keyboards}
          selected={selectedKeyboard}
          onSelect={setSelectedKeyboard}
        />
        <SelectionCard title="Мышь" icon={Mouse} items={mice} selected={selectedMouse} onSelect={setSelectedMouse} />
        <SelectionCard
          title="Наушники"
          icon={Headphones}
          items={headphones}
          selected={selectedHeadphones}
          onSelect={setSelectedHeadphones}
        />
        <SelectionCard
          title="Коврик"
          icon={ShoppingCart}
          items={mousepads}
          selected={selectedMousepad}
          onSelect={setSelectedMousepad}
        />
        <SelectionCard
          title="Wi-Fi адаптер"
          icon={Wifi}
          items={wifiAdapters}
          selected={selectedWifi}
          onSelect={setSelectedWifi}
        />
      </div>

      <Card className="p-6 sticky bottom-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-sm text-muted-foreground mb-1">Итоговая стоимость комплекта</div>
            <div className="text-3xl font-bold text-primary">{getTotalPrice().toLocaleString("ru-RU")} ₽</div>
          </div>
          <Button size="lg" onClick={handleAddToCart} disabled={!selectedPC}>
            <ShoppingCart className="w-5 h-5 mr-2" />
            Добавить в корзину
          </Button>
        </div>
      </Card>
    </div>
  )
}
