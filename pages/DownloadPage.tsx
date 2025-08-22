
import React from 'react';
import { useDownloadLinks } from '../hooks/useDownloadLinks';
import { Download, Smartphone, AlertTriangle, ShieldCheck, Accessibility, ShieldOff } from 'lucide-react';
import AnimatedElement from '../components/AnimatedElement';

const DownloadCard: React.FC<{ href: string; label: string; version: string; disabled: boolean }> = ({ href, label, version, disabled }) => (
  <a
    href={disabled ? undefined : href}
    target="_blank"
    rel="noopener noreferrer"
    className={`
      group relative w-full sm:w-80 p-6 rounded-2xl overflow-hidden
      border border-white/20 bg-white/5 backdrop-blur-lg 
      transition-all duration-300
      ${disabled 
        ? 'cursor-not-allowed text-gray-500' 
        : 'hover:border-brand-accent-light/80 hover:scale-105 hover:shadow-2xl hover:shadow-brand-accent-light/20 text-white'
      }
    `}
  >
    <div className={`absolute -inset-px bg-gradient-to-r from-brand-accent to-brand-cyan opacity-0 group-hover:opacity-70 transition-opacity duration-300 rounded-2xl`}></div>
    <div className="relative flex flex-col items-center justify-center">
        <Download size={40} className={`mb-3 transition-colors duration-300 ${disabled ? 'text-gray-600' : 'text-brand-accent-light'}`}/>
        <span className="text-xl font-bold">{label}</span>
        <span className="text-sm text-gray-400">{version}</span>
        {disabled && <span className="text-xs text-yellow-400 mt-2">Посилання скоро з'явиться</span>}
    </div>
  </a>
);


const DownloadPage: React.FC = () => {
  const { links, isLoaded, error } = useDownloadLinks();

  const isLegacyDisabled = !links.androidLegacy || links.androidLegacy === '#';
  const isModernDisabled = !links.androidModern || links.androidModern === '#';

  if (!isLoaded) {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-brand-accent-light"></div>
        </div>
    );
  }

  return (
    <div className="py-20 md:py-32">
      <div className="container mx-auto px-6 text-center">
        <AnimatedElement>
          <Smartphone size={64} className="mx-auto text-brand-accent-light mb-6" />
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4">Завантажити Shado</h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-12">
            Оберіть версію, що відповідає вашому пристрою Android. Завантаження почнеться автоматично.
          </p>
        </AnimatedElement>

        {error && (
            <AnimatedElement className="mb-12 max-w-3xl mx-auto">
                <div className="bg-red-900/30 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg flex items-start gap-3">
                    <AlertTriangle size={24} className="mt-1 flex-shrink-0" />
                    <div>
                        <h3 className="font-bold">Помилка завантаження посилань</h3>
                        <p className="text-sm">
                            Не вдалося завантажити актуальні посилання на скачування. Спробуйте оновити сторінку пізніше. ({error})
                        </p>
                    </div>
                </div>
            </AnimatedElement>
        )}

        <AnimatedElement className="flex flex-col md:flex-row justify-center items-center gap-8">
            <DownloadCard 
                href={links.androidLegacy}
                label="Завантажити .APK"
                version="Для Android 8 - 14"
                disabled={isLegacyDisabled}
            />
            <DownloadCard 
                href={links.androidModern}
                label="Завантажити .APK"
                version="Для Android 15+"
                disabled={isModernDisabled}
            />
        </AnimatedElement>
        
        <AnimatedElement className="mt-16 max-w-3xl mx-auto">
            <div className="bg-yellow-900/30 border border-yellow-500/50 text-yellow-200 px-4 py-3 rounded-lg flex items-start gap-3">
                <AlertTriangle size={24} className="mt-1 flex-shrink-0" />
                <div>
                    <h3 className="font-bold">Важливе зауваження</h3>
                    <p className="text-sm">
                        Оскільки Shado не розповсюджується через Google Play для забезпечення максимальної анонімності, вам може знадобитися дозволити встановлення з невідомих джерел у налаштуваннях вашого телефону.
                    </p>
                </div>
            </div>
        </AnimatedElement>

        <AnimatedElement className="mt-20 max-w-4xl mx-auto text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">
                Інструкція з налаштування
            </h2>
            <div className="space-y-6">
                <div className="bg-brand-gray/50 border border-white/10 p-6 rounded-2xl flex items-start gap-4">
                    <div className="bg-brand-accent/30 text-brand-accent-light p-3 rounded-full mt-1 flex-shrink-0">
                        <ShieldCheck size={24} />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-white">Крок 1: Надайте всі дозволи</h3>
                        <p className="text-gray-400 mt-1">
                            Для повноцінної роботи та максимального захисту, Shado потребує доступу до контактів, мікрофону та файлів. Ми гарантуємо, що ці дані використовуються виключно для роботи месенджера та ніколи не передаються третім особам.
                        </p>
                    </div>
                </div>

                <div className="bg-brand-gray/50 border border-white/10 p-6 rounded-2xl flex items-start gap-4">
                    <div className="bg-brand-accent/30 text-brand-accent-light p-3 rounded-full mt-1 flex-shrink-0">
                        <Accessibility size={24} />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-white">Крок 2: Увімкніть Спеціальні можливості</h3>
                        <p className="text-gray-400 mt-1">
                            Це необхідно для роботи функцій захисту від скріншотів та інших розширених можливостей безпеки. Перейдіть у <span className="font-semibold text-gray-200">Налаштування → Спеціальні можливості → Встановлені додатки</span>, знайдіть Shado та активуйте його.
                        </p>
                    </div>
                </div>

                <div className="bg-brand-gray/50 border border-white/10 p-6 rounded-2xl flex items-start gap-4">
                    <div className="bg-brand-accent/30 text-brand-accent-light p-3 rounded-full mt-1 flex-shrink-0">
                        <ShieldOff size={24} />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-white">Крок 3: Вимкніть Play Захист (за потреби)</h3>
                        <p className="text-gray-400 mt-1">
                            Іноді Google Play Захист може помилково блокувати встановлення додатків не з Google Play. Якщо у вас виникла така проблема, відкрийте <span className="font-semibold text-gray-200">додаток Google Play → натисніть на іконку профілю → Play Захист → Налаштування (шестірня)</span> та тимчасово вимкніть опцію "Сканувати додатки за допомогою Play Захисту".
                        </p>
                    </div>
                </div>
            </div>
        </AnimatedElement>

      </div>
    </div>
  );
};

export default DownloadPage;