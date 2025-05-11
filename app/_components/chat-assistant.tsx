"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { MessageCircle } from "lucide-react";

interface ChatAssistantProps {
  isDev?: boolean;
  isPremium: boolean;
}

export function ChatAssistant({
  isDev = false,
  isPremium,
}: ChatAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Define a URL base do iframe com base no ambiente
  const iframeUrl = isDev
    ? "http://localhost:8000/client/iframe.html"
    : "https://seu-dominio.com/assistente/client/iframe.html";

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  // Se o usuário não for premium, não renderiza o componente
  if (!isPremium) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50">
      {isOpen && (
        <div className="mb-4 rounded-lg border bg-card shadow-lg">
          <div className="flex items-center justify-between border-b p-2">
            <h3 className="text-sm font-medium">Assistente AgiFinance</h3>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={toggleChat}
            >
              ×
            </Button>
          </div>
          <div className="h-[400px] w-[350px]">
            <iframe
              src={iframeUrl}
              width="100%"
              height="100%"
              frameBorder="0"
              title="Assistente AgiFinance"
            />
          </div>
        </div>
      )}
      <Button
        onClick={toggleChat}
        className="flex h-12 w-12 items-center justify-center rounded-full p-0"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    </div>
  );
}
