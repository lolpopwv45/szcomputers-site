"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Cpu, HardDrive, MemoryStick, Monitor, Box, Zap, ShoppingCart } from "lucide-react"
import { useCartStore } from "@/lib/cart-store"
import { useRouter } from "next/navigation"

type Component = {
  id: string
  name: string
  price: number
  performance?: number
}

type ComponentCategory = {
  id: string
  name: string
  icon: any
  options: Component[]
}

export default function Configurator() {
  const categories: ComponentCategory[] = [
    {
      id: "cpu",
      name: "Процессор",
      icon: Cpu,
      options: [
        { id: "cpu1", name: "Intel Core i5-13400F", price: 15000, performance: 70 },
        { id: "cpu2", name: "AMD Ryzen 5 7600X", price: 18000, performance: 75 },
        { id: "cpu3", name: "AMD Ryzen 7 7800X3D", price: 35000, performance: 95 },
        { id: "cpu4", name: "Intel Core i9-14900K", price: 50000, performance: 100 },
      ],
    },
    {
      id: "gpu",
      name: "Видеокарта",
      icon: Monitor,
      options: [
        { id: "gpu1", name: "RTX 4060", price: 30000, performance: 65 },
        { id: "gpu2", name: "RTX 4070", price: 50000, performance: 80 },
        { id: "gpu3", name: "RTX 4070 Ti", price: 70000, performance: 90 },
        { id: "gpu4", name: "RTX 4090", price: 150000, performance: 100 },
      ],
    },
    {
      id: "ram",
      name: "Оперативная память",
      icon: MemoryStick,
      options: [
        { id: "ram1", name: "16GB DDR4 3200MHz", price: 5000 },
        { id: "ram2", name: "32GB DDR4 3600MHz", price: 9000 },
        { id: "ram3", name: "32GB DDR5 5600MHz", price: 12000 },
        { id: "ram4", name: "64GB DDR5 6000MHz", price: 20000 },
      ],
    },
    {
      id: "storage",
      name: "Накопитель",
      icon: HardDrive,
      options: [
        { id: "ssd1", name: "512GB NVMe SSD", price: 4000 },
        { id: "ssd2", name: "1TB NVMe SSD", price: 7000 },
        { id: "ssd3", name: "2TB NVMe SSD", price: 12000 },
        { id: "ssd4", name: "4TB NVMe SSD", price: 25000 },
      ],
    },
    {
      id: "case",
      name: "Корпус",
      icon: Box,
      options: [
        { id: "case1", name: "Корпус Standard RGB", price: 5000 },
        { id: "case2", name: "Корпус Premium RGB", price: 8000 },
        { id: "case3", name: "Корпус Elite RGB", price: 12000 },
        { id: "case4", name: "Корпус Ultimate RGB", price: 18000 },
      ],
    },
  ]

  const [selectedComponents, setSelectedComponents] = useState<Record<string, Component>>({})
  const { addItem } = useCartStore()
  const router = useRouter()

  const handleSelectComponent = (categoryId: string, component: Component) => {
    setSelectedComponents((prev) => ({
      ...prev,
      [categoryId]: component,
    }))
  }

  const calculateTotal = () => {
    return Object.values(selectedComponents).reduce((sum, component) => sum + component.price, 0)
  }

  const calculateFPS = () => {
    const cpu = selectedComponents.cpu
    const gpu = selectedComponents.gpu

    if (!cpu || !gpu) return null

    const avgPerformance = ((cpu.performance || 0) + (gpu.performance || 0)) / 2

    if (avgPerformance >= 90) return "144+ FPS"
    if (avgPerformance >= 75) return "120-144 FPS"
    if (avgPerformance >= 60) return "90-120 FPS"
    return "60-90 FPS"
  }

  const isComplete = categories.every((cat) => selectedComponents[cat.id])

  const handleOrder = () => {
    if (!isComplete) return

    const componentsList = Object.entries(selectedComponents)
      .map(([category, component]) => {
        const cat = categories.find((c) => c.id === category)
        return `${cat?.name}: ${component.name}`
      })
      .join(", ")

    addItem({
      id: `custom-pc-${Date.now()}`,
      name: "Собранный ПК",
      price: calculateTotal(),
      type: "pc",
      specs: {
        components: componentsList,
        fps: calculateFPS() || "N/A",
      },
    })

    router.push("/cart")
  }

  return (
    <div className="container px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-balance">Конфигуратор ПК</h1>
        <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
          Соберите идеальный компьютер под ваши задачи и бюджет
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {categories.map((category) => {
            const Icon = category.icon
            const selected = selectedComponents[category.id]

            return (
              <Card key={category.id} className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold">{category.name}</h2>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {category.options.map((option) => {
                    const isSelected = selected?.id === option.id

                    return (
                      <button
                        key={option.id}
                        onClick={() => handleSelectComponent(category.id, option)}
                        className={`p-4 rounded-lg border-2 text-left transition-all ${
                          isSelected ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 bg-card"
                        }`}
                      >
                        <div className="font-semibold mb-2">{option.name}</div>
                        <div className="text-lg font-bold text-primary">{option.price.toLocaleString("ru-RU")} ₽</div>
                        {option.performance && (
                          <div className="mt-2 flex items-center gap-2">
                            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-primary to-purple-500"
                                style={{ width: `${option.performance}%` }}
                              />
                            </div>
                            <span className="text-xs text-muted-foreground">{option.performance}%</span>
                          </div>
                        )}
                      </button>
                    )
                  })}
                </div>
              </Card>
            )
          })}
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-20 space-y-6">
            <Card className="p-6 border-primary/50">
              <h3 className="text-xl font-bold mb-6">Ваша конфигурация</h3>

              <div className="space-y-4 mb-6">
                {categories.map((category) => {
                  const selected = selectedComponents[category.id]
                  const Icon = category.icon

                  return (
                    <div key={category.id} className="flex items-start gap-3">
                      <Icon className="w-5 h-5 text-muted-foreground mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-muted-foreground">{category.name}</div>
                        {selected ? (
                          <>
                            <div className="font-medium truncate">{selected.name}</div>
                            <div className="text-sm text-primary">{selected.price.toLocaleString("ru-RU")} ₽</div>
                          </>
                        ) : (
                          <div className="text-sm text-muted-foreground">Не выбрано</div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>

              {calculateFPS() && (
                <div className="mb-6 p-4 rounded-lg bg-primary/10 border border-primary/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-5 h-5 text-primary" />
                    <span className="font-semibold">Производительность</span>
                  </div>
                  <div className="text-2xl font-bold text-primary">{calculateFPS()}</div>
                  <div className="text-sm text-muted-foreground mt-1">В современных играх</div>
                </div>
              )}

              <div className="pt-6 border-t border-border">
                <div className="flex items-baseline justify-between mb-6">
                  <span className="text-lg font-semibold">Итого:</span>
                  <span className="text-3xl font-bold text-primary">{calculateTotal().toLocaleString("ru-RU")} ₽</span>
                </div>

                <Button className="w-full" size="lg" disabled={!isComplete} onClick={handleOrder}>
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {isComplete ? "Добавить в корзину" : "Выберите все компоненты"}
                </Button>

                {isComplete && (
                  <p className="text-xs text-muted-foreground text-center mt-4">
                    Бесплатная сборка и тестирование включены
                  </p>
                )}
              </div>
            </Card>

            <Card className="p-6 bg-muted/30">
              <h4 className="font-semibold mb-3">Что входит в стоимость:</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>✓ Профессиональная сборка</li>
                <li>✓ Тестирование 24 часа</li>
                <li>✓ Установка Windows</li>
                <li>✓ Гарантия 2 года</li>
                <li>✓ Техподдержка 24/7</li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
