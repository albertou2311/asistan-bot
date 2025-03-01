import React, { useState, useEffect } from 'react';
import { Terminal, Mail, Clock, Settings, MessageSquare, Play, MonitorPlay } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import ScheduleModal, { ScheduleItem } from '../components/ScheduleModal';
import EmailConfigModal from '../components/EmailConfigModal';
import BotSettingsModal from '../components/BotSettingsModal';

const SystemBot = () => {
  const { theme, themeStyles } = useTheme();
  const { language, translations } = useLanguage();
  const currentTheme = themeStyles[theme];
  const t = translations[language];

  const [activityLogs, setActivityLogs] = useState<string[]>([
    "System initialized...",
    "Monitoring system resources...",
    "Running diagnostics...",
    "All systems operational"
  ]);

  const [command, setCommand] = useState('');
  const [code, setCode] = useState('// System commands will appear here\n');
  const [isPreview, setIsPreview] = useState(true);
  const [isLiveView, setIsLiveView] = useState(false);
  const [schedules, setSchedules] = useState<ScheduleItem[]>([
    { id: '1', time: '00:00', task: 'System Scan' },
    { id: '2', time: '04:00', task: 'Backup' },
    { id: '3', time: '03:00', task: 'Maintenance' }
  ]);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [botStatus, setBotStatus] = useState({
    task: 'System Monitoring',
    progress: 65,
    activeProcesses: 8,
    completedTasks: 12
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const newActivity = `System check... ${new Date().toLocaleTimeString()}`;
      setActivityLogs(prev => [...prev.slice(-19), newActivity]);
      
      setBotStatus(prev => ({
        ...prev,
        progress: Math.min(100, prev.progress + Math.random() * 5),
        activeProcesses: Math.floor(6 + Math.random() * 5),
        completedTasks: prev.completedTasks + (Math.random() > 0.7 ? 1 : 0)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleCommand = () => {
    if (!command.trim()) return;
    setActivityLogs(prev => [...prev, `$ ${command}`]);
    setCommand('');
  };

  return (
    <div className="p-6 h-screen relative">
      <div className="flex justify-between items-center mb-6">
        <h1 className={`text-2xl font-bold ${currentTheme.text}`}>System Bot</h1>
        <div className="flex space-x-2">
          <button 
            onClick={() => setIsLiveView(!isLiveView)}
            className={`flex items-center px-4 py-2 ${
              isLiveView ? 'bg-red-100 text-red-600' : currentTheme.accent
            } rounded-lg hover:opacity-90 transition-opacity`}
          >
            <MonitorPlay className="w-4 h-4 mr-2" />
            {isLiveView ? 'Stop Live View' : 'Start Live View'}
          </button>
          <button 
            onClick={() => setIsEmailModalOpen(true)}
            className={`flex items-center px-4 py-2 ${currentTheme.accent} rounded-lg hover:opacity-90 transition-opacity`}
          >
            <Mail className="w-4 h-4 mr-2" />
            Configure Email
          </button>
          <button 
            onClick={() => setIsSettingsModalOpen(true)}
            className={`flex items-center px-4 py-2 ${currentTheme.accent} rounded-lg hover:opacity-90 transition-opacity`}
          >
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </button>
        </div>
      </div>

      {/* Fixed Console at Top Left */}
      <div className={`fixed top-24 left-6 w-[380px] ${currentTheme.bg} rounded-lg shadow-lg border ${currentTheme.border} transform rotate-180`}>
        <div className={`border-t ${currentTheme.border} p-4 transform rotate-180`}>
          <div className="flex justify-between items-center mb-4">
            <h2 className={`text-lg font-semibold ${currentTheme.text}`}>System Console</h2>
            <button
              onClick={() => setIsPreview(!isPreview)}
              className={`text-sm ${currentTheme.accent}`}
            >
              {isPreview ? 'Show Code' : 'Show Preview'}
            </button>
          </div>
          <div className="flex space-x-2">
            <input
              type="text"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              placeholder="Enter system command..."
              className={`flex-1 px-3 py-2 border ${currentTheme.border} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${currentTheme.bg} ${currentTheme.text}`}
              onKeyPress={(e) => e.key === 'Enter' && handleCommand()}
            />
            <button
              onClick={handleCommand}
              className={`px-4 py-2 ${currentTheme.accent} rounded-lg flex items-center`}
            >
              <Play className="w-4 h-4 mr-2" />
              Run
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
                    className={`text-sm ${currentTheme.text} py-1`}
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

      {/* Main Content - Live Monitor */}
      <div className="flex justify-end mb-24">
        <div className={`w-[850px] ${currentTheme.bg} rounded-lg shadow p-6 mb-6`}>
          <div className="flex justify-between items-center mb-4">
            <h2 className={`text-lg font-semibold ${currentTheme.text}`}>System Monitor</h2>
            <div className={`px-3 py-1 rounded-full text-sm ${currentTheme.accent}`}>
              Operational
            </div>
          </div>
          <div className={`${currentTheme.monitorBg} rounded-lg p-4 h-64 relative overflow-hidden`}>
            {isLiveView && (
              <div className="absolute top-2 right-2 px-2 py-1 bg-red-600 text-white text-xs rounded-full animate-pulse">
                LIVE
              </div>
            )}
            <div className="grid grid-cols-2 gap-4 h-full">
              <div className={`${currentTheme.accent} p-4 rounded-lg ${isLiveView ? 'animate-pulse' : ''}`}>
                <h3 className="font-semibold text-sm mb-2">Current Task</h3>
                <p className="text-sm mb-4">{botStatus.task}</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div 
                    className={`bg-blue-600 h-2.5 rounded-full ${isLiveView ? 'transition-all duration-1000' : ''}`} 
                    style={{ width: `${botStatus.progress}%` }}
                  ></div>
                </div>
                <p className="text-sm mt-2">{Math.round(botStatus.progress)}% Complete</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className={`${currentTheme.accent} p-4 rounded-lg ${isLiveView ? 'animate-pulse' : ''}`}>
                  <h3 className="font-semibold text-sm">Active Processes</h3>
                  <p className="text-2xl font-bold mt-2">{botStatus.activeProcesses}</p>
                </div>
                <div className={`${currentTheme.accent} p-4 rounded-lg ${isLiveView ? 'animate-pulse' : ''}`}>
                  <h3 className="font-semibold text-sm">Tasks Completed</h3>
                  <p className="text-2xl font-bold mt-2">{botStatus.completedTasks}</p>
                </div>
                <div className={`${currentTheme.accent} p-4 rounded-lg col-span-2 ${isLiveView ? 'animate-pulse' : ''}`}>
                  <h3 className="font-semibold text-sm">System Status</h3>
                  <p className="text-sm mt-2">All systems running at optimal performance...</p>
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
        botName="System Bot"
      />

      <ScheduleModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        schedules={schedules}
        onSave={setSchedules}
      />

      {/* Bottom Right Panels */}
      <div className="fixed bottom-6 right-6 flex space-x-4">
        {/* Performance Metrics */}
        <div className={`w-64 ${currentTheme.bg} rounded-lg shadow-lg border ${currentTheme.border}`}>
          <div className="p-4">
            <h2 className={`text-lg font-semibold mb-4 ${currentTheme.text}`}>System Metrics</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className={currentTheme.text}>CPU Load</span>
                <span className={currentTheme.accent}>32%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className={currentTheme.text}>Memory Usage</span>
                <span className={currentTheme.accent}>2.4GB</span>
              </div>
              <div className="flex justify-between items-center">
                <span className={currentTheme.text}>Disk I/O</span>
                <span className={currentTheme.accent}>156MB/s</span>
              </div>
            </div>
          </div>
        </div>

        {/* Schedule */}
        <div className={`w-64 ${currentTheme.bg} rounded-lg shadow-lg border ${currentTheme.border}`}>
          <div className="p-4">
            <h2 className={`text-lg font-semibold mb-4 ${currentTheme.text}`}>{t.schedule}</h2>
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
                {t.modifySchedule}
              </button>
            </div>
          </div>
        </div>

        {/* Activity Log */}
        <div className={`w-80 ${currentTheme.bg} rounded-lg shadow-lg border ${currentTheme.border}`}>
          <div className={`flex items-center justify-between p-2 border-b ${currentTheme.border} ${currentTheme.monitorBg} rounded-t-lg`}>
            <div className="flex items-center">
              <MessageSquare className={`w-4 h-4 mr-2 ${currentTheme.text}`} />
              <h3 className={`font-semibold ${currentTheme.text} text-sm`}>System Log</h3>
            </div>
            <span className={`text-xs ${currentTheme.text}`}>Real-time</span>
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

export default SystemBot;