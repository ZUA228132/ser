import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Lock, Fingerprint, Zap, Download, Users, ShieldOff } from 'lucide-react';

import PhoneMockup from '../components/PhoneMockup';
import AnimatedElement from '../components/AnimatedElement';
import FeatureCard from '../components/FeatureCard';
import StatCounter from '../components/StatCounter';

const AnimatedTitle: React.FC<{ text: string; coloredText: string }> = ({ text, coloredText }) => {
  return (
    <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-4 tracking-tighter">
      {text.split(' ').map((word, index) => (
         <span key={index} className="inline-block overflow-hidden">
            <span className="inline-block animate-text-reveal" style={{ animationDelay: `${index * 100}ms`}}>{word}&nbsp;</span>
         </span>
      ))}
      <span className="inline-block overflow-hidden">
        <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-brand-accent-light to-brand-cyan animate-text-reveal" style={{ animationDelay: `${text.split(' ').length * 100}ms`}}>
            {coloredText}
        </span>
      </span>
    </h1>
  );
};


const HomePage: React.FC = () => {
  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative pt-20 pb-10 md:pt-32 md:pb-20 text-center">
         <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-brand-dark/80 to-brand-dark z-0"></div>
         <div className="absolute -top-1/4 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(106,13,173,0.3),_transparent_40%)] z-0 opacity-50"></div>
        <div className="container mx-auto px-6 relative z-10">
          <AnimatedElement className="max-w-4xl mx-auto">
            <AnimatedTitle text="Shado:" coloredText="Приватність, на яку ви заслуговуєте." />
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Надійний. Захищений. Анонімний. Спілкуйтеся без компромісів у світі, де ваша конфіденційність під загрозою.
            </p>
            <Link 
              to="/download" 
              className="inline-block bg-[length:200%_auto] bg-gradient-to-r from-brand-accent via-brand-accent-light to-brand-accent text-white font-bold py-4 px-10 rounded-lg shadow-lg hover:shadow-brand-accent-light/50 transition-all duration-300 hover:animate-background-pan transform hover:scale-105 text-lg"
            >
              <div className="flex items-center gap-2">
                <Download size={22} />
                <span>Завантажити для Android</span>
              </div>
            </Link>
          </AnimatedElement>
          <AnimatedElement className="mt-16 md:mt-24">
            <PhoneMockup />
          </AnimatedElement>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 md:py-32">
        <div className="container mx-auto px-6">
          <AnimatedElement className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Безпека нового рівня</h2>
            <p className="text-gray-400 text-lg">
              Ми розробили Shado з нуля, щоб забезпечити максимальний рівень захисту ваших розмов. Ваша приватність - наш головний пріоритет.
            </p>
          </AnimatedElement>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard icon={<Lock size={28} className="text-brand-accent-light" />} title="Наскрізне шифрування">
                Кожне повідомлення, дзвінок та файл шифруються на вашому пристрої та розшифровуються лише на пристрої отримувача.
              </FeatureCard>
              <FeatureCard icon={<Fingerprint size={28} className="text-brand-accent-light" />} title="Повна анонімність">
                Для реєстрації не потрібен номер телефону. Можна вказати будь-яку пошту, вона не потребує підтвердження.
              </FeatureCard>
              <FeatureCard icon={<Zap size={28} className="text-brand-accent-light" />} title="Повідомлення, що зникають">
                Встановлюйте таймер самознищення для повідомлень, щоб не залишати цифрових слідів вашої розмови.
              </FeatureCard>
          </div>
        </div>
      </section>

       {/* Stats Section */}
       <section className="py-20">
        <div className="container mx-auto px-6">
            <AnimatedElement className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
                <div className="bg-brand-gray/50 border border-white/10 p-8 rounded-2xl">
                    <Users className="w-12 h-12 text-brand-accent-light mx-auto mb-4"/>
                    <h3 className="text-4xl md:text-5xl font-bold text-white">
                        <StatCounter end={500000} />+
                    </h3>
                    <p className="text-gray-400 mt-2">Анонімних акаунтів</p>
                </div>
                <div className="bg-brand-gray/50 border border-white/10 p-8 rounded-2xl">
                    <ShieldOff className="w-12 h-12 text-brand-cyan mx-auto mb-4"/>
                    <h3 className="text-4xl md:text-5xl font-bold text-white">
                         <StatCounter end={0} duration={1} />
                    </h3>
                    <p className="text-gray-400 mt-2">Витоків даних</p>
                </div>
            </AnimatedElement>
        </div>
      </section>


      {/* Testimonial Section */}
      <section className="py-20 md:py-32 bg-brand-dark/50">
        <div className="container mx-auto px-6">
          <AnimatedElement className="max-w-4xl mx-auto text-center">
            <ShieldCheck className="w-16 h-16 text-brand-accent-light mx-auto mb-6" />
            <blockquote className="text-2xl md:text-3xl font-medium text-white italic leading-relaxed">
              "У нашій справі зв'язок — це життя. Shado гарантує, що він залишиться конфіденційним. Цим додатком користуються навіть військові для безпечної комунікації."
            </blockquote>
            <p className="mt-6 text-lg text-gray-400 font-semibold">— Фахівець з кібербезпеки</p>
          </AnimatedElement>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-6 text-center">
          <AnimatedElement>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Готові до безпечного спілкування?</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
              Приєднуйтесь до спільноти, яка цінує приватність. Завантажте Shado сьогодні та контролюйте свої дані.
            </p>
            <Link 
              to="/download" 
              className="inline-block bg-[length:200%_auto] bg-gradient-to-r from-brand-accent via-brand-accent-light to-brand-accent text-white font-bold py-4 px-10 rounded-lg shadow-lg hover:shadow-brand-accent-light/50 transition-all duration-300 hover:animate-background-pan transform hover:scale-105 text-lg"
            >
               <div className="flex items-center gap-2">
                <ShieldCheck size={22} />
                <span>Отримати захист</span>
              </div>
            </Link>
          </AnimatedElement>
        </div>
      </section>
    </div>
  );
};

export default HomePage;