import React from 'react';
import { Search, Bell, Settings } from 'lucide-react';

export const Header = () => {
  return (
    <header className="sticky top-0 w-full z-40 glass-nav flex justify-between items-center px-8 py-4 shadow-[0px_24px_48px_rgba(0,0,0,0.5)]">
      <div className="flex items-center gap-8">
        <h2 className="font-headline font-bold text-on-surface text-xl tracking-tight">Executive Overview</h2>
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" size={16} />
          <input 
            type="text" 
            placeholder="Search LuMe Clinic..." 
            className="bg-surface-container-lowest border-none rounded-full pl-10 pr-6 py-2 text-sm text-on-surface w-64 focus:ring-1 focus:ring-primary/40 placeholder:text-on-surface-variant/50 transition-all outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <button className="p-2 text-on-surface-variant hover:bg-surface-container-low rounded-full transition-colors relative">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-inverse-primary rounded-full ring-2 ring-background"></span>
          </button>
          <button className="p-2 text-on-surface-variant hover:bg-surface-container-low rounded-full transition-colors">
            <Settings size={20} />
          </button>
        </div>
        <div className="h-8 w-[1px] bg-outline-variant/20"></div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-xs font-bold text-on-surface">Dr. Julian Sterling</p>
            <p className="text-[10px] text-on-surface-variant">Chief Medical Officer</p>
          </div>
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-Z-2ECqD941pOTmtS308oUo3ms9SX9PEkEeW_EHN-wz6WuUokHH2kooxeaTDf6q18r5UrTe8C5Y1t4mrY8G9Hl-65TGckRw6A5OU_wWfA2CPj8sDn4r56LxpY-rr9fXGoLeeVrGr354XEdWf5BAhxynAjCmMYI0IBJx8ILwoV40-gctpjSYhv85s6Y_u1y1z4cqTi_S-fA2Hxze7I9k2CTC-2nwtqHzPNVWvrcBEBWpzKr-Z9rLjQexmrdi7iaJk_03Q6IHCjRR8" 
            alt="Dr. Julian Sterling" 
            className="w-10 h-10 rounded-full object-cover border border-primary/20"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </header>
  );
};
