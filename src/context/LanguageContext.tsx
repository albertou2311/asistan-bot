import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'tr' | 'es' | 'fr' | 'de' | 'it' | 'pt' | 'ru' | 'ja' | 'ko' | 'zh' | 'ar' | 'hi' | 'nl' | 'pl';

interface Translations {
  dashboard: string;
  teacherBot: string;
  systemBot: string;
  securityBot: string;
  codeBot: string;
  settings: string;
  modifySchedule: string;
  taskName: string;
  addTask: string;
  save: string;
  emailConfiguration: string;
  smtpServer: string;
  port: string;
  notifications: string;
  emailNotifications: string;
  security: string;
  twoFactorAuth: string;
  storage: string;
  storageUsage: string;
  availableSpace: string;
  systemMonitor: string;
}

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  translations: Record<Language, Translations>;
}

const translations: Record<Language, Translations> = {
  en: {
    dashboard: 'Dashboard',
    teacherBot: 'Teacher Bot',
    systemBot: 'System Bot',
    securityBot: 'Security Bot',
    codeBot: 'Code Bot',
    settings: 'Settings',
    modifySchedule: 'Modify Schedule',
    taskName: 'Task Name',
    addTask: 'Add Task',
    save: 'Save',
    emailConfiguration: 'Email Configuration',
    smtpServer: 'SMTP Server',
    port: 'Port',
    notifications: 'Notifications',
    emailNotifications: 'Email Notifications',
    security: 'Security',
    twoFactorAuth: 'Two-Factor Authentication',
    storage: 'Storage',
    storageUsage: 'Storage Usage',
    availableSpace: 'Available Space',
    systemMonitor: 'System Monitor'
  },
  tr: {
    dashboard: 'Gösterge Paneli',
    teacherBot: 'Öğretmen Bot',
    systemBot: 'Sistem Bot',
    securityBot: 'Güvenlik Bot',
    codeBot: 'Kod Bot',
    settings: 'Ayarlar',
    modifySchedule: 'Programı Düzenle',
    taskName: 'Görev Adı',
    addTask: 'Görev Ekle',
    save: 'Kaydet',
    emailConfiguration: 'E-posta Yapılandırması',
    smtpServer: 'SMTP Sunucusu',
    port: 'Port',
    notifications: 'Bildirimler',
    emailNotifications: 'E-posta Bildirimleri',
    security: 'Güvenlik',
    twoFactorAuth: 'İki Faktörlü Kimlik Doğrulama',
    storage: 'Depolama',
    storageUsage: 'Depolama Kullanımı',
    availableSpace: 'Kullanılabilir Alan',
    systemMonitor: 'Sistem Monitörü'
  },
  // Add translations for other languages...
  es: {
    dashboard: 'Panel de Control',
    teacherBot: 'Bot Profesor',
    systemBot: 'Bot del Sistema',
    securityBot: 'Bot de Seguridad',
    codeBot: 'Bot de Código',
    settings: 'Configuración',
    modifySchedule: 'Modificar Horario',
    taskName: 'Nombre de la Tarea',
    addTask: 'Añadir Tarea',
    save: 'Guardar',
    emailConfiguration: 'Configuración de Correo',
    smtpServer: 'Servidor SMTP',
    port: 'Puerto',
    notifications: 'Notificaciones',
    emailNotifications: 'Notificaciones por Correo',
    security: 'Seguridad',
    twoFactorAuth: 'Autenticación de Dos Factores',
    storage: 'Almacenamiento',
    storageUsage: 'Uso de Almacenamiento',
    availableSpace: 'Espacio Disponible',
    systemMonitor: 'Monitor del Sistema'
  },
  // ... (similar translations for other languages)
  fr: { /* French translations */ } as Translations,
  de: { /* German translations */ } as Translations,
  it: { /* Italian translations */ } as Translations,
  pt: { /* Portuguese translations */ } as Translations,
  ru: { /* Russian translations */ } as Translations,
  ja: { /* Japanese translations */ } as Translations,
  ko: { /* Korean translations */ } as Translations,
  zh: { /* Chinese translations */ } as Translations,
  ar: { /* Arabic translations */ } as Translations,
  hi: { /* Hindi translations */ } as Translations,
  nl: { /* Dutch translations */ } as Translations,
  pl: { /* Polish translations */ } as Translations
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language');
    return (savedLanguage as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translations }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};