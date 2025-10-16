import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import Navigation from "@/components/navigation"
import ChatWidget from "@/components/chat-widget"
import Footer from "@/components/footer"

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  variable: "--font-jetbrains-mono",
})

export const metadata: Metadata = {
  title: "SZ Computers - Игровые ПК",
  description: "Мощные игровые компьютеры с индивидуальной конфигурацией",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased">
        <Navigation />
        {children}
        <ChatWidget />
        <Footer />
      </body>
    </html>
  )
}
