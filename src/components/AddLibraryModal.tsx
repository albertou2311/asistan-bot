import React, { useState } from 'react';
import { X, Search, Package } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface AddLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (library: { name: string; version: string }) => void;
}

const popularLibraries = [
  { name: '@tanstack/react-query', version: '5.24.1', description: 'Güçlü veri yönetimi ve önbellek' },
  { name: 'axios', version: '1.6.7', description: 'HTTP istemcisi' },
  { name: 'date-fns', version: '3.3.1', description: 'Modern tarih işleme kütüphanesi' },
  { name: 'formik', version: '2.4.5', description: 'Form yönetimi' },
  { name: 'yup', version: '1.3.3', description: 'Form doğrulama şeması' },
  { name: 'react-hook-form', version: '7.50.1', description: 'Performanslı form yönetimi' },
  { name: 'zustand', version: '4.5.1', description: 'Basit durum yönetimi' },
  { name: 'jotai', version: '2.6.4', description: 'İlkel durum yönetimi' },
  { name: '@headlessui/react', version: '1.7.18', description: 'Erişilebilir UI bileşenleri' },
  { name: 'react-hot-toast', version: '2.4.1', description: 'Bildirim sistemi' },
  { name: 'react-icons', version: '5.0.1', description: 'Popüler ikon setleri' },
  { name: '@dnd-kit/core', version: '6.1.0', description: 'Sürükle ve bırak' },
  { name: 'react-intersection-observer', version: '9.8.1', description: 'Görünürlük izleme' },
  { name: 'framer-motion', version: '11.0.5', description: 'Animasyon kütüphanesi' },
  { name: 'react-use', version: '17.5.0', description: 'Faydalı React hooks' }
];

const AddLibraryModal = ({ isOpen, onClose, onAdd }: AddLibraryModalProps) => {
  const { theme, themeStyles } = useTheme();
  const currentTheme = themeStyles[theme];
  const [search, setSearch] = useState('');
  const [selectedLibrary, setSelectedLibrary] = useState<typeof popularLibraries[0] | null>(null);

  const filteredLibraries = popularLibraries.filter(lib => 
    lib.name.toLowerCase().includes(search.toLowerCase()) ||
    lib.description.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = () => {
    if (selectedLibrary) {
      onAdd(selectedLibrary);
      onClose();
      setSelectedLibrary(null);
      setSearch('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`${currentTheme.bg} rounded-lg shadow-xl w-full max-w-2xl p-6`}>
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Package className="w-5 h-5 mr-2" />
            <h2 className={`text-lg font-semibold ${currentTheme.text}`}>
              Kütüphane Ekle
            </h2>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg hover:${currentTheme.accent}`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Kütüphane ara..."
              className={`w-full pl-10 pr-4 py-2 rounded-lg border ${currentTheme.border} ${currentTheme.bg} ${currentTheme.text}`}
            />
          </div>
        </div>

        <div className={`max-h-[400px] overflow-auto ${currentTheme.monitorBg} rounded-lg p-2`}>
          {filteredLibraries.map((lib) => (
            <button
              key={lib.name}
              onClick={() => setSelectedLibrary(lib)}
              className={`w-full text-left p-4 rounded-lg mb-2 transition-colors ${
                selectedLibrary?.name === lib.name
                  ? currentTheme.accent
                  : `hover:${currentTheme.accent}`
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className={`font-medium ${currentTheme.text}`}>{lib.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{lib.description}</p>
                </div>
                <span className={`text-sm ${currentTheme.text}`}>{lib.version}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleAdd}
            disabled={!selectedLibrary}
            className={`px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            Ekle
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddLibraryModal;