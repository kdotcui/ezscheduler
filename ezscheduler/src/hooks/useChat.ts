import { useState } from "react";
import type { Message } from "@/types/message";
import { parseEventFromNaturalLanguage } from "@/utils/openai";

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Get API key and model from storage
      const apiKey = await storage.getItem<string>("local:apiKey");
      const model = await storage.getItem<string>("local:model");

      if (!apiKey) {
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: "error",
          content: "Please configure your OpenAI API key in settings.",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorMessage]);
        setIsLoading(false);
        return;
      }

      // Parse event using OpenAI
      const result = await parseEventFromNaturalLanguage({
        apiKey,
        model: model || "gpt-5-nano",
        prompt: content,
      });

      if (result.success && result.event) {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: "ai",
          content: "Calendar event generated",
          event: result.event,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiMessage]);
      } else {
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: "error",
          content: result.error || "Failed to parse event",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "error",
        content: `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    isLoading,
    sendMessage: handleSendMessage,
  };
}

