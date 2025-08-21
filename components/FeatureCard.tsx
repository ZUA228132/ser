import React from 'react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, children }) => {
  return (
    <div className="group relative p-6 rounded-2xl overflow-hidden bg-white/5 backdrop-blur-lg border border-white/10 transition-all duration-300 hover:border-brand-accent-light/50 hover:scale-105 hover:shadow-2xl hover:shadow-brand-accent-light/10">
      {/* Shine Effect */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-2xl">
          <span className="absolute w-1/2 h-[200%] bg-white/10 opacity-60 -top-1/2 left-0 transform -translate-x-full group-hover:animate-shine-effect"></span>
      </div>

      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(138,63,252,0.15),_transparent_40%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="relative z-10">
        <div className="flex items-center justify-center w-14 h-14 rounded-full bg-brand-dark border border-white/10 mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
        <p className="text-gray-400">{children}</p>
      </div>
    </div>
  );
};

export default FeatureCard;