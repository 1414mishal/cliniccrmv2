import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { NewPatientModal } from './NewPatientModal';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-on-surface">
      <Sidebar onNewPatient={() => setIsModalOpen(true)} />
      <main className="ml-72 min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 overflow-y-auto no-scrollbar">
          {children}
        </div>
      </main>
      <NewPatientModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={() => {
          // Trigger a refresh if needed, or just show a toast
          window.dispatchEvent(new CustomEvent('patient-added'));
        }}
      />
    </div>
  );
};
