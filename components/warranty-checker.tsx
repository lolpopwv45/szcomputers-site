"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Shield, Search, CheckCircle2, XCircle, Calendar, Package } from "lucide-react"

type WarrantyStatus = {
  serialNumber: string
  status: "active" | "expired" | "not-found"
  productName?: string
  purchaseDate?: string
  expiryDate?: string
  remainingDays?: number
}

export default function WarrantyChecker() {
  const [serialNumber, setSerialNumber] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<WarrantyStatus | null>(null)

  // Mock warranty data
  const mockWarranties: Record<string, WarrantyStatus> = {
    SZ2024001: {
      serialNumber: "SZ2024001",
      status: "active",
      productName: "Pro Gaming",
      purchaseDate: "15.01.2024",
      expiryDate: "15.01.2026",
      remainingDays: 450,
    },
    SZ2024002: {
      serialNumber: "SZ2024002",
      status: "active",
      productName: "Ultra Gaming",
      purchaseDate: "20.02.2024",
      expiryDate: "20.02.2026",
      remainingDays: 486,
    },
    SZ2023001: {
      serialNumber: "SZ2023001",
      status: "expired",
      productName: "Starter Gaming",
      purchaseDate: "10.10.2022",
      expiryDate: "10.10.2024",
      remainingDays: 0,
    },
  }

  const handleCheck = async () => {
    setIsLoading(true)
    setResult(null)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const warranty = mockWarranties[serialNumber.toUpperCase()]

    if (warranty) {
      setResult(warranty)
    } else {
      setResult({
        serialNumber: serialNumber.toUpperCase(),
        status: "not-found",
      })
    }

    setIsLoading(false)
  }

  return (
    <div className="container px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-balance">Проверка гарантии</h1>
          <p className="text-xl text-muted-foreground text-pretty">
            Введите серийный номер вашего компьютера для проверки статуса гарантии
          </p>
        </div>

        <Card className="p-8 mb-8">
          <div className="space-y-6">
            <div>
              <label htmlFor="serial" className="block text-sm font-medium mb-2">
                Серийный номер
              </label>
              <div className="flex gap-3">
                <Input
                  id="serial"
                  type="text"
                  placeholder="Например: SZ2024001"
                  value={serialNumber}
                  onChange={(e) => setSerialNumber(e.target.value)}
                  className="flex-1"
                  onKeyDown={(e) => e.key === "Enter" && handleCheck()}
                />
                <Button onClick={handleCheck} disabled={!serialNumber || isLoading} size="lg">
                  <Search className="w-5 h-5 mr-2" />
                  {isLoading ? "Проверка..." : "Проверить"}
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Серийный номер указан на наклейке на корпусе компьютера
              </p>
            </div>

            {result && (
              <div className="pt-6 border-t border-border">
                {result.status === "active" && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 text-green-500">
                      <CheckCircle2 className="w-8 h-8" />
                      <div>
                        <div className="text-2xl font-bold">Гарантия активна</div>
                        <div className="text-sm text-muted-foreground">Ваш компьютер под защитой</div>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="p-4 rounded-lg bg-muted/50">
                        <div className="flex items-center gap-2 text-muted-foreground mb-2">
                          <Package className="w-4 h-4" />
                          <span className="text-sm">Модель</span>
                        </div>
                        <div className="font-semibold">{result.productName}</div>
                      </div>

                      <div className="p-4 rounded-lg bg-muted/50">
                        <div className="flex items-center gap-2 text-muted-foreground mb-2">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm">Дата покупки</span>
                        </div>
                        <div className="font-semibold">{result.purchaseDate}</div>
                      </div>

                      <div className="p-4 rounded-lg bg-muted/50">
                        <div className="flex items-center gap-2 text-muted-foreground mb-2">
                          <Shield className="w-4 h-4" />
                          <span className="text-sm">Гарантия до</span>
                        </div>
                        <div className="font-semibold">{result.expiryDate}</div>
                      </div>

                      <div className="p-4 rounded-lg bg-primary/10">
                        <div className="flex items-center gap-2 text-primary mb-2">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm">Осталось дней</span>
                        </div>
                        <div className="font-semibold text-primary">{result.remainingDays}</div>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-muted/30 border border-border">
                      <h3 className="font-semibold mb-2">Что покрывает гарантия:</h3>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>✓ Бесплатный ремонт всех комплектующих</li>
                        <li>✓ Замена неисправных компонентов</li>
                        <li>✓ Техническая поддержка 24/7</li>
                        <li>✓ Бесплатная диагностика</li>
                      </ul>
                    </div>
                  </div>
                )}

                {result.status === "expired" && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-orange-500">
                      <XCircle className="w-8 h-8" />
                      <div>
                        <div className="text-2xl font-bold">Гарантия истекла</div>
                        <div className="text-sm text-muted-foreground">Срок гарантии закончился</div>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="p-4 rounded-lg bg-muted/50">
                        <div className="flex items-center gap-2 text-muted-foreground mb-2">
                          <Package className="w-4 h-4" />
                          <span className="text-sm">Модель</span>
                        </div>
                        <div className="font-semibold">{result.productName}</div>
                      </div>

                      <div className="p-4 rounded-lg bg-muted/50">
                        <div className="flex items-center gap-2 text-muted-foreground mb-2">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm">Гарантия истекла</span>
                        </div>
                        <div className="font-semibold">{result.expiryDate}</div>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-muted/30 border border-border">
                      <h3 className="font-semibold mb-2">Платное обслуживание:</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Мы можем продлить гарантию или предоставить платный ремонт
                      </p>
                      <Button variant="outline">Связаться с поддержкой</Button>
                    </div>
                  </div>
                )}

                {result.status === "not-found" && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-destructive">
                      <XCircle className="w-8 h-8" />
                      <div>
                        <div className="text-2xl font-bold">Не найдено</div>
                        <div className="text-sm text-muted-foreground">Серийный номер не найден в базе</div>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-muted/30 border border-border">
                      <h3 className="font-semibold mb-2">Возможные причины:</h3>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Неверно введен серийный номер</li>
                        <li>• Компьютер приобретен не у нас</li>
                        <li>• Данные еще не внесены в систему</li>
                      </ul>
                      <Button variant="outline" className="mt-4 bg-transparent">
                        Связаться с поддержкой
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </Card>

        <div className="grid sm:grid-cols-3 gap-4">
          <Card className="p-6 text-center">
            <Shield className="w-8 h-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">2 года гарантии</h3>
            <p className="text-sm text-muted-foreground">На все комплектующие</p>
          </Card>

          <Card className="p-6 text-center">
            <CheckCircle2 className="w-8 h-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Бесплатный ремонт</h3>
            <p className="text-sm text-muted-foreground">В течение гарантийного срока</p>
          </Card>

          <Card className="p-6 text-center">
            <Calendar className="w-8 h-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Быстрое обслуживание</h3>
            <p className="text-sm text-muted-foreground">Ремонт за 3-5 дней</p>
          </Card>
        </div>
      </div>
    </div>
  )
}
