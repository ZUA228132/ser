
import React, { useState, useEffect } from 'react';
import { useDownloadLinks } from '../hooks/useDownloadLinks';
import { ADMIN_PASSWORD } from '../constants';
import { LogIn, Save, Link, Smartphone, AlertCircle, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminPage: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const { links, setLinks, isLoaded } = useDownloadLinks();
  const [localLinks, setLocalLinks] = useState(links);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded) {
      setLocalLinks(links);
    }
  }, [isLoaded, links]);
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('Неправильний пароль');
    }
  };

  const handleSave = () => {
    setLinks(localLinks);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-brand-dark flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-brand-gray p-8 rounded-2xl shadow-2xl shadow-brand-accent/20 border border-brand-light-gray/20">
          <div className="text-center mb-8">
            <ShieldCheck className="mx-auto w-16 h-16 text-brand-accent-light" />
            <h1 className="text-3xl font-bold text-white mt-4">Панель адміністратора</h1>
            <p className="text-gray-400">Введіть пароль для доступу</p>
          </div>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="password" className="sr-only">Пароль</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-brand-light-gray/50 border-2 border-brand-light-gray rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-accent-light transition-colors"
              />
            </div>
            {error && <p className="text-red-500 text-sm mb-4 text-center flex items-center justify-center gap-2"><AlertCircle size={16} />{error}</p>}
            <button type="submit" className="w-full bg-gradient-to-r from-brand-accent to-brand-accent-light text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-brand-accent-light/50 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
              <LogIn size={20} />
              <span>Увійти</span>
            </button>
          </form>
           <button onClick={() => navigate('/')} className="w-full mt-4 text-gray-400 hover:text-white transition-colors">
                Повернутися на головну
           </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-dark flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-brand-gray p-8 rounded-2xl shadow-2xl shadow-brand-accent/20 border border-brand-light-gray/20">
        <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white">Керування посиланнями</h1>
            <p className="text-gray-400">Оновіть посилання на завантаження .APK файлів</p>
        </div>
        
        <div className="space-y-6">
          <div>
            <label htmlFor="androidLegacy" className="block text-gray-300 font-semibold mb-2 flex items-center gap-2">
              <Smartphone size={18} />
              <span>Android 8-14</span>
            </label>
            <div className="relative">
              <Link size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                id="androidLegacy"
                type="url"
                value={localLinks.androidLegacy}
                onChange={(e) => setLocalLinks({ ...localLinks, androidLegacy: e.target.value })}
                placeholder="https://example.com/shado-legacy.apk"
                className="w-full bg-brand-light-gray/50 border-2 border-brand-light-gray rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-brand-accent-light transition-colors"
              />
            </div>
          </div>

          <div>
            <label htmlFor="androidModern" className="block text-gray-300 font-semibold mb-2 flex items-center gap-2">
              <Smartphone size={18} />
              <span>Android 15+</span>
            </label>
             <div className="relative">
              <Link size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                id="androidModern"
                type="url"
                value={localLinks.androidModern}
                onChange={(e) => setLocalLinks({ ...localLinks, androidModern: e.target.value })}
                placeholder="https://example.com/shado-modern.apk"
                className="w-full bg-brand-light-gray/50 border-2 border-brand-light-gray rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-brand-accent-light transition-colors"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <button onClick={handleSave} className="w-full bg-gradient-to-r from-brand-accent to-brand-accent-light text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-brand-accent-light/50 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
            <Save size={20} />
            <span>Зберегти зміни</span>
          </button>
           <button onClick={() => navigate('/')} className="w-full bg-brand-light-gray text-gray-300 font-bold py-3 px-6 rounded-lg hover:bg-brand-light-gray/70 transition-colors">
                Повернутися на сайт
           </button>
        </div>
        {showSuccess && <p className="text-green-400 mt-4 text-center">Посилання успішно оновлено!</p>}
      </div>
    </div>
  );
};

export default AdminPage;
