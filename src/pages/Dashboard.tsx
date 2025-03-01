import React, { useState, useEffect } from 'react';
import { Brain, Shield, Cpu, Code2, Mail, Clock, Package, Plus, Trash2, HardDrive, Send, MessageSquare } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import EmailConfigModal from '../components/EmailConfigModal';
import AddLibraryModal from '../components/AddLibraryModal';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

interface Course {
  id: string;
  name: string;
  link: string;
}

interface ActivityItem {
  id: string;
  bot: string;
  action: string;
  timestamp: Date;
  icon: keyof typeof botIcons;
  course?: Course;
}

const Dashboard = () => {
  const { theme, themeStyles } = useTheme();
  const currentTheme = themeStyles[theme];
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isAddLibraryModalOpen, setIsAddLibraryModalOpen] = useState(false);
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const navigate = useNavigate();

  const [libraries, setLibraries] = useState([
    { id: '1', name: '@supabase/supabase-js', version: '2.39.7' },
    { id: '2', name: 'react-router-dom', version: '6.22.2' },
    { id: '3', name: 'lucide-react', version: '0.344.0' }
  ]);

  const [diskUsage, setDiskUsage] = useState({
    total: 2048, // 2TB in GB
    used: 1342, // GB
    categories: [
      { name: 'Sistem', size: 256, color: 'bg-blue-500' },
      { name: 'Kurslar', size: 512, color: 'bg-green-500' },
      { name: 'Medya', size: 384, color: 'bg-purple-500' },
      { name: 'Yedekler', size: 190, color: 'bg-orange-500' }
    ]
  });

  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { id: 1, text: 'Merhaba! Size nasıl yardımcı olabilirim?', isBot: true },
    { id: 2, text: 'Sistem durumu hakkında bilgi almak istiyorum.', isBot: false },
    { id: 3, text: 'Tüm sistemler normal çalışıyor. CPU kullanımı %32, bellek kullanımı optimal seviyede.', isBot: true }
  ]);

  const courses: Course[] = [
    { id: '1', name: 'React Temelleri', link: '/courses/react-basics' },
    { id: '2', name: 'JavaScript İleri Seviye', link: '/courses/advanced-js' },
    { id: '3', name: 'TypeScript Masterclass', link: '/courses/typescript' },
    { id: '4', name: 'Node.js ve Express', link: '/courses/nodejs' },
    { id: '5', name: 'Web Güvenliği', link: '/courses/web-security' },
    { id: '6', name: 'Docker Konteynerizasyon', link: '/courses/docker' },
    { id: '7', name: 'AWS Cloud Computing', link: '/courses/aws' },
    { id: '8', name: 'Python Veri Analizi', link: '/courses/python-data' }
  ];

  const systemCourses: Course[] = [
    { id: 's1', name: 'Linux Sistem Yönetimi', link: '/courses/linux-admin' },
    { id: 's2', name: 'Docker Orchestration', link: '/courses/docker-orch' },
    { id: 's3', name: 'Kubernetes Deployment', link: '/courses/k8s' },
    { id: 's4', name: 'CI/CD Pipeline', link: '/courses/cicd' }
  ];

  const securityCourses: Course[] = [
    { id: 'sec1', name: 'Siber Güvenlik Temelleri', link: '/courses/cyber-basics' },
    { id: 'sec2', name: 'Ağ Güvenliği', link: '/courses/network-security' },
    { id: 'sec3', name: 'Penetrasyon Testi', link: '/courses/pentest' },
    { id: 'sec4', name: 'Güvenli Kod Geliştirme', link: '/courses/secure-coding' }
  ];

  const codingCourses: Course[] = [
    { id: 'c1', name: 'Clean Code Pratikleri', link: '/courses/clean-code' },
    { id: 'c2', name: 'Tasarım Desenleri', link: '/courses/design-patterns' },
    { id: 'c3', name: 'Mikroservis Mimarisi', link: '/courses/microservices' },
    { id: 'c4', name: 'Test Driven Development', link: '/courses/tdd' }
  ];

  const botIcons = {
    'Teacher Bot': Brain,
    'System Bot': Cpu,
    'Security Bot': Shield,
    'Code Bot': Code2
  };

  const botStats = [
    {
      name: 'Teacher Bot',
      status: 'Active',
      tasks: 12,
      icon: Brain,
      color: 'bg-green-100 text-green-600',
      path: '/teacher-bot'
    },
    {
      name: 'System Bot',
      status: 'Active',
      tasks: 8,
      icon: Cpu,
      color: 'bg-blue-100 text-blue-600',
      path: '/system-bot'
    },
    {
      name: 'Security Bot',
      status: 'Active',
      tasks: 15,
      icon: Shield,
      color: 'bg-purple-100 text-purple-600',
      path: '/security-bot'
    },
    {
      name: 'Code Bot',
      status: 'Active',
      tasks: 10,
      icon: Code2,
      color: 'bg-orange-100 text-orange-600',
      path: '/code-bot'
    }
  ];

  const generateTeacherBotActivity = (): ActivityItem => {
    const course = courses[Math.floor(Math.random() * courses.length)];
    const actions = [
      `"${course.name}" kursunda öğrenci performansı analiz ediliyor`,
      `"${course.name}" için yeni öğretim materyalleri hazırlanıyor`,
      `"${course.name}" kursunda öğrenci sorularını yanıtlıyor`,
      `"${course.name}" müfredatı güncelleniyor`,
      `"${course.name}" için pratik alıştırmalar oluşturuluyor`
    ];
    return {
      id: Math.random().toString(),
      bot: 'Teacher Bot',
      action: actions[Math.floor(Math.random() * actions.length)],
      timestamp: new Date(),
      icon: 'Teacher Bot',
      course
    };
  };

  const generateSystemBotActivity = (): ActivityItem => {
    const course = systemCourses[Math.floor(Math.random() * systemCourses.length)];
    const actions = [
      `"${course.name}" sistem altyapısı optimize ediliyor`,
      `"${course.name}" için konteyner yapılandırması güncelleniyor`,
      `"${course.name}" deployment süreçleri iyileştiriliyor`,
      `"${course.name}" için otomasyon scriptleri hazırlanıyor`,
      `"${course.name}" sistem monitörleme araçları yapılandırılıyor`
    ];
    return {
      id: Math.random().toString(),
      bot: 'System Bot',
      action: actions[Math.floor(Math.random() * actions.length)],
      timestamp: new Date(),
      icon: 'System Bot',
      course
    };
  };

  const generateSecurityBotActivity = (): ActivityItem => {
    const course = securityCourses[Math.floor(Math.random() * securityCourses.length)];
    const actions = [
      `"${course.name}" güvenlik protokolleri güncelleniyor`,
      `"${course.name}" için güvenlik taraması yapılıyor`,
      `"${course.name}" güvenlik açıkları analiz ediliyor`,
      `"${course.name}" için güvenlik duvarı kuralları optimize ediliyor`,
      `"${course.name}" penetrasyon testi gerçekleştiriliyor`
    ];
    return {
      id: Math.random().toString(),
      bot: 'Security Bot',
      action: actions[Math.floor(Math.random() * actions.length)],
      timestamp: new Date(),
      icon: 'Security Bot',
      course
    };
  };

  const generateCodeBotActivity = (): ActivityItem => {
    const course = codingCourses[Math.floor(Math.random() * codingCourses.length)];
    const actions = [
      `"${course.name}" kod kalite analizi yapılıyor`,
      `"${course.name}" için refaktöring önerileri hazırlanıyor`,
      `"${course.name}" test senaryoları oluşturuluyor`,
      `"${course.name}" için kod optimizasyonu yapılıyor`,
      `"${course.name}" mimari desenler uygulanıyor`
    ];
    return {
      id: Math.random().toString(),
      bot: 'Code Bot',
      action: actions[Math.floor(Math.random() * actions.length)],
      timestamp: new Date(),
      icon: 'Code Bot',
      course
    };
  };

  const removeLibrary = (id: string) => {
    setLibraries(prev => prev.filter(lib => lib.id !== id));
  };

  const addLibrary = () => {
    setIsAddLibraryModalOpen(true);
  };

  const handleAddLibrary = (library: { name: string; version: string }) => {
    setLibraries(prev => [
      ...prev,
      { id: Math.random().toString(), name: library.name, version: library.version }
    ]);
  };

  const sendMessage = () => {
    if (!message.trim()) return;
    
    setChatMessages(prev => [...prev, { 
      id: Date.now(), 
      text: message, 
      isBot: false 
    }]);
    setMessage('');

    // Simulate bot response
    setTimeout(() => {
      setChatMessages(prev => [...prev, {
        id: Date.now(),
        text: 'Mesajınız alındı. En kısa sürede işleme alınacak.',
        isBot: true
      }]);
    }, 1000);
  };

  useEffect(() => {
    const initialActivities: ActivityItem[] = [
      generateTeacherBotActivity(),
      generateSecurityBotActivity(),
      generateSystemBotActivity(),
      generateCodeBotActivity()
    ];

    setActivities(initialActivities);

    const interval = setInterval(() => {
      const botGenerators = [
        generateTeacherBotActivity,
        generateSystemBotActivity,
        generateSecurityBotActivity,
        generateCodeBotActivity
      ];
      const newActivity = botGenerators[Math.floor(Math.random() * botGenerators.length)]();
      setActivities(prev => [newActivity, ...prev.slice(0, 3)]);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4">
      <h1 className={`text-2xl font-bold mb-4 ${currentTheme.text}`}>Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {botStats.map((bot) => (
          <button
            key={bot.name}
            onClick={() => navigate(bot.path)}
            className={`${currentTheme.bg} rounded-lg shadow p-4 transition-all duration-200 hover:shadow-lg hover:scale-105 text-left w-full`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2 rounded-lg ${currentTheme.accent}`}>
                <bot.icon size={20} />
              </div>
              <span className={`px-2 py-0.5 rounded-full text-sm ${
                bot.status === 'Active' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
              }`}>
                {bot.status}
              </span>
            </div>
            <h3 className={`text-base font-semibold ${currentTheme.text}`}>{bot.name}</h3>
            <p className={`text-sm ${currentTheme.text}`}>Active Tasks: {bot.tasks}</p>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-4">
        <div className={`col-span-5 ${currentTheme.bg} rounded-lg shadow`}>
          <div className="p-3 border-b border-gray-200">
            <h2 className={`text-lg font-semibold ${currentTheme.text}`}>Recent Activity</h2>
          </div>
          <div className="p-3">
            <div className="space-y-2">
              {activities.slice(0, 4).map((activity) => {
                const IconComponent = botIcons[activity.icon];
                return (
                  <div key={activity.id} className={`flex items-start space-x-2 p-2 rounded-lg ${currentTheme.monitorBg}`}>
                    <div className={`p-1.5 rounded-lg ${currentTheme.accent} flex-shrink-0`}>
                      <IconComponent size={14} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium ${currentTheme.text}`}>{activity.bot}</p>
                      <p className={`text-xs ${currentTheme.text}`}>
                        {activity.action}
                        {activity.course && (
                          <button 
                            onClick={() => navigate(activity.course!.link)}
                            className="ml-1 text-blue-500 hover:underline"
                          >
                            {activity.course.name}
                          </button>
                        )}
                      </p>
                      <div className="flex items-center mt-0.5">
                        <Clock className="w-3 h-3 mr-1" />
                        <p className="text-xs text-gray-500">
                          {format(activity.timestamp, 'HH:mm')}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className={`col-span-4 ${currentTheme.bg} rounded-lg shadow flex flex-col`}>
          <div className="flex items-center justify-between p-3 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <MessageSquare className="w-4 h-4" />
              <h2 className={`text-sm font-medium ${currentTheme.text}`}>Telegram Bot</h2>
            </div>
            <span className={`px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-600`}>Online</span>
          </div>
          <div className="flex-1 overflow-auto p-3 space-y-2">
            {chatMessages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[80%] rounded-lg px-3 py-2 ${
                  msg.isBot 
                    ? `${currentTheme.monitorBg} ${currentTheme.text}` 
                    : 'bg-blue-500 text-white'
                }`}>
                  <p className="text-sm">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 mt-auto border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Mesajınızı yazın..."
                className={`flex-1 px-3 py-2 rounded-lg border ${currentTheme.border} ${currentTheme.bg} ${currentTheme.text} text-sm`}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              />
              <button
                onClick={sendMessage}
                className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="col-span-3 space-y-4">
          <div className={`${currentTheme.bg} rounded-lg shadow`}>
            <div className="flex items-center justify-between p-3 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <h2 className={`text-sm font-medium ${currentTheme.text}`}>Email</h2>
              </div>
              <button
                onClick={() => setIsEmailModalOpen(true)}
                className={`text-xs px-2 py-1 ${currentTheme.accent} rounded hover:opacity-90 transition-opacity`}
              >
                Configure
              </button>
            </div>
            <div className="p-3">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className={currentTheme.text}>SMTP Status</span>
                <span className="text-green-600">Connected</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1">
                <div className="bg-blue-600 h-1 rounded-full" style={{ width: '10%' }}></div>
              </div>
            </div>
          </div>

          <div className={`${currentTheme.bg} rounded-lg shadow`}>
            <div className="flex items-center justify-between p-3 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <Package className="w-4 h-4" />
                <h2 className={`text-sm font-medium ${currentTheme.text}`}>Libraries</h2>
              </div>
              <button
                onClick={addLibrary}
                className={`text-xs px-2 py-1 ${currentTheme.accent} rounded hover:opacity-90 transition-opacity flex items-center`}
              >
                <Plus className="w-3 h-3 mr-1" />
                Add
              </button>
            </div>
            <div className="p-3 max-h-[200px] overflow-auto">
              <div className="space-y-2">
                {libraries.map((lib) => (
                  <div key={lib.id} className="flex items-center justify-between text-xs">
                    <div>
                      <span className={`font-medium ${currentTheme.text}`}>{lib.name}</span>
                      <span className="text-gray-500 ml-2">{lib.version}</span>
                    </div>
                    <button
                      onClick={() => removeLibrary(lib.id)}
                      className="text-red-500 hover:text-red-600 p-1"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={`${currentTheme.bg} rounded-lg shadow`}>
            <div className="flex items-center justify-between p-3 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <HardDrive className="w-4 h-4" />
                <h2 className={`text-sm font-medium ${currentTheme.text}`}>Disk Kullanımı</h2>
              </div>
              <span className={`text-xs ${currentTheme.text}`}>
                {diskUsage.used}/{diskUsage.total} GB
              </span>
            </div>
            <div className="p-3">
              <div className="mb-2">
                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                  {diskUsage.categories.map((category, index) => (
                    <div
                      key={category.name}
                      className={`h-full ${category.color}`}
                      style={{
                        width: `${(category.size / diskUsage.total) * 100}%`,
                        marginLeft: index === 0 ? '0' : `-2px`
                      }}
                    />
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                {diskUsage.categories.map(category => (
                  <div key={category.name} className="flex items-center justify-between text-xs">
                    <div className="flex items-center">
                      <div className={`w-2 h-2 rounded-full ${category.color} mr-2`} />
                      <span className={currentTheme.text}>{category.name}</span>
                    </div>
                    <span className={`${currentTheme.text}`}>{category.size} GB</span>
                  </div>
                ))}
                <div className="flex items-center justify-between text-xs pt-2 border-t border-gray-200">
                  <span className={currentTheme.text}>Kullanılabilir Alan</span>
                  <span className="text-green-600">{diskUsage.total - diskUsage.used} GB</span>
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

      <AddLibraryModal
        isOpen={isAddLibraryModalOpen}
        onClose={() => setIsAddLibraryModalOpen(false)}
        onAdd={handleAddLibrary}
      />
    </div>
  );
};

export default Dashboard;