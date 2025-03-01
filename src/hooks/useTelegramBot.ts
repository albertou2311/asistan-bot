import { useState, useCallback } from 'react';
import { sendMessage } from '../services/telegramBot';

export const useTelegramBot = (defaultChatId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendTelegramMessage = useCallback(async (message: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const success = await sendMessage(defaultChatId, message);
      if (!success) {
        throw new Error('Mesaj gönderilemedi');
      }
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bir hata oluştu');
      return false;
    } finally {
      setLoading(false);
    }
  }, [defaultChatId]);

  return {
    sendTelegramMessage,
    loading,
    error
  };
};