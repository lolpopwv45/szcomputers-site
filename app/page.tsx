import Hero from "@/components/hero"
import Benefits from "@/components/benefits"
import PreBuiltShowcase from "@/components/pre-built-showcase"
import Reviews from "@/components/reviews"
import DeliveryPayment from "@/components/delivery-payment"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <PreBuiltShowcase />
      <Benefits />
      <DeliveryPayment />
      <Reviews />
      <Footer />
    </main>
  )
}
