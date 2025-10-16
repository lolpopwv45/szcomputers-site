import { Button } from "@/components/ui/button"
import { Cpu, HardDrive, Zap } from "lucide-react"
import Link from "next/link"

export default function PreBuiltShowcase() {
  const builds = [
    {
      name: "Starter Gaming",
      price: "65 000",
      fps: "60-90 FPS",
      specs: {
        cpu: "Intel Core i5-13400F",
        gpu: "RTX 4060",
        ram: "16GB DDR4",
        storage: "512GB NVMe",
      },
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      name: "Pro Gaming",
      price: "120 000",
      fps: "120-144 FPS",
      specs: {
        cpu: "AMD Ryzen 7 7800X3D",
        gpu: "RTX 4070 Ti",
        ram: "32GB DDR5",
        storage: "1TB NVMe",
      },
      gradient: "from-purple-500 to-pink-500",
      featured: true,
    },
    {
      name: "Ultra Gaming",
      price: "200 000",
      fps: "144+ FPS",
      specs: {
        cpu: "Intel Core i9-14900K",
        gpu: "RTX 4090",
        ram: "64GB DDR5",
        storage: "2TB NVMe",
      },
      gradient: "from-orange-500 to-red-500",
    },
  ]

  return (
    <section id="pre-built" className="py-24">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-balance">Готовые сборки</h2>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            Оптимально подобранные конфигурации для любого бюджета
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {builds.map((build, index) => (
            <div
              key={index}
              className={`group relative rounded-2xl border ${
                build.featured ? "border-primary" : "border-border"
              } bg-card overflow-hidden hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300`}
            >
              {build.featured && (
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold z-10">
                  Популярный
                </div>
              )}

              <div className="h-48 relative overflow-hidden">
                <img
                  src={`/high-end-gaming-pc.png?key=mkryv&height=300&width=400&query=gaming pc ${build.name.toLowerCase()}`}
                  alt={build.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2">{build.name}</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-primary">{build.price} ₽</span>
                  </div>
                  <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                    <Zap className="w-4 h-4" />
                    {build.fps}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Cpu className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <div>
                      <div className="text-sm text-muted-foreground">Процессор</div>
                      <div className="font-medium">{build.specs.cpu}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <div>
                      <div className="text-sm text-muted-foreground">Видеокарта</div>
                      <div className="font-medium">{build.specs.gpu}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <HardDrive className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <div>
                      <div className="text-sm text-muted-foreground">Память</div>
                      <div className="font-medium">
                        {build.specs.ram} / {build.specs.storage}
                      </div>
                    </div>
                  </div>
                </div>

                <Button className="w-full" variant={build.featured ? "default" : "outline"}>
                  Заказать сборку
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild size="lg" variant="outline">
            <Link href="/catalog">Смотреть все сборки</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
