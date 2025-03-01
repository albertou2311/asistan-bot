import { useState } from 'react';
import { generateAIResponse } from '../services/aiService';

export const useAI = (botType: 'teacher' | 'system' | 'security' | 'code') => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [usingFallback, setUsingFallback] = useState(false);

  const getAIResponse = async (prompt: string) => {
    setLoading(true);
    setError(null);
    setUsingFallback(false);

    try {
      const response = await generateAIResponse(botType, prompt);
      if (response.source === 'fallback') {
        setUsingFallback(true);
      }
      if (response.error) {
        setError(response.error);
      }
      return response.content;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'AI yanıtı alınamadı';
      setError(errorMessage);
      return `Sistem şu anda yoğun. Lütfen daha sonra tekrar deneyin.`;
    } finally {
      setLoading(false);
    }
  };

  return {
    getAIResponse,
    loading,
    error,
    usingFallback
  };
};