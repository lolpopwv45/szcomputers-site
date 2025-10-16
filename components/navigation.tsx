"use client"

import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import Image from "next/image"
import CartButton from "./cart-button"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const links = [
    { href: "/configurator", label: "Конфигуратор" },
    { href: "/catalog", label: "Готовые ПК" },
    { href: "/peripherals", label: "Периферия" },
    { href: "/complete-setup", label: "Полный комплект" },
    { href: "/warranty", label: "Гарантия" },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo-white.png" alt="SZ Computers" width={32} height={32} className="h-8 w-auto" priority />
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <CartButton />
            <Button asChild variant="ghost" size="sm">
              <Link href="/admin">Админ</Link>
            </Button>
            <Button asChild size="sm">
              <Link href="/configurator">Собрать ПК</Link>
            </Button>
          </div>

          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {isOpen && (
          <div className="md:hidden py-4 space-y-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-4">
              <Button asChild variant="ghost" size="sm">
                <Link href="/cart">Корзина</Link>
              </Button>
              <Button asChild variant="ghost" size="sm">
                <Link href="/admin">Админ панель</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/configurator">Собрать ПК</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
