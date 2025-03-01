import React, { useState } from 'react';
import { X, Settings, Save, Bell, Shield, Database } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

interface BotSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  botName: string;
}

const BotSettingsModal = ({ isOpen, onClose, botName }: BotSettingsModalProps) => {
  const { theme, themeStyles } = useTheme();
  const { language, translations } = useLanguage();
  const currentTheme = themeStyles[theme];
  const t = translations[language];

  const [settings, setSettings] = useState({
    notifications: true,
    emailAlerts: true,
    autoRestart: true,
    logging: true,
    maxMemory: '2048',
    maxCPU: '80'
  });

  const handleSave = () => {
    // Save bot settings
    console.log('Saving bot settings:', settings);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`${currentTheme.bg} rounded-lg shadow-xl w-full max-w-md p-6`}>
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Settings className="w-5 h-5 mr-2" />
            <h2 className={`text-lg font-semibold ${currentTheme.text}`}>
              {botName} Settings
            </h2>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg hover:${currentTheme.accent}`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Notifications Section */}
          <div className={`p-4 rounded-lg ${currentTheme.monitorBg}`}>
            <div className="flex items-center mb-4">
              <Bell className="w-4 h-4 mr-2" />
              <h3 className={`font-medium ${currentTheme.text}`}>{t.notifications}</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className={`text-sm ${currentTheme.text}`}>Enable Notifications</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.notifications}
                    onChange={(e) => setSettings({ ...settings, notifications: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <span className={`text-sm ${currentTheme.text}`}>{t.emailNotifications}</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.emailAlerts}
                    onChange={(e) => setSettings({ ...settings, emailAlerts: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* System Section */}
          <div className={`p-4 rounded-lg ${currentTheme.monitorBg}`}>
            <div className="flex items-center mb-4">
              <Database className="w-4 h-4 mr-2" />
              <h3 className={`font-medium ${currentTheme.text}`}>System</h3>
            </div>
            <div className="space-y-3">
              <div>
                <label className={`block text-sm ${currentTheme.text} mb-1`}>
                  Max Memory (MB)
                </label>
                <input
                  type="number"
                  value={settings.maxMemory}
                  onChange={(e) => setSettings({ ...settings, maxMemory: e.target.value })}
                  className={`w-full px-3 py-2 rounded-lg border ${currentTheme.border} ${currentTheme.bg} ${currentTheme.text}`}
                />
              </div>
              <div>
                <label className={`block text-sm ${currentTheme.text} mb-1`}>
                  Max CPU Usage (%)
                </label>
                <input
                  type="number"
                  value={settings.maxCPU}
                  onChange={(e) => setSettings({ ...settings, maxCPU: e.target.value })}
                  className={`w-full px-3 py-2 rounded-lg border ${currentTheme.border} ${currentTheme.bg} ${currentTheme.text}`}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className={`text-sm ${currentTheme.text}`}>Auto Restart</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.autoRestart}
                    onChange={(e) => setSettings({ ...settings, autoRestart: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Security Section */}
          <div className={`p-4 rounded-lg ${currentTheme.monitorBg}`}>
            <div className="flex items-center mb-4">
              <Shield className="w-4 h-4 mr-2" />
              <h3 className={`font-medium ${currentTheme.text}`}>{t.security}</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className={`text-sm ${currentTheme.text}`}>Enable Logging</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.logging}
                    onChange={(e) => setSettings({ ...settings, logging: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSave}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Save className="w-4 h-4 mr-2" />
            {t.save}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BotSettingsModal;