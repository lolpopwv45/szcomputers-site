"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { MessageCircle, X, Send, Bot } from "lucide-react"

type Message = {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Здравствуйте! Я виртуальный помощник SZ Computers. Чем могу помочь?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const quickReplies = ["Как собрать ПК?", "Цены на сборки", "Условия гарантии", "Способы доставки"]

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()

    if (lowerMessage.includes("собрать") || lowerMessage.includes("конфигуратор")) {
      return "Вы можете собрать свой ПК в нашем конфигураторе! Перейдите в раздел 'Конфигуратор' и выберите нужные комплектующие. Система автоматически рассчитает стоимость и производительность."
    }

    if (lowerMessage.includes("цен") || lowerMessage.includes("стоимость") || lowerMessage.includes("сколько")) {
      return "У нас есть готовые сборки от 65 000₽ до 250 000₽. Starter Gaming - 65 000₽, Pro Gaming - 120 000₽, Ultra Gaming - 200 000₽. Также можете собрать индивидуальную конфигурацию."
    }

    if (lowerMessage.includes("гарант")) {
      return "Мы предоставляем гарантию 2 года на все комплектующие. Бесплатный ремонт и замена неисправных компонентов. Проверить статус гарантии можно по серийному номеру на странице 'Гарантия'."
    }

    if (lowerMessage.includes("доставк") || lowerMessage.includes("получ")) {
      return "Доставка: курьером по Москве и МО (500₽, 1-2 дня), транспортной компанией по России (от 1000₽, 2-5 дней), самовывоз (бесплатно, в день заказа)."
    }

    if (lowerMessage.includes("оплат")) {
      return "Принимаем оплату: банковские карты (Visa, MasterCard, МИР), рассрочка 0% до 12 месяцев, наличные при получении."
    }

    if (lowerMessage.includes("контакт") || lowerMessage.includes("связ")) {
      return "Наши контакты: телефон +7 (495) 123-45-67, email: info@szcomputers.ru. Поддержка работает 24/7!"
    }

    if (lowerMessage.includes("привет") || lowerMessage.includes("здравств")) {
      return "Здравствуйте! Рад помочь вам с выбором игрового компьютера. Что вас интересует?"
    }

    return "Спасибо за ваш вопрос! Для получения более детальной консультации свяжитесь с нашей поддержкой по телефону +7 (495) 123-45-67 или напишите на info@szcomputers.ru"
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate bot typing delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const botResponse: Message = {
      id: (Date.now() + 1).toString(),
      text: getBotResponse(inputValue),
      sender: "bot",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, botResponse])
    setIsTyping(false)
  }

  const handleQuickReply = (reply: string) => {
    setInputValue(reply)
  }

  return (
    <>
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="fixed bottom-6 right-6 z-50 rounded-full w-14 h-14 shadow-2xl shadow-primary/50"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      )}

      {isOpen && (
        <Card className="fixed bottom-6 right-6 z-50 w-[380px] h-[600px] flex flex-col shadow-2xl border-primary/20">
          <div className="flex items-center justify-between p-4 border-b border-border bg-gradient-to-r from-primary/10 to-purple-500/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-semibold">Помощник SZ</div>
                <div className="text-xs text-muted-foreground">Онлайн</div>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                    message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString("ru-RU", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-2xl px-4 py-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" />
                    <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:0.2s]" />
                    <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {messages.length === 1 && (
            <div className="px-4 pb-2">
              <div className="text-xs text-muted-foreground mb-2">Быстрые вопросы:</div>
              <div className="flex flex-wrap gap-2">
                {quickReplies.map((reply, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickReply(reply)}
                    className="text-xs"
                  >
                    {reply}
                  </Button>
                ))}
              </div>
            </div>
          )}

          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Напишите сообщение..."
                className="flex-1"
              />
              <Button onClick={handleSendMessage} size="icon" disabled={!inputValue.trim()}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  )
}
