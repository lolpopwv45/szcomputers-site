"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Cpu, HardDrive, Zap, ShoppingCart, Filter } from "lucide-react"
import { useCartStore } from "@/lib/cart-store"

type PCBuild = {
  id: string
  name: string
  price: number
  fps: string
  category: "budget" | "mid" | "high" | "ultra"
  specs: {
    cpu: string
    gpu: string
    ram: string
    storage: string
    case: string
  }
  gradient: string
  image?: string
}

export default function CatalogGrid() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const addItem = useCartStore((state) => state.addItem)

  const builds: PCBuild[] = [
    {
      id: "1",
      name: "Starter Gaming",
      price: 65000,
      fps: "60-90 FPS",
      category: "budget",
      specs: {
        cpu: "Intel Core i5-13400F",
        gpu: "RTX 4060",
        ram: "16GB DDR4 3200MHz",
        storage: "512GB NVMe SSD",
        case: "Корпус Standard RGB",
      },
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      id: "2",
      name: "Gaming Plus",
      price: 85000,
      fps: "90-120 FPS",
      category: "budget",
      specs: {
        cpu: "AMD Ryzen 5 7600X",
        gpu: "RTX 4060 Ti",
        ram: "16GB DDR5 5600MHz",
        storage: "1TB NVMe SSD",
        case: "Корпус Premium RGB",
      },
      gradient: "from-cyan-500 to-blue-600",
    },
    {
      id: "3",
      name: "Pro Gaming",
      price: 120000,
      fps: "120-144 FPS",
      category: "mid",
      specs: {
        cpu: "AMD Ryzen 7 7800X3D",
        gpu: "RTX 4070 Ti",
        ram: "32GB DDR5 5600MHz",
        storage: "1TB NVMe SSD",
        case: "Корпус Elite RGB",
      },
      gradient: "from-purple-500 to-pink-500",
    },
    {
      id: "4",
      name: "Pro Gaming Max",
      price: 145000,
      fps: "144 FPS",
      category: "mid",
      specs: {
        cpu: "Intel Core i7-14700K",
        gpu: "RTX 4070 Ti Super",
        ram: "32GB DDR5 6000MHz",
        storage: "2TB NVMe SSD",
        case: "Корпус Elite RGB",
      },
      gradient: "from-pink-500 to-purple-600",
    },
    {
      id: "5",
      name: "Ultra Gaming",
      price: 200000,
      fps: "144+ FPS",
      category: "high",
      specs: {
        cpu: "Intel Core i9-14900K",
        gpu: "RTX 4090",
        ram: "64GB DDR5 6000MHz",
        storage: "2TB NVMe SSD",
        case: "Корпус Ultimate RGB",
      },
      gradient: "from-orange-500 to-red-500",
    },
    {
      id: "6",
      name: "Extreme Gaming",
      price: 250000,
      fps: "240+ FPS",
      category: "ultra",
      specs: {
        cpu: "Intel Core i9-14900KS",
        gpu: "RTX 4090",
        ram: "64GB DDR5 7200MHz",
        storage: "4TB NVMe SSD",
        case: "Корпус Ultimate RGB",
      },
      gradient: "from-red-500 to-orange-600",
    },
    {
      id: "7",
      name: "Workstation Pro",
      price: 180000,
      fps: "Для работы",
      category: "high",
      specs: {
        cpu: "AMD Ryzen 9 7950X",
        gpu: "RTX 4080",
        ram: "64GB DDR5 5600MHz",
        storage: "2TB NVMe SSD",
        case: "Корпус Premium RGB",
      },
      gradient: "from-green-500 to-emerald-500",
    },
    {
      id: "8",
      name: "Streamer Setup",
      price: 160000,
      fps: "Стриминг",
      category: "high",
      specs: {
        cpu: "AMD Ryzen 9 7900X",
        gpu: "RTX 4070 Ti",
        ram: "32GB DDR5 6000MHz",
        storage: "2TB NVMe SSD",
        case: "Корпус Elite RGB",
      },
      gradient: "from-violet-500 to-purple-500",
    },
  ]

  const categories = [
    { id: "all", name: "Все сборки" },
    { id: "budget", name: "Бюджетные" },
    { id: "mid", name: "Средний класс" },
    { id: "high", name: "Высокий класс" },
    { id: "ultra", name: "Экстремальные" },
  ]

  const filteredBuilds = selectedCategory === "all" ? builds : builds.filter((b) => b.category === selectedCategory)

  const handleAddToCart = (build: PCBuild) => {
    addItem({
      id: build.id,
      name: build.name,
      price: build.price,
      type: "pc",
      specs: build.specs,
    })
  }

  return (
    <div className="container px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-balance">Каталог готовых сборок</h1>
        <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
          Профессионально собранные и протестированные игровые компьютеры
        </p>
      </div>

      <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-2">
        <Filter className="w-5 h-5 text-muted-foreground flex-shrink-0" />
        {categories.map((cat) => (
          <Button
            key={cat.id}
            variant={selectedCategory === cat.id ? "default" : "outline"}
            onClick={() => setSelectedCategory(cat.id)}
            className="whitespace-nowrap"
          >
            {cat.name}
          </Button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredBuilds.map((build) => (
          <Card
            key={build.id}
            className="group overflow-hidden hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300"
          >
            <div className="h-40 relative overflow-hidden bg-muted">
              <img
                src={`/high-end-gaming-pc.png?key=ehgda&height=200&width=300&query=gaming pc ${build.name.toLowerCase()}`}
                alt={build.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            </div>

            <div className="p-5 space-y-4">
              <div>
                <h3 className="text-xl font-bold mb-2">{build.name}</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-primary">{build.price.toLocaleString("ru-RU")} ₽</span>
                </div>
                <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  <Zap className="w-4 h-4" />
                  {build.fps}
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground truncate">{build.specs.cpu}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground truncate">{build.specs.gpu}</span>
                </div>
                <div className="flex items-center gap-2">
                  <HardDrive className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground truncate">
                    {build.specs.ram} / {build.specs.storage}
                  </span>
                </div>
              </div>

              <Button className="w-full group/btn" onClick={() => handleAddToCart(build)}>
                <ShoppingCart className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform" />В корзину
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {filteredBuilds.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Сборки не найдены</p>
        </div>
      )}
    </div>
  )
}
