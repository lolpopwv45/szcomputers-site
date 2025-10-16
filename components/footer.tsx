import Image from "next/image"
import Link from "next/link"
import { Phone, MapPin, Clock } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-black/40 border-t border-border/40 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Image src="/logo-white.png" alt="SZ Computers" width={40} height={40} className="h-10 w-auto" />
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                SZ COMPUTERS
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Мощные игровые компьютеры с индивидуальной конфигурацией. Качество, надежность, производительность.
            </p>
            <div className="flex gap-4">
              <Link
                href="https://vk.com/szcomputers"
                target="_blank"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14c5.6 0 6.93-1.33 6.93-6.93V8.93C22 3.33 20.67 2 15.07 2zm3.45 14.98h-1.4c-.56 0-.73-.45-1.73-1.47-1.1-1.1-1.58-1.25-1.85-1.25-.38 0-.49.11-.49.64v1.35c0 .36-.12.58-1.06.58-1.56 0-3.29-.94-4.51-2.7-1.84-2.62-2.34-4.58-2.34-4.98 0-.27.11-.52.64-.52h1.4c.48 0 .66.22.85.73.91 2.58 2.43 4.84 3.06 4.84.24 0 .34-.11.34-.71v-2.78c-.07-1.19-.7-1.29-.7-1.72 0-.21.18-.43.46-.43h2.2c.4 0 .55.22.55.69v3.76c0 .4.18.55.3.55.24 0 .44-.15.88-.59 1.35-1.52 2.32-3.87 2.32-3.87.13-.27.34-.52.82-.52h1.4c.66 0 .81.34.66.8-.23.94-2.39 4.17-2.39 4.17-.2.33-.28.48 0 .85.2.27.86.84 1.3 1.35.81.92 1.43 1.69 1.6 2.23.18.54-.1.81-.66.81z" />
                </svg>
              </Link>
              <Link
                href="https://t.me/szcomputers"
                target="_blank"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Навигация</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/configurator"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Конфигуратор ПК
                </Link>
              </li>
              <li>
                <Link href="/catalog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Каталог готовых сборок
                </Link>
              </li>
              <li>
                <Link
                  href="/#benefits"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Преимущества
                </Link>
              </li>
              <li>
                <Link
                  href="/warranty"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Проверка гарантии
                </Link>
              </li>
              <li>
                <Link
                  href="/#reviews"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Отзывы клиентов
                </Link>
              </li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h3 className="font-semibold mb-4">Информация</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  О компании
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Доставка и оплата
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Гарантия и возврат
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Политика конфиденциальности
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Админ панель
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Контакты</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <div>
                  <a href="tel:+79925047298" className="hover:text-foreground transition-colors">
                    8 992 504-72-98
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <div>г. Челябинск, ул. Орджоникидзе, 43</div>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <div>Ежедневно с 8:00 до 22:00 (МСК)</div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/40 mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} SZ Computers. Все права защищены.</p>
        </div>
      </div>
    </footer>
  )
}
