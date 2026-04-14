import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { 
  TrendingUp, 
  Users, 
  CalendarCheck, 
  ChevronLeft, 
  ChevronRight,
  Activity,
  AlertCircle,
  FlaskConical,
  UserPlus,
  FileText
} from 'lucide-react';
import { Stats, ActivityItem, Appointment } from '../types';
import { cn } from '../lib/utils';

export const Dashboard = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    fetch('/api/stats').then(res => res.json()).then(setStats);
    fetch('/api/activity').then(res => res.json()).then(setActivities);
    fetch('/api/appointments').then(res => res.json()).then(setAppointments);
  }, []);

  if (!stats) return null;

  return (
    <div className="p-10 space-y-10 max-w-7xl mx-auto">
      {/* Greeting */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl"
      >
        <h3 className="font-headline text-5xl font-extrabold text-on-surface tracking-tighter mb-2">
          Welcome back, Director.
        </h3>
        <p className="text-on-surface-variant text-lg font-light">
          The clinic is operating at <span className="text-primary font-medium">{stats.occupancy}% capacity</span> today. 
          You have <span className="text-primary font-medium">3 priority consultations</span> pending.
        </p>
      </motion.section>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="md:col-span-2 bg-surface-container-high rounded-xl p-8 flex flex-col justify-between group transition-all duration-300"
        >
          <div className="flex justify-between items-start">
            <TrendingUp className="text-primary" size={32} />
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary">+{stats.revenueGrowth}% MONTHLY</span>
          </div>
          <div>
            <p className="text-on-surface-variant text-sm font-medium mb-1">Total Revenue</p>
            <h4 className="font-headline text-4xl font-bold text-on-surface tracking-tight">
              ${stats.revenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </h4>
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-surface-container-high rounded-xl p-8 flex flex-col justify-between transition-all duration-300"
        >
          <div className="flex justify-between items-start">
            <Users className="text-on-surface-variant" size={24} />
            <div className="w-2 h-2 rounded-full bg-inverse-primary animate-pulse"></div>
          </div>
          <div>
            <p className="text-on-surface-variant text-sm font-medium mb-1">Active Patients</p>
            <h4 className="font-headline text-4xl font-bold text-on-surface tracking-tight">{stats.activePatients}</h4>
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-surface-container-high rounded-xl p-8 flex flex-col justify-between transition-all duration-300"
        >
          <div className="flex justify-between items-start">
            <CalendarCheck className="text-on-surface-variant" size={24} />
          </div>
          <div>
            <p className="text-on-surface-variant text-sm font-medium mb-1">Occupancy</p>
            <h4 className="font-headline text-4xl font-bold text-on-surface tracking-tight">{stats.occupancy}%</h4>
          </div>
        </motion.div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Column: Calendar & Schedule */}
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-surface-container-low rounded-2xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h5 className="font-headline font-bold text-on-surface">June 2024</h5>
              <div className="flex gap-2">
                <button className="p-1 text-on-surface-variant hover:text-primary transition-colors"><ChevronLeft size={16} /></button>
                <button className="p-1 text-on-surface-variant hover:text-primary transition-colors"><ChevronRight size={16} /></button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-2 text-center text-[10px] font-bold text-on-surface-variant/40 mb-4">
              <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
            </div>
            <div className="grid grid-cols-7 gap-2 text-center text-sm">
              {[26, 27, 28, 29, 30, 31, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((day, i) => (
                <span 
                  key={i} 
                  className={cn(
                    "py-2 transition-all",
                    day === 12 ? "bg-inverse-primary text-white rounded-full font-bold" : "text-on-surface-variant hover:text-on-surface cursor-pointer",
                    i < 6 ? "opacity-20" : ""
                  )}
                >
                  {day}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center px-2">
              <h5 className="font-headline font-bold text-on-surface">Schedule</h5>
              <button className="text-primary text-xs font-medium hover:underline">View All</button>
            </div>
            <div className="space-y-3">
              {appointments.map((apt) => (
                <motion.div 
                  key={apt.id}
                  whileHover={{ x: 4 }}
                  className={cn(
                    "p-4 bg-surface-container-high rounded-xl border-l-2 cursor-pointer transition-all",
                    apt.type === 'CONCIERGE' ? "border-primary" : "border-on-surface-variant/20"
                  )}
                >
                  <p className={cn(
                    "text-[10px] font-bold mb-1",
                    apt.type === 'CONCIERGE' ? "text-primary" : "text-on-surface-variant"
                  )}>
                    {apt.time} — {apt.type}
                  </p>
                  <h6 className="text-sm font-semibold text-on-surface">Patient #{apt.patientId}</h6>
                  <p className="text-xs text-on-surface-variant">{apt.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Activity Feed */}
        <div className="lg:col-span-2 bg-surface-container rounded-2xl p-8">
          <div className="flex justify-between items-center mb-8">
            <h5 className="font-headline text-2xl font-bold text-on-surface">System Activity</h5>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-surface-container-highest rounded-full text-[10px] font-bold text-primary border border-primary/20">ALL UPDATES</span>
              <span className="px-3 py-1 text-[10px] font-bold text-on-surface-variant">ALERTS ONLY</span>
            </div>
          </div>
          <div className="space-y-8 relative">
            <div className="absolute left-4 top-0 bottom-0 w-[1px] bg-outline-variant/10"></div>
            {activities.map((item) => (
              <div key={item.id} className="relative pl-12 group">
                <div className={cn(
                  "absolute left-2.5 top-0 w-3 h-3 rounded-full border-4 border-background transition-all",
                  item.critical ? "bg-error ring-4 ring-error/10" : "bg-primary ring-4 ring-primary/5 group-hover:bg-inverse-primary"
                )}></div>
                <div className="flex justify-between items-start">
                  <div>
                    <p className={cn(
                      "text-sm font-semibold mb-1",
                      item.critical ? "text-error" : "text-on-surface"
                    )}>
                      {item.title}
                    </p>
                    <p className="text-xs text-on-surface-variant leading-relaxed max-w-md">{item.description}</p>
                  </div>
                  <span className="text-[10px] text-on-surface-variant/50 font-bold">{item.time}</span>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-12 py-3 text-xs font-bold text-on-surface-variant hover:text-on-surface transition-colors tracking-widest uppercase border-t border-outline-variant/10">
            View Full Audit Trail
          </button>
        </div>
      </div>

      {/* Live Vitals */}
      <section className="max-w-6xl space-y-6">
        <h5 className="font-headline font-bold text-on-surface">Live Clinical Vitals</h5>
        <div className="flex flex-wrap gap-4">
          <div className="bg-surface-container-high/40 px-4 py-2 rounded-full flex items-center gap-3 backdrop-blur-sm border border-outline-variant/5">
            <div className="w-2 h-2 rounded-full bg-primary"></div>
            <span className="text-xs font-medium text-on-surface-variant">Avg Wait: <span className="text-on-surface font-bold">{stats.avgWait} min</span></span>
          </div>
          <div className="bg-surface-container-high/40 px-4 py-2 rounded-full flex items-center gap-3 backdrop-blur-sm border border-outline-variant/5">
            <div className="w-2 h-2 rounded-full bg-primary"></div>
            <span className="text-xs font-medium text-on-surface-variant">Patient Satisfaction: <span className="text-on-surface font-bold">{stats.satisfaction}/5</span></span>
          </div>
          <div className="bg-surface-container-high/40 px-4 py-2 rounded-full flex items-center gap-3 backdrop-blur-sm border border-outline-variant/5">
            <div className="w-2 h-2 rounded-full bg-primary"></div>
            <span className="text-xs font-medium text-on-surface-variant">Active Suites: <span className="text-on-surface font-bold">{stats.activeSuites}</span></span>
          </div>
        </div>
      </section>
    </div>
  );
};
