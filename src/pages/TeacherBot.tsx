import React, { useState, useEffect } from 'react';
import { Brain, Mail, Clock, Settings, MessageSquare, Play } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useAI } from '../hooks/useAI';
import ScheduleModal, { ScheduleItem } from '../components/ScheduleModal';
import EmailConfigModal from '../components/EmailConfigModal';
import BotSettingsModal from '../components/BotSettingsModal';

const TeacherBot = () => {
  const { theme, themeStyles } = useTheme();
  const { language, translations } = useLanguage();
  const currentTheme = themeStyles[theme];
  const t = translations[language];
  const { getAIResponse, loading: aiLoading } = useAI('teacher');

  const [activityLogs, setActivityLogs] = useState<string[]>([
    "Eğitim içeriği analiz ediliyor...",
    "Kurs A'dan video dersler işleniyor",
    "Önemli öğrenme noktaları çıkarılıyor",
    "Öğretim materyalleri hazırlanıyor"
  ]);

  const [command, setCommand] = useState('');
  const [code, setCode] = useState('// Öğretim komutları burada görünecek\n');
  const [isPreview, setIsPreview] = useState(true);
  const [schedules, setSchedules] = useState<ScheduleItem[]>([
    { id: '1', time: '18:00', task: 'Günlük Rapor' },
    { id: '2', time: '10:00', task: 'Haftalık İnceleme' },
    { id: '3', time: '02:00', task: 'Sistem Güncelleme' }
  ]);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [botStatus, setBotStatus] = useState({
    task: 'Kurs Materyali Analizi',
    progress: 45,
    activeStudents: 12,
    completedTasks: 8
  });

  const handleCommand = async () => {
    if (!command.trim()) return;
    
    setActivityLogs(prev => [...prev, `$ ${command}`]);
    
    // AI yanıtı al
    const aiResponse = await getAIResponse(command);
    if (aiResponse) {
      setActivityLogs(prev => [...prev, aiResponse]);
    }
    
    setCommand('');
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setBotStatus(prev => ({
        ...prev,
        progress: Math.min(100, prev.progress + Math.random() * 5),
        activeStudents: Math.floor(10 + Math.random() * 5),
        completedTasks: prev.completedTasks + (Math.random() > 0.7 ? 1 : 0)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 h-screen relative">
      <div className="flex justify-between items-center mb-6">
        <h1 className={`text-2xl font-bold ${currentTheme.text}`}>Öğretmen Bot</h1>
        <div className="flex space-x-2">
          <button 
            onClick={() => setIsEmailModalOpen(true)}
            className={`flex items-center px-4 py-2 ${currentTheme.accent} rounded-lg hover:opacity-90 transition-opacity`}
          >
            <Mail className="w-4 h-4 mr-2" />
            E-posta Ayarları
          </button>
          <button 
            onClick={() => setIsSettingsModalOpen(true)}
            className={`flex items-center px-4 py-2 ${currentTheme.accent} rounded-lg hover:opacity-90 transition-opacity`}
          >
            <Settings className="w-4 h-4 mr-2" />
            Ayarlar
          </button>
        </div>
      </div>

      {/* Sabit Konsol - Sol Üst */}
      <div className={`fixed top-24 left-6 w-[380px] ${currentTheme.bg} rounded-lg shadow-lg border ${currentTheme.border} transform rotate-180`}>
        <div className={`border-t ${currentTheme.border} p-4 transform rotate-180`}>
          <div className="flex justify-between items-center mb-4">
            <h2 className={`text-lg font-semibold ${currentTheme.text}`}>Öğretmen Konsolu</h2>
            <div className="flex items-center space-x-2">
              {aiLoading && (
                <div className="animate-pulse text-blue-500">
                  <Brain className="w-4 h-4" />
                </div>
              )}
              <button
                onClick={() => setIsPreview(!isPreview)}
                className={`text-sm ${currentTheme.accent}`}
              >
                {isPreview ? 'Kodu Göster' : 'Önizlemeyi Göster'}
              </button>
            </div>
          </div>
          <div className="flex space-x-2">
            <input
              type="text"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              placeholder="Soru sorun veya komut girin..."
              className={`flex-1 px-3 py-2 border ${currentTheme.border} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${currentTheme.bg} ${currentTheme.text}`}
              onKeyPress={(e) => e.key === 'Enter' && handleCommand()}
            />
            <button
              onClick={handleCommand}
              disabled={aiLoading}
              className={`px-4 py-2 ${currentTheme.accent} rounded-lg flex items-center ${
                aiLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <Play className="w-4 h-4 mr-2" />
              Gönder
            </button>
          </div>
        </div>
        <div className="p-4 transform rotate-180">
          <div className={`h-[500px] ${isPreview ? currentTheme.bg : currentTheme.monitorBg} rounded-lg overflow-auto`}>
            {isPreview ? (
              <div className="p-4 space-y-4">
                {activityLogs.map((log, index) => (
                  <div
                    key={index}
                    className={`text-sm ${currentTheme.text} py-1 ${
                      log.startsWith('$') ? 'font-bold' : ''
                    }`}
                  >
                    {log}
                  </div>
                ))}
              </div>
            ) : (
              <pre className={`p-4 ${currentTheme.text} font-mono text-sm`}>
                {code}
              </pre>
            )}
          </div>
        </div>
      </div>

      {/* Ana İçerik - Öğretim Monitörü */}
      <div className="flex justify-end mb-24">
        <div className={`w-[850px] ${currentTheme.bg} rounded-lg shadow p-6 mb-6`}>
          <div className="flex justify-between items-center mb-4">
            <h2 className={`text-lg font-semibold ${currentTheme.text}`}>Öğretim Monitörü</h2>
            <div className={`px-3 py-1 rounded-full text-sm ${currentTheme.accent}`}>
              Aktif
            </div>
          </div>
          <div className={`${currentTheme.monitorBg} rounded-lg p-4 h-64`}>
            <div className="grid grid-cols-2 gap-4 h-full">
              <div className={`${currentTheme.accent} p-4 rounded-lg`}>
                <h3 className="font-semibold text-sm mb-2">Mevcut Görev</h3>
                <p className="text-sm mb-4">{botStatus.task}</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${botStatus.progress}%` }}></div>
                </div>
                <p className="text-sm mt-2">%{Math.round(botStatus.progress)} Tamamlandı</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className={`${currentTheme.accent} p-4 rounded-lg`}>
                  <h3 className="font-semibold text-sm">Aktif Öğrenciler</h3>
                  <p className="text-2xl font-bold mt-2">{botStatus.activeStudents}</p>
                </div>
                <div className={`${currentTheme.accent} p-4 rounded-lg`}>
                  <h3 className="font-semibold text-sm">Tamamlanan Görevler</h3>
                  <p className="text-2xl font-bold mt-2">{botStatus.completedTasks}</p>
                </div>
                <div className={`${currentTheme.accent} p-4 rounded-lg col-span-2`}>
                  <h3 className="font-semibold text-sm">Öğretim Analizi</h3>
                  <p className="text-sm mt-2">Öğrenme kalıpları analiz ediliyor ve optimizasyonlar oluşturuluyor...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <EmailConfigModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
      />

      <BotSettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        botName="Öğretmen Bot"
      />

      <ScheduleModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        schedules={schedules}
        onSave={setSchedules}
      />

      {/* Alt Sağ Paneller */}
      <div className="fixed bottom-6 right-6 flex space-x-4">
        {/* Öğretim Metrikleri */}
        <div className={`w-64 ${currentTheme.bg} rounded-lg shadow-lg border ${currentTheme.border}`}>
          <div className="p-4">
            <h2 className={`text-lg font-semibold mb-4 ${currentTheme.text}`}>Öğretim Metrikleri</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className={currentTheme.text}>Öğretim Kalitesi</span>
                <span className={currentTheme.accent}>%98</span>
              </div>
              <div className="flex justify-between items-center">
                <span className={currentTheme.text}>Öğrenci Başarısı</span>
                <span className={currentTheme.accent}>%85</span>
              </div>
              <div className="flex justify-between items-center">
                <span className={currentTheme.text}>Katılım Oranı</span>
                <span className={currentTheme.accent}>%92</span>
              </div>
            </div>
          </div>
        </div>

        {/* Program */}
        <div className={`w-64 ${currentTheme.bg} rounded-lg shadow-lg border ${currentTheme.border}`}>
          <div className="p-4">
            <h2 className={`text-lg font-semibold mb-4 ${currentTheme.text}`}>Program</h2>
            <div className="space-y-4">
              {schedules.map((schedule) => (
                <div key={schedule.id} className={`flex items-center ${currentTheme.text}`}>
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{schedule.task}: {schedule.time}</span>
                </div>
              ))}
              <button
                onClick={() => setIsScheduleModalOpen(true)}
                className={`w-full mt-2 px-4 py-2 ${currentTheme.accent} rounded-lg hover:opacity-90 transition-opacity`}
              >
                Programı Düzenle
              </button>
            </div>
          </div>
        </div>

        {/* Aktivite Günlüğü */}
        <div className={`w-80 ${currentTheme.bg} rounded-lg shadow-lg border ${currentTheme.border}`}>
          <div className={`flex items-center justify-between p-2 border-b ${currentTheme.border} ${currentTheme.monitorBg} rounded-t-lg`}>
            <div className="flex items-center">
              <MessageSquare className={`w-4 h-4 mr-2 ${currentTheme.text}`} />
              <h3 className={`font-semibold ${currentTheme.text} text-sm`}>Aktivite Günlüğü</h3>
            </div>
            <span className={`text-xs ${currentTheme.text}`}>Gerçek Zamanlı</span>
          </div>
          <div className="h-40 overflow-auto p-2">
            {activityLogs.map((log, index) => (
              <div key={index} className={`text-xs py-1 ${currentTheme.text} border-b ${currentTheme.border} last:border-0`}>
                {log}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherBot;