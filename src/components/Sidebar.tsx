import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  FolderOpen, 
  Pill, 
  Stethoscope, 
  PlusCircle, 
  MessageCircle, 
  LogOut,
  Diamond
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  to: string;
  active?: boolean;
}

const NavItem = ({ icon: Icon, label, to, active }: NavItemProps) => (
  <Link
    to={to}
    className={cn(
      "flex items-center gap-4 w-full px-4 py-3 rounded-lg transition-all duration-200 group",
      active 
        ? "bg-surface-container text-primary font-bold border-l-4 border-inverse-primary" 
        : "text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface"
    )}
  >
    <Icon size={20} className={cn(active ? "text-primary" : "text-on-surface-variant group-hover:text-on-surface")} />
    <span className="text-sm font-medium">{label}</span>
  </Link>
);

interface SidebarProps {
  onNewPatient: () => void;
}

export const Sidebar = ({ onNewPatient }: SidebarProps) => {
  const location = useLocation();

  return (
    <aside className="h-screen w-72 fixed left-0 top-0 bg-surface-container-lowest flex flex-col py-10 px-6 z-50">
      <div className="mb-12 px-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 obsidian-gradient rounded-lg flex items-center justify-center shadow-lg shadow-inverse-primary/20">
            <Diamond className="text-on-primary" size={24} />
          </div>
          <div>
            <h1 className="font-headline font-black text-on-surface text-lg leading-tight">LuMe Clinic</h1>
            <p className="text-[10px] uppercase tracking-[0.2em] text-on-surface-variant font-bold">Private Atelier</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        <NavItem icon={LayoutDashboard} label="Dashboard" to="/" active={location.pathname === '/'} />
        <NavItem icon={Users} label="Patients" to="/patients" active={location.pathname === '/patients'} />
        <NavItem icon={Calendar} label="Calendar" to="/calendar" active={location.pathname === '/calendar'} />
        <NavItem icon={FolderOpen} label="Medical Records" to="/records" active={location.pathname === '/records'} />
        <NavItem icon={Pill} label="Prescriptions" to="/prescriptions" active={location.pathname === '/prescriptions'} />
        <NavItem icon={Stethoscope} label="Staff" to="/staff" active={location.pathname === '/staff'} />
        <NavItem icon={MessageCircle} label="Communications" to="/communications" active={location.pathname === '/communications'} />
      </nav>

      <div className="mt-auto pt-6 space-y-1">
        <button 
          onClick={onNewPatient}
          className="w-full mb-6 py-3 px-4 obsidian-gradient text-on-primary font-bold rounded-lg text-sm flex items-center justify-center gap-2 active:scale-95 transition-all duration-200 shadow-lg shadow-inverse-primary/20"
        >
          <PlusCircle size={18} />
          New Patient
        </button>
        <NavItem icon={LogOut} label="Logout" to="/logout" />
      </div>
    </aside>
  );
};
