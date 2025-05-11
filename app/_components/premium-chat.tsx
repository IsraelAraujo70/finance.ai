"use client";

import { useEffect, useState } from "react";
import { ChatAssistant } from "./chat-assistant";

export function PremiumChat() {
  const [isPremium, setIsPremium] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Função para verificar se o usuário é premium
    const checkPremiumStatus = async () => {
      try {
        // Fazer uma requisição para verificar o status premium do usuário
        const response = await fetch("/api/check-premium");
        const data = await response.json();
        setIsPremium(data.isPremium);
      } catch (error) {
        console.error("Erro ao verificar status premium:", error);
        setIsPremium(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkPremiumStatus();
  }, []);

  // Não renderiza nada enquanto está carregando
  if (isLoading) return null;

  // Renderiza o ChatAssistant apenas se o usuário for premium
  return (
    <ChatAssistant
      isDev={process.env.NODE_ENV === "development"}
      isPremium={isPremium}
    />
  );
}
