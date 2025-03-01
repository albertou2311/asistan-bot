import { useState } from 'react';
import { testEmailConnection, sendEmail } from '../services/emailService';

interface EmailResult {
  success: boolean;
  message?: string;
  error?: string;
}

export const useEmail = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const testConnection = async (): Promise<EmailResult> => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await testEmailConnection();
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Bağlantı testi başarısız';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const sendTestEmail = async (to: string): Promise<EmailResult> => {
    setLoading(true);
    setError(null);

    try {
      const result = await sendEmail(
        to, 
        'AI Bot Admin - Test E-postası', 
        'Bu bir test e-postasıdır. E-posta sistemi başarıyla çalışıyor.'
      );
      
      return {
        success: true,
        message: `Test e-postası başarıyla gönderildi (${result.messageId})`
      };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'E-posta gönderilemedi';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return {
    testConnection,
    sendTestEmail,
    loading,
    error
  };
};