import { Truck, CreditCard, MapPin, Calendar } from "lucide-react"

export default function DeliveryPayment() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-balance">Доставка и оплата</h2>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            Удобные способы получения и оплаты вашего заказа
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold flex items-center gap-3">
              <Truck className="w-6 h-6 text-primary" />
              Доставка
            </h3>

            <div className="space-y-4">
              <div className="p-4 rounded-lg border border-border bg-card">
                <div className="flex items-start gap-3">
                  <Truck className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <div className="font-semibold mb-1">Доставка по России</div>
                    <div className="text-sm text-muted-foreground">Транспортными компаниями во все регионы</div>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg border border-border bg-card">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <div className="font-semibold mb-1">Самовывоз из офиса</div>
                    <div className="text-sm text-muted-foreground">г. Челябинск, ул. Орджоникидзе, 43</div>
                    <div className="text-sm text-muted-foreground mt-1">Бесплатно, в день заказа</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-bold flex items-center gap-3">
              <CreditCard className="w-6 h-6 text-primary" />
              Оплата
            </h3>

            <div className="space-y-4">
              <div className="p-4 rounded-lg border border-border bg-card">
                <div className="flex items-start gap-3">
                  <CreditCard className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <div className="font-semibold mb-1">Банковская карта</div>
                    <div className="text-sm text-muted-foreground">Оплата картой онлайн или при получении</div>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg border border-border bg-card">
                <div className="flex items-start gap-3">
                  <Truck className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <div className="font-semibold mb-1">Наличные при получении</div>
                    <div className="text-sm text-muted-foreground">Оплата курьеру или в офисе</div>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg border border-border bg-card">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <div className="font-semibold mb-1">Банковский перевод</div>
                    <div className="text-sm text-muted-foreground">Оплата по реквизитам компании</div>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg border border-border bg-card">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-primary mt-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                  </svg>
                  <div>
                    <div className="font-semibold mb-1">Через Авито</div>
                    <div className="text-sm text-muted-foreground">Безопасная сделка на платформе Авито</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
