import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { Calendar, FolderOpen, Pill, Stethoscope, HelpCircle, LogOut, Users, MessageCircle, Send } from 'lucide-react';
import { WhatsAppModal } from './components/WhatsAppModal';
import { Patient } from './types';

const Patients = () => {
  const [patients, setPatients] = React.useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = React.useState<Patient | null>(null);
  const [isWhatsAppOpen, setIsWhatsAppOpen] = React.useState(false);

  const fetchPatients = () => {
    fetch('/api/patients').then(res => res.json()).then(setPatients);
  };

  React.useEffect(() => {
    fetchPatients();
    window.addEventListener('patient-added', fetchPatients);
    return () => window.removeEventListener('patient-added', fetchPatients);
  }, []);

  return (
    <div className="p-10 space-y-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-end">
        <div>
          <h3 className="font-headline text-4xl font-extrabold tracking-tight">Patient Registry</h3>
          <p className="text-on-surface-variant mt-1">Manage and monitor high-net-worth patient records.</p>
        </div>
        <button className="px-6 py-2 bg-surface-container-high hover:bg-surface-container-highest text-primary font-bold rounded-lg transition-all border border-outline-variant/10">
          Export Records
        </button>
      </div>

      <div className="bg-surface-container rounded-2xl overflow-hidden border border-outline-variant/5">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-low/50">
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/60">Patient Name</th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/60">Condition</th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/60">Phone</th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/60">Last Visit</th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/60">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/5">
            {patients.map((p) => (
              <tr key={p.id} className="hover:bg-surface-container-high/30 transition-colors group">
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                      {p.name.charAt(0)}
                    </div>
                    <span className="font-semibold text-on-surface group-hover:text-primary transition-colors">{p.name}</span>
                  </div>
                </td>
                <td className="px-6 py-5 text-sm text-on-surface-variant">{p.condition}</td>
                <td className="px-6 py-5 text-sm text-on-surface-variant font-mono">{p.phone}</td>
                <td className="px-6 py-5 text-sm text-on-surface-variant">{p.lastVisit}</td>
                <td className="px-6 py-5">
                  <button 
                    onClick={() => {
                      setSelectedPatient(p);
                      setIsWhatsAppOpen(true);
                    }}
                    className="flex items-center gap-2 px-3 py-1.5 bg-green-600/10 text-green-500 hover:bg-green-600 hover:text-white text-[10px] font-bold rounded-lg uppercase tracking-tighter transition-all"
                  >
                    <MessageCircle size={12} />
                    Message
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <WhatsAppModal 
        isOpen={isWhatsAppOpen} 
        onClose={() => setIsWhatsAppOpen(false)} 
        patient={selectedPatient} 
      />
    </div>
  );
};

const Communications = () => (
  <div className="p-10 space-y-8 max-w-7xl mx-auto">
    <div className="flex justify-between items-end">
      <div>
        <h3 className="font-headline text-4xl font-extrabold tracking-tight">Communications Hub</h3>
        <p className="text-on-surface-variant mt-1">Automated WhatsApp messaging and template management.</p>
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-surface-container rounded-2xl p-8 border border-outline-variant/5">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
            <Send className="text-green-500" />
          </div>
          <div>
            <h4 className="font-bold text-lg">Message Templates</h4>
            <p className="text-xs text-on-surface-variant">Configure automated pre/post-op messages.</p>
          </div>
        </div>
        <div className="space-y-3">
          {['Pre-Op Instructions', 'Post-Op Follow-up', 'Prescription Ready'].map((t) => (
            <div key={t} className="p-4 bg-surface-container-high rounded-xl flex justify-between items-center">
              <span className="text-sm font-medium">{t}</span>
              <button className="text-[10px] font-bold text-primary uppercase">Edit</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const CalendarView = () => (
  <div className="p-10 space-y-8 max-w-7xl mx-auto">
    <div className="flex justify-between items-end">
      <div>
        <h3 className="font-headline text-4xl font-extrabold tracking-tight">Clinical Calendar</h3>
        <p className="text-on-surface-variant mt-1">Coordinate specialist schedules and suite availability.</p>
      </div>
    </div>
    <div className="bg-surface-container rounded-2xl p-12 border border-outline-variant/5 flex flex-col items-center justify-center min-h-[400px]">
      <Calendar size={48} className="text-on-surface-variant/20 mb-4" />
      <p className="text-on-surface-variant font-medium">Interactive calendar module is being initialized...</p>
    </div>
  </div>
);

const MedicalRecords = () => (
  <div className="p-10 space-y-8 max-w-7xl mx-auto">
    <div className="flex justify-between items-end">
      <div>
        <h3 className="font-headline text-4xl font-extrabold tracking-tight">Medical Records</h3>
        <p className="text-on-surface-variant mt-1">Secure, encrypted access to patient history and imaging.</p>
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[1, 2, 3].map(i => (
        <div key={i} className="bg-surface-container-high rounded-xl p-6 border border-outline-variant/5">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
            <FolderOpen size={20} />
          </div>
          <h4 className="font-bold text-on-surface mb-1">Archive Set #{i}04</h4>
          <p className="text-xs text-on-surface-variant">Last updated: 2 days ago</p>
        </div>
      ))}
    </div>
  </div>
);

const Prescriptions = () => (
  <div className="p-10 space-y-8 max-w-7xl mx-auto">
    <div className="flex justify-between items-end">
      <div>
        <h3 className="font-headline text-4xl font-extrabold tracking-tight">Prescriptions</h3>
        <p className="text-on-surface-variant mt-1">Digital script management and pharmacy coordination.</p>
      </div>
    </div>
    <div className="bg-surface-container rounded-2xl p-8 border border-outline-variant/5">
      <div className="flex items-center gap-4 p-4 bg-surface-container-high rounded-xl border-l-4 border-primary">
        <Pill className="text-primary" />
        <div>
          <p className="font-bold text-on-surface">Tier 3 Medication Sync</p>
          <p className="text-xs text-on-surface-variant">All active scripts are currently synchronized with Obsidian Pharmacy Hub.</p>
        </div>
      </div>
    </div>
  </div>
);

const Staff = () => (
  <div className="p-10 space-y-8 max-w-7xl mx-auto">
    <div className="flex justify-between items-end">
      <div>
        <h3 className="font-headline text-4xl font-extrabold tracking-tight">Staff Directory</h3>
        <p className="text-on-surface-variant mt-1">Manage specialist credentials and shift rotations.</p>
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-surface-container rounded-2xl p-6 border border-outline-variant/5 flex items-center gap-4">
        <img 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-Z-2ECqD941pOTmtS308oUo3ms9SX9PEkEeW_EHN-wz6WuUokHH2kooxeaTDf6q18r5UrTe8C5Y1t4mrY8G9Hl-65TGckRw6A5OU_wWfA2CPj8sDn4r56LxpY-rr9fXGoLeeVrGr354XEdWf5BAhxynAjCmMYI0IBJx8ILwoV40-gctpjSYhv85s6Y_u1y1z4cqTi_S-fA2Hxze7I9k2CTC-2nwtqHzPNVWvrcBEBWpzKr-Z9rLjQexmrdi7iaJk_03Q6IHCjRR8" 
          alt="Staff" 
          className="w-16 h-16 rounded-full object-cover grayscale"
          referrerPolicy="no-referrer"
        />
        <div>
          <h4 className="font-bold text-on-surface">Dr. Julian Sterling</h4>
          <p className="text-sm text-primary">Chief Medical Officer</p>
          <p className="text-xs text-on-surface-variant mt-1">On Call: Yes</p>
        </div>
      </div>
    </div>
  </div>
);

const Logout = () => (
  <div className="h-full flex items-center justify-center">
    <div className="text-center">
      <LogOut size={48} className="text-on-surface-variant/20 mx-auto mb-4" />
      <h4 className="text-xl font-bold mb-2">Securely Logging Out...</h4>
      <p className="text-on-surface-variant">Your session is being terminated. Please wait.</p>
    </div>
  </div>
);

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/calendar" element={<CalendarView />} />
          <Route path="/records" element={<MedicalRecords />} />
          <Route path="/prescriptions" element={<Prescriptions />} />
          <Route path="/staff" element={<Staff />} />
          <Route path="/communications" element={<Communications />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </Layout>
    </Router>
  );
}
