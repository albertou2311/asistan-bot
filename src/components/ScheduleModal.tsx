import React, { useState } from 'react';
import { X, Plus, Trash } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  schedules: ScheduleItem[];
  onSave: (schedules: ScheduleItem[]) => void;
}

export interface ScheduleItem {
  id: string;
  time: string;
  task: string;
}

const ScheduleModal = ({ isOpen, onClose, schedules, onSave }: ScheduleModalProps) => {
  const { theme, themeStyles } = useTheme();
  const { language, translations } = useLanguage();
  const currentTheme = themeStyles[theme];
  const t = translations[language];

  const [localSchedules, setLocalSchedules] = useState<ScheduleItem[]>(schedules);

  const addSchedule = () => {
    setLocalSchedules([
      ...localSchedules,
      { id: Math.random().toString(), time: '', task: '' }
    ]);
  };

  const removeSchedule = (id: string) => {
    setLocalSchedules(localSchedules.filter(schedule => schedule.id !== id));
  };

  const updateSchedule = (id: string, field: 'time' | 'task', value: string) => {
    setLocalSchedules(localSchedules.map(schedule => 
      schedule.id === id ? { ...schedule, [field]: value } : schedule
    ));
  };

  const handleSave = () => {
    onSave(localSchedules);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`${currentTheme.bg} rounded-lg shadow-xl w-full max-w-md p-6`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className={`text-lg font-semibold ${currentTheme.text}`}>{t.modifySchedule}</h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg hover:${currentTheme.accent}`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4 max-h-96 overflow-y-auto">
          {localSchedules.map((schedule) => (
            <div key={schedule.id} className="flex items-center space-x-2">
              <input
                type="time"
                value={schedule.time}
                onChange={(e) => updateSchedule(schedule.id, 'time', e.target.value)}
                className={`px-3 py-2 rounded-lg border ${currentTheme.border} ${currentTheme.bg} ${currentTheme.text}`}
              />
              <input
                type="text"
                value={schedule.task}
                onChange={(e) => updateSchedule(schedule.id, 'task', e.target.value)}
                placeholder={t.taskName}
                className={`flex-1 px-3 py-2 rounded-lg border ${currentTheme.border} ${currentTheme.bg} ${currentTheme.text}`}
              />
              <button
                onClick={() => removeSchedule(schedule.id)}
                className="p-2 text-red-500 hover:bg-red-100 rounded-lg"
              >
                <Trash className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-4 flex justify-between">
          <button
            onClick={addSchedule}
            className={`flex items-center px-4 py-2 ${currentTheme.accent} rounded-lg`}
          >
            <Plus className="w-4 h-4 mr-2" />
            {t.addTask}
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {t.save}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScheduleModal;