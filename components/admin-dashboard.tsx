"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Package,
  ShoppingCart,
  Shield,
  MessageSquare,
  TrendingUp,
  DollarSign,
  CheckCircle2,
  Clock,
  XCircle,
  Plus,
  Edit,
  Cpu,
  Monitor,
  MemoryStick,
  HardDrive,
  Box,
} from "lucide-react"

type Order = {
  id: string
  customer: string
  product: string
  price: number
  status: "pending" | "processing" | "completed" | "cancelled"
  date: string
}

type Product = {
  id: string
  name: string
  price: number
  stock: number
  sales: number
}

type Warranty = {
  id: string
  serialNumber: string
  product: string
  customer: string
  status: "active" | "expired"
  expiryDate: string
}

type Review = {
  id: string
  customer: string
  product: string
  rating: number
  text: string
  date: string
  approved: boolean
}

type ComponentType = "cpu" | "gpu" | "ram" | "storage" | "case"

type ConfiguratorComponent = {
  id: string
  type: ComponentType
  name: string
  price: number
  performance?: number
  stock: number
}

export default function AdminDashboard() {
  const [orders] = useState<Order[]>([
    {
      id: "ORD-001",
      customer: "Алексей М.",
      product: "Pro Gaming",
      price: 120000,
      status: "completed",
      date: "10.12.2024",
    },
    {
      id: "ORD-002",
      customer: "Дмитрий К.",
      product: "Ultra Gaming",
      price: 200000,
      status: "processing",
      date: "09.12.2024",
    },
    {
      id: "ORD-003",
      customer: "Михаил П.",
      product: "Starter Gaming",
      price: 65000,
      status: "pending",
      date: "08.12.2024",
    },
  ])

  const [products] = useState<Product[]>([
    { id: "1", name: "Starter Gaming", price: 65000, stock: 5, sales: 23 },
    { id: "2", name: "Pro Gaming", price: 120000, stock: 3, sales: 45 },
    { id: "3", name: "Ultra Gaming", price: 200000, stock: 2, sales: 12 },
  ])

  const [warranties] = useState<Warranty[]>([
    {
      id: "1",
      serialNumber: "SZ2024001",
      product: "Pro Gaming",
      customer: "Алексей М.",
      status: "active",
      expiryDate: "15.01.2026",
    },
    {
      id: "2",
      serialNumber: "SZ2024002",
      product: "Ultra Gaming",
      customer: "Дмитрий К.",
      status: "active",
      expiryDate: "20.02.2026",
    },
    {
      id: "3",
      serialNumber: "SZ2023001",
      product: "Starter Gaming",
      customer: "Иван С.",
      status: "expired",
      expiryDate: "10.10.2024",
    },
  ])

  const [reviews] = useState<Review[]>([
    {
      id: "1",
      customer: "Алексей М.",
      product: "Pro Gaming",
      rating: 5,
      text: "Отличная сборка! Все игры на ультра настройках летают.",
      date: "10.12.2024",
      approved: true,
    },
    {
      id: "2",
      customer: "Дмитрий К.",
      product: "Ultra Gaming",
      rating: 5,
      text: "Мощный зверь! Поддержка помогла настроить все программы.",
      date: "09.12.2024",
      approved: false,
    },
  ])

  const [components, setComponents] = useState<ConfiguratorComponent[]>([
    { id: "1", type: "cpu", name: "Intel Core i5-13400F", price: 15000, performance: 70, stock: 10 },
    { id: "2", type: "cpu", name: "AMD Ryzen 5 7600X", price: 18000, performance: 75, stock: 8 },
    { id: "3", type: "gpu", name: "RTX 4060", price: 30000, performance: 65, stock: 5 },
    { id: "4", type: "gpu", name: "RTX 4070", price: 50000, performance: 80, stock: 3 },
    { id: "5", type: "ram", name: "16GB DDR4 3200MHz", price: 5000, stock: 15 },
    { id: "6", type: "storage", name: "512GB NVMe SSD", price: 4000, stock: 20 },
    { id: "7", type: "case", name: "Корпус Standard RGB", price: 5000, stock: 12 },
  ])

  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false)
  const [isComponentDialogOpen, setIsComponentDialogOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [editingComponent, setEditingComponent] = useState<ConfiguratorComponent | null>(null)

  const [productForm, setProductForm] = useState({
    name: "",
    price: "",
    stock: "",
  })

  const [componentForm, setComponentForm] = useState({
    type: "cpu" as ComponentType,
    name: "",
    price: "",
    performance: "",
    stock: "",
  })

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product)
    setProductForm({
      name: product.name,
      price: product.price.toString(),
      stock: product.stock.toString(),
    })
    setIsProductDialogOpen(true)
  }

  const handleSaveProduct = () => {
    if (!productForm.name || !productForm.price || !productForm.stock) return

    if (editingProduct) {
      // Update existing product
      const updatedProducts = products.map((p) =>
        p.id === editingProduct.id
          ? {
              ...p,
              name: productForm.name,
              price: Number.parseInt(productForm.price),
              stock: Number.parseInt(productForm.stock),
            }
          : p,
      )
      // In real app: setProducts(updatedProducts)
      console.log("[v0] Updated product:", updatedProducts)
    } else {
      // Create new product
      const newProduct: Product = {
        id: (products.length + 1).toString(),
        name: productForm.name,
        price: Number.parseInt(productForm.price),
        stock: Number.parseInt(productForm.stock),
        sales: 0,
      }
      // In real app: setProducts([...products, newProduct])
      console.log("[v0] Created product:", newProduct)
    }

    setIsProductDialogOpen(false)
    setEditingProduct(null)
    setProductForm({ name: "", price: "", stock: "" })
  }

  const handleEditComponent = (component: ConfiguratorComponent) => {
    setEditingComponent(component)
    setComponentForm({
      type: component.type,
      name: component.name,
      price: component.price.toString(),
      performance: component.performance?.toString() || "",
      stock: component.stock.toString(),
    })
    setIsComponentDialogOpen(true)
  }

  const handleSaveComponent = () => {
    if (!componentForm.name || !componentForm.price || !componentForm.stock) return

    if (editingComponent) {
      // Update existing component
      const updatedComponents = components.map((c) =>
        c.id === editingComponent.id
          ? {
              ...c,
              type: componentForm.type,
              name: componentForm.name,
              price: Number.parseInt(componentForm.price),
              performance: componentForm.performance ? Number.parseInt(componentForm.performance) : undefined,
              stock: Number.parseInt(componentForm.stock),
            }
          : c,
      )
      setComponents(updatedComponents)
    } else {
      // Create new component
      const newComponent: ConfiguratorComponent = {
        id: (components.length + 1).toString(),
        type: componentForm.type,
        name: componentForm.name,
        price: Number.parseInt(componentForm.price),
        performance: componentForm.performance ? Number.parseInt(componentForm.performance) : undefined,
        stock: Number.parseInt(componentForm.stock),
      }
      setComponents([...components, newComponent])
    }

    setIsComponentDialogOpen(false)
    setEditingComponent(null)
    setComponentForm({ type: "cpu", name: "", price: "", performance: "", stock: "" })
  }

  const stats = {
    totalRevenue: orders.reduce((sum, order) => sum + order.price, 0),
    totalOrders: orders.length,
    activeWarranties: warranties.filter((w) => w.status === "active").length,
    pendingReviews: reviews.filter((r) => !r.approved).length,
  }

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "completed":
        return "text-green-500"
      case "processing":
        return "text-blue-500"
      case "pending":
        return "text-orange-500"
      case "cancelled":
        return "text-red-500"
      default:
        return "text-muted-foreground"
    }
  }

  const getStatusIcon = (status: Order["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-4 h-4" />
      case "processing":
        return <Clock className="w-4 h-4" />
      case "pending":
        return <Clock className="w-4 h-4" />
      case "cancelled":
        return <XCircle className="w-4 h-4" />
    }
  }

  const getStatusText = (status: Order["status"]) => {
    switch (status) {
      case "completed":
        return "Завершен"
      case "processing":
        return "В обработке"
      case "pending":
        return "Ожидает"
      case "cancelled":
        return "Отменен"
    }
  }

  const getComponentIcon = (type: ComponentType) => {
    switch (type) {
      case "cpu":
        return Cpu
      case "gpu":
        return Monitor
      case "ram":
        return MemoryStick
      case "storage":
        return HardDrive
      case "case":
        return Box
    }
  }

  const getComponentTypeLabel = (type: ComponentType) => {
    switch (type) {
      case "cpu":
        return "Процессор"
      case "gpu":
        return "Видеокарта"
      case "ram":
        return "Память"
      case "storage":
        return "Накопитель"
      case "case":
        return "Корпус"
    }
  }

  return (
    <div className="container px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-2">Панель управления</h1>
        <p className="text-muted-foreground">Управление заказами, товарами и гарантиями</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-primary" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <div className="text-2xl font-bold mb-1">{stats.totalRevenue.toLocaleString("ru-RU")} ₽</div>
          <div className="text-sm text-muted-foreground">Общая выручка</div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-primary" />
            </div>
          </div>
          <div className="text-2xl font-bold mb-1">{stats.totalOrders}</div>
          <div className="text-sm text-muted-foreground">Всего заказов</div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary" />
            </div>
          </div>
          <div className="text-2xl font-bold mb-1">{stats.activeWarranties}</div>
          <div className="text-sm text-muted-foreground">Активных гарантий</div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-primary" />
            </div>
          </div>
          <div className="text-2xl font-bold mb-1">{stats.pendingReviews}</div>
          <div className="text-sm text-muted-foreground">Ожидают модерации</div>
        </Card>
      </div>

      <Tabs defaultValue="orders" className="space-y-6">
        <TabsList>
          <TabsTrigger value="orders">
            <ShoppingCart className="w-4 h-4 mr-2" />
            Заказы
          </TabsTrigger>
          <TabsTrigger value="products">
            <Package className="w-4 h-4 mr-2" />
            Товары
          </TabsTrigger>
          <TabsTrigger value="components">
            <Cpu className="w-4 h-4 mr-2" />
            Комплектующие
          </TabsTrigger>
          <TabsTrigger value="warranties">
            <Shield className="w-4 h-4 mr-2" />
            Гарантии
          </TabsTrigger>
          <TabsTrigger value="reviews">
            <MessageSquare className="w-4 h-4 mr-2" />
            Отзывы
          </TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="space-y-4">
          <Card>
            <div className="p-6">
              <h2 className="text-xl font-bold mb-6">Последние заказы</h2>
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 rounded-lg border border-border">
                    <div className="flex items-center gap-4">
                      <div className={`flex items-center gap-2 ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                      </div>
                      <div>
                        <div className="font-semibold">{order.id}</div>
                        <div className="text-sm text-muted-foreground">
                          {order.customer} • {order.product}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">{order.price.toLocaleString("ru-RU")} ₽</div>
                      <div className={`text-sm ${getStatusColor(order.status)}`}>{getStatusText(order.status)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="space-y-4">
          <Card>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Управление товарами</h2>
                <Dialog open={isProductDialogOpen} onOpenChange={setIsProductDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      onClick={() => {
                        setEditingProduct(null)
                        setProductForm({ name: "", price: "", stock: "" })
                      }}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Добавить товар
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{editingProduct ? "Редактировать товар" : "Добавить товар"}</DialogTitle>
                      <DialogDescription>
                        {editingProduct ? "Измените данные готовой сборки" : "Создайте новую готовую сборку ПК"}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="product-name">Название</Label>
                        <Input
                          id="product-name"
                          placeholder="Pro Gaming"
                          value={productForm.name}
                          onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="product-price">Цена (₽)</Label>
                        <Input
                          id="product-price"
                          type="number"
                          placeholder="120000"
                          value={productForm.price}
                          onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="product-stock">Количество на складе</Label>
                        <Input
                          id="product-stock"
                          type="number"
                          placeholder="5"
                          value={productForm.stock}
                          onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-3">
                      <Button variant="outline" onClick={() => setIsProductDialogOpen(false)}>
                        Отмена
                      </Button>
                      <Button onClick={handleSaveProduct}>Сохранить</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="space-y-4">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between p-4 rounded-lg border border-border"
                  >
                    <div>
                      <div className="font-semibold mb-1">{product.name}</div>
                      <div className="text-sm text-muted-foreground">
                        Продано: {product.sales} • В наличии: {product.stock}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="font-bold">{product.price.toLocaleString("ru-RU")} ₽</div>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => handleEditProduct(product)}>
                        <Edit className="w-4 h-4 mr-2" />
                        Редактировать
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="components" className="space-y-4">
          <Card>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Управление комплектующими</h2>
                <Dialog open={isComponentDialogOpen} onOpenChange={setIsComponentDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      onClick={() => {
                        setEditingComponent(null)
                        setComponentForm({ type: "cpu", name: "", price: "", performance: "", stock: "" })
                      }}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Добавить комплектующее
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        {editingComponent ? "Редактировать комплектующее" : "Добавить комплектующее"}
                      </DialogTitle>
                      <DialogDescription>
                        {editingComponent
                          ? "Измените данные комплектующего для конфигуратора"
                          : "Создайте новое комплектующее для конфигуратора ПК"}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="component-type">Тип</Label>
                        <Select
                          value={componentForm.type}
                          onValueChange={(value: ComponentType) => setComponentForm({ ...componentForm, type: value })}
                        >
                          <SelectTrigger id="component-type">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="cpu">Процессор</SelectItem>
                            <SelectItem value="gpu">Видеокарта</SelectItem>
                            <SelectItem value="ram">Память</SelectItem>
                            <SelectItem value="storage">Накопитель</SelectItem>
                            <SelectItem value="case">Корпус</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="component-name">Название</Label>
                        <Input
                          id="component-name"
                          placeholder="Intel Core i5-13400F"
                          value={componentForm.name}
                          onChange={(e) => setComponentForm({ ...componentForm, name: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="component-price">Цена (₽)</Label>
                        <Input
                          id="component-price"
                          type="number"
                          placeholder="15000"
                          value={componentForm.price}
                          onChange={(e) => setComponentForm({ ...componentForm, price: e.target.value })}
                        />
                      </div>
                      {(componentForm.type === "cpu" || componentForm.type === "gpu") && (
                        <div className="space-y-2">
                          <Label htmlFor="component-performance">Производительность (0-100)</Label>
                          <Input
                            id="component-performance"
                            type="number"
                            placeholder="70"
                            min="0"
                            max="100"
                            value={componentForm.performance}
                            onChange={(e) => setComponentForm({ ...componentForm, performance: e.target.value })}
                          />
                        </div>
                      )}
                      <div className="space-y-2">
                        <Label htmlFor="component-stock">Количество на складе</Label>
                        <Input
                          id="component-stock"
                          type="number"
                          placeholder="10"
                          value={componentForm.stock}
                          onChange={(e) => setComponentForm({ ...componentForm, stock: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-3">
                      <Button variant="outline" onClick={() => setIsComponentDialogOpen(false)}>
                        Отмена
                      </Button>
                      <Button onClick={handleSaveComponent}>Сохранить</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="space-y-4">
                {components.map((component) => {
                  const Icon = getComponentIcon(component.type)
                  return (
                    <div
                      key={component.id}
                      className="flex items-center justify-between p-4 rounded-lg border border-border"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">
                            {getComponentTypeLabel(component.type)}
                          </div>
                          <div className="font-semibold">{component.name}</div>
                          <div className="text-sm text-muted-foreground">В наличии: {component.stock}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="font-bold">{component.price.toLocaleString("ru-RU")} ₽</div>
                          {component.performance && (
                            <div className="text-sm text-muted-foreground">
                              Производительность: {component.performance}%
                            </div>
                          )}
                        </div>
                        <Button variant="outline" size="sm" onClick={() => handleEditComponent(component)}>
                          <Edit className="w-4 h-4 mr-2" />
                          Редактировать
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="warranties" className="space-y-4">
          <Card>
            <div className="p-6">
              <h2 className="text-xl font-bold mb-6">Управление гарантиями</h2>
              <div className="space-y-4">
                {warranties.map((warranty) => (
                  <div
                    key={warranty.id}
                    className="flex items-center justify-between p-4 rounded-lg border border-border"
                  >
                    <div className="flex items-center gap-4">
                      <Shield
                        className={`w-5 h-5 ${warranty.status === "active" ? "text-green-500" : "text-orange-500"}`}
                      />
                      <div>
                        <div className="font-semibold">{warranty.serialNumber}</div>
                        <div className="text-sm text-muted-foreground">
                          {warranty.customer} • {warranty.product}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">До {warranty.expiryDate}</div>
                      <div
                        className={`text-sm font-medium ${warranty.status === "active" ? "text-green-500" : "text-orange-500"}`}
                      >
                        {warranty.status === "active" ? "Активна" : "Истекла"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="reviews" className="space-y-4">
          <Card>
            <div className="p-6">
              <h2 className="text-xl font-bold mb-6">Модерация отзывов</h2>
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="p-4 rounded-lg border border-border">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="font-semibold">{review.customer}</div>
                        <div className="text-sm text-muted-foreground">{review.product}</div>
                      </div>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <span key={i} className="text-primary">
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm mb-3">{review.text}</p>
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-muted-foreground">{review.date}</div>
                      {!review.approved && (
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            Отклонить
                          </Button>
                          <Button size="sm">Одобрить</Button>
                        </div>
                      )}
                      {review.approved && (
                        <div className="text-sm text-green-500 flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" />
                          Одобрено
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
