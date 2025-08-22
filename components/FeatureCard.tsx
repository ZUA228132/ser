import React from 'react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, children }) => {
  return (
    <div className="group relative p-6 rounded-2xl overflow-hidden bg-brand-gray/60 backdrop-blur-lg border border-white/10 transition-all duration-300 hover:scale-[1.03] hover:border-brand-accent-light/30">
      
      {/* Neon Glow Effect */}
      <div className="absolute inset-0 bg-brand-accent opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl blur-xl"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-center w-14 h-14 rounded-full bg-brand-dark border border-white/10 mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
        <p className="text-gray-400">{children}</p>
      </div>
    </div>
  );
};

export default FeatureCard;