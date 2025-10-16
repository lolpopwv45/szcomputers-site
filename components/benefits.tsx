import { Shield, Zap, Truck, Headphones } from "lucide-react"

export default function Benefits() {
  const benefits = [
    {
      icon: Zap,
      title: "Максимальная мощность",
      description: "Только топовые комплектующие от ведущих производителей для максимальной производительности",
    },
    {
      icon: Shield,
      title: "Надежность",
      description: "Тщательное тестирование каждой сборки перед отправкой. Гарантия 2 года на все компоненты",
    },
    {
      icon: Truck,
      title: "Быстрая доставка",
      description: "Доставка по всей России за 1-3 дня. Самовывоз из офиса в день заказа",
    },
    {
      icon: Headphones,
      title: "Поддержка 24/7",
      description: "Профессиональная техническая поддержка в любое время. Всегда на связи",
    },
  ]

  return (
    <section id="benefits" className="py-24 bg-muted/30">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-balance">Почему выбирают нас</h2>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            Мы предлагаем не просто компьютеры, а комплексное решение для геймеров
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group relative p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative space-y-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <benefit.icon className="w-6 h-6 text-primary" />
                </div>

                <h3 className="text-xl font-bold">{benefit.title}</h3>
                <p className="text-muted-foreground text-pretty">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
