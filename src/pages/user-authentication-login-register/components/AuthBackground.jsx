import React from 'react';
import Icon from '../../../components/AppIcon';

const AuthBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5"></div>
      
      {/* Floating AI Icons */}
      <div className="absolute top-20 left-10 opacity-10">
        <Icon name="Brain" size={48} className="text-primary animate-pulse" />
      </div>
      <div className="absolute top-40 right-16 opacity-10">
        <Icon name="Zap" size={32} className="text-secondary animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      <div className="absolute bottom-32 left-20 opacity-10">
        <Icon name="Cpu" size={40} className="text-accent animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
      <div className="absolute bottom-20 right-10 opacity-10">
        <Icon name="Sparkles" size={36} className="text-primary animate-pulse" style={{ animationDelay: '0.5s' }} />
      </div>
      
      {/* Geometric Shapes */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-primary/10 rounded-full animate-spin" style={{ animationDuration: '20s' }}></div>
      <div className="absolute bottom-1/4 right-1/4 w-24 h-24 border border-secondary/10 rounded-lg rotate-45 animate-pulse"></div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-12 gap-4 h-full">
          {Array.from({ length: 144 }).map((_, i) => (
            <div key={i} className="border border-text-secondary/20"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthBackground;