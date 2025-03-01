import React from 'react';
import { Settings as SettingsIcon, Mail, Bell, Shield, Database, Clock } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import ThemeSelector from '../components/ThemeSelector';
import LanguageSelector from '../components/LanguageSelector';

const Settings = () => {
  const { theme, themeStyles } = useTheme();
  const { language, translations } = useLanguage();
  const currentTheme = themeStyles[theme];
  const t = translations[language];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className={`text-2xl font-bold ${currentTheme.text}`}>{t.settings}</h1>
        <div className="flex space-x-4">
          <LanguageSelector />
          <ThemeSelector />
        </div>
      </div>

      <div className="space-y-6">
        <div className={`${currentTheme.bg} rounded-lg shadow`}>
          <div className="p-6">
            <h2 className={`text-lg font-semibold mb-4 flex items-center ${currentTheme.text}`}>
              <Mail className="w-5 h-5 mr-2" />
              {t.emailConfiguration}
            </h2>
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium ${currentTheme.text}`}>{t.smtpServer}</label>
                <input 
                  type="text" 
                  className={`mt-1 block w-full rounded-md border ${currentTheme.border} shadow-sm focus:border-blue-500 focus:ring-blue-500 ${currentTheme.bg} ${currentTheme.text} p-2`} 
                />
              </div>
              <div>
                <label className={`block text-sm font-medium ${currentTheme.text}`}>{t.port}</label>
                <input 
                  type="number" 
                  className={`mt-1 block w-full rounded-md border ${currentTheme.border} shadow-sm focus:border-blue-500 focus:ring-blue-500 ${currentTheme.bg} ${currentTheme.text} p-2`} 
                />
              </div>
            </div>
          </div>
        </div>

        <div className={`${currentTheme.bg} rounded-lg shadow`}>
          <div className="p-6">
            <h2 className={`text-lg font-semibold mb-4 flex items-center ${currentTheme.text}`}>
              <Bell className="w-5 h-5 mr-2" />
              {t.notifications}
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className={currentTheme.text}>{t.emailNotifications}</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className={`${currentTheme.bg} rounded-lg shadow`}>
          <div className="p-6">
            <h2 className={`text-lg font-semibold mb-4 flex items-center ${currentTheme.text}`}>
              <Shield className="w-5 h-5 mr-2" />
              {t.security}
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className={currentTheme.text}>{t.twoFactorAuth}</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className={`${currentTheme.bg} rounded-lg shadow`}>
          <div className="p-6">
            <h2 className={`text-lg font-semibold mb-4 flex items-center ${currentTheme.text}`}>
              <Database className="w-5 h-5 mr-2" />
              {t.storage}
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className={currentTheme.text}>{t.storageUsage}</span>
                <span className={currentTheme.accent}>45%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
              <div className="flex justify-between items-center">
                <span className={currentTheme.text}>{t.availableSpace}</span>
                <span className={currentTheme.accent}>27.5 GB</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;