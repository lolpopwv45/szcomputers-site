"use client"

import { Star } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function Reviews() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const reviews = [
    {
      name: "Алексей М.",
      rating: 5,
      text: "Отличная сборка! Все игры на ультра настройках летают. Доставили быстро, упаковано надежно. Рекомендую!",
      build: "Pro Gaming",
    },
    {
      name: "Дмитрий К.",
      rating: 5,
      text: "Заказывал конфигуратор, помогли подобрать оптимальные комплектующие под мой бюджет. Очень доволен результатом!",
      build: "Индивидуальная сборка",
    },
    {
      name: "Михаил П.",
      rating: 5,
      text: "Купил Ultra Gaming для стриминга. Мощный зверь! Поддержка помогла настроить все программы. Спасибо!",
      build: "Ultra Gaming",
    },
  ]

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length)
  }

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length)
  }

  return (
    <section id="reviews" className="py-24">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-balance">Отзывы клиентов</h2>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            Более 500 довольных клиентов по всей России
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="relative p-8 rounded-2xl border border-border bg-card">
            <div className="flex gap-1 mb-4">
              {Array.from({ length: reviews[currentIndex].rating }).map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-primary text-primary" />
              ))}
            </div>

            <p className="text-lg mb-6 text-pretty">{reviews[currentIndex].text}</p>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-bold">{reviews[currentIndex].name}</div>
                <div className="text-sm text-muted-foreground">{reviews[currentIndex].build}</div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="icon" onClick={prevReview}>
                  ←
                </Button>
                <Button variant="outline" size="icon" onClick={nextReview}>
                  →
                </Button>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-6">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? "bg-primary w-8" : "bg-muted-foreground/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
