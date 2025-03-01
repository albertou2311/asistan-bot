import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  GraduationCap, 
  Terminal, 
  Shield, 
  Code,
  Settings
} from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/teacher-bot', icon: GraduationCap, label: 'Teacher Bot' },
    { path: '/system-bot', icon: Terminal, label: 'System Bot' },
    { path: '/security-bot', icon: Shield, label: 'Security Bot' },
    { path: '/code-bot', icon: Code, label: 'Code Bot' },
    { path: '/settings', icon: Settings, label: 'Settings' }
  ];

  return (
    <div className="w-64 bg-white shadow-lg">
      <div className="p-4 border-b">
        <h1 className="text-xl font-bold">AI Bot Admin</h1>
      </div>
      <nav className="p-4">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-700 hover:bg-gray-50'
              }`
            }
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}

export default Sidebar;