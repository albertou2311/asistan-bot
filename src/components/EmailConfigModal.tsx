import React, { useState, useEffect } from 'react';
import { X, Mail, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useEmail } from '../hooks/useEmail';

interface EmailConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EmailConfigModal = ({ isOpen, onClose }: EmailConfigModalProps) => {
  const { theme, themeStyles } = useTheme();
  const { testConnection, sendTestEmail, loading, error } = useEmail();
  const currentTheme = themeStyles[theme];
  
  const [testEmail, setTestEmail] = useState('');
  const [status, setStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  useEffect(() => {
    if (isOpen) {
      checkConnection();
    }
  }, [isOpen]);

  const checkConnection = async () => {
    setStatus({ type: null, message: 'Bağlantı kontrol ediliyor...' });
    const result = await testConnection();
    setStatus({
      type: result.success ? 'success' : 'error',
      message: result.message || ''
    });
  };

  const handleTestEmail = async () => {
    if (!testEmail) {
      setStatus({
        type: 'error',
        message: 'Lütfen test için bir e-posta adresi girin'
      });
      return;
    }

    setStatus({ type: null, message: 'E-posta gönderiliyor...' });
    const result = await sendTestEmail(testEmail);
    setStatus({
      type: result.success ? 'success' : 'error',
      message: result.message || result.error || ''
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`${currentTheme.bg} rounded-lg shadow-xl w-full max-w-md p-6`}>
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Mail className="w-5 h-5 mr-2" />
            <h2 className={`text-lg font-semibold ${currentTheme.text}`}>
              E-posta Yapılandırması
            </h2>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg hover:${currentTheme.accent}`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4">
          {/* Bağlantı Durumu */}
          <div className={`p-4 rounded-lg ${
            status.type === 'success' ? 'bg-green-100' : 
            status.type === 'error' ? 'bg-red-100' : 
            currentTheme.monitorBg
          }`}>
            <div className="flex items-center">
              {status.type === 'success' ? (
                <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
              ) : status.type === 'error' ? (
                <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
              ) : null}
              <span className={`text-sm ${
                status.type === 'success' ? 'text-green-600' :
                status.type === 'error' ? 'text-red-600' :
                currentTheme.text
              }`}>
                {status.message || 'Bağlantı kontrol ediliyor...'}
              </span>
            </div>
          </div>

          {/* Test E-posta Gönderimi */}
          <div>
            <label className={`block text-sm font-medium ${currentTheme.text} mb-1`}>
              Test E-postası Gönder
            </label>
            <div className="flex space-x-2">
              <input
                type="email"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
                placeholder="ornek@email.com"
                className={`flex-1 px-3 py-2 rounded-lg border ${currentTheme.border} ${currentTheme.bg} ${currentTheme.text}`}
              />
              <button
                onClick={handleTestEmail}
                disabled={loading}
                className={`px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center`}
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                ) : (
                  <Send className="w-4 h-4 mr-2" />
                )}
                Gönder
              </button>
            </div>
          </div>

          {/* SMTP Bilgileri */}
          <div className={`mt-4 p-4 rounded-lg ${currentTheme.monitorBg}`}>
            <h3 className={`text-sm font-medium ${currentTheme.text} mb-2`}>SMTP Yapılandırması</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className={currentTheme.text}>Sunucu</span>
                <span className={`${currentTheme.text} font-mono`}>{import.meta.env.VITE_SMTP_HOST}</span>
              </div>
              <div className="flex justify-between">
                <span className={currentTheme.text}>Port</span>
                <span className={`${currentTheme.text} font-mono`}>{import.meta.env.VITE_SMTP_PORT}</span>
              </div>
              <div className="flex justify-between">
                <span className={currentTheme.text}>Kullanıcı</span>
                <span className={`${currentTheme.text} font-mono`}>{import.meta.env.VITE_SMTP_USER}</span>
              </div>
              <div className="flex justify-between">
                <span className={currentTheme.text}>Gönderen</span>
                <span className={`${currentTheme.text} font-mono`}>{import.meta.env.VITE_SMTP_FROM}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={checkConnection}
            disabled={loading}
            className={`px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mr-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center`}
          >
            {loading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
            ) : null}
            Bağlantıyı Test Et
          </button>
          <button
            onClick={onClose}
            className={`px-4 py-2 ${currentTheme.accent} rounded-lg`}
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailConfigModal;