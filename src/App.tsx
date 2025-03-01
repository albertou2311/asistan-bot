import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { LayoutDashboard, GraduationCap, Terminal, Shield, Code, Settings as SettingsIcon } from 'lucide-react';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { useTheme } from './context/ThemeContext';
import { useLanguage } from './context/LanguageContext';
import ThemeSelector from './components/ThemeSelector';
import LanguageSelector from './components/LanguageSelector';
import Dashboard from './pages/Dashboard';
import TeacherBot from './pages/TeacherBot';
import SystemBot from './pages/SystemBot';
import SecurityBot from './pages/SecurityBot';
import CodeBot from './pages/CodeBot';
import Settings from './pages/Settings';

const AppContent = () => {
  const { theme, themeStyles } = useTheme();
  const { language, translations } = useLanguage();
  const currentTheme = themeStyles[theme];
  const t = translations[language];

  const navItems = [
    { path: '/', icon: LayoutDashboard, label: t.dashboard },
    { path: '/teacher-bot', icon: GraduationCap, label: t.teacherBot },
    { path: '/system-bot', icon: Terminal, label: t.systemBot },
    { path: '/security-bot', icon: Shield, label: t.securityBot },
    { path: '/code-bot', icon: Code, label: t.codeBot },
    { path: '/settings', icon: SettingsIcon, label: t.settings }
  ];

  return (
    <div className={`flex flex-col h-screen ${currentTheme.bg} ${currentTheme.text}`}>
      <header className={`${currentTheme.bg} shadow-md`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center h-16">
            <h1 className={`text-xl font-bold ${currentTheme.text} mr-8`}>AI Bot Admin</h1>
            <nav className="flex space-x-1 flex-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 rounded-lg transition-colors ${
                      isActive
                        ? currentTheme.accent
                        : `${currentTheme.text} hover:${currentTheme.accent}`
                    }`
                  }
                >
                  <item.icon className="w-5 h-5 mr-2" />
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </nav>
            <div className="flex items-center space-x-4">
              <LanguageSelector />
              <ThemeSelector />
            </div>
          </div>
        </div>
      </header>

      <main className={`flex-1 overflow-auto ${currentTheme.monitorBg}`}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/teacher-bot" element={<TeacherBot />} />
          <Route path="/system-bot" element={<SystemBot />} />
          <Route path="/security-bot" element={<SecurityBot />} />
          <Route path="/code-bot" element={<CodeBot />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
    </div>
  );
};

function App() {
  return (
    <Router>
      <LanguageProvider>
        <ThemeProvider>
          <AppContent />
        </ThemeProvider>
      </LanguageProvider>
    </Router>
  );
}

export default App;