import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, UserPlus } from 'lucide-react';

interface NewPatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const NewPatientModal = ({ isOpen, onClose, onSuccess }: NewPatientModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'Male',
    condition: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/patients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          age: parseInt(formData.age)
        })
      });
      if (response.ok) {
        onSuccess();
        onClose();
        setFormData({ name: '', age: '', gender: 'Male', condition: '', phone: '' });
      }
    } catch (error) {
      console.error('Error adding patient:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-surface-container rounded-2xl shadow-2xl border border-outline-variant/10 overflow-hidden"
          >
            <div className="p-6 border-b border-outline-variant/5 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 obsidian-gradient rounded-lg flex items-center justify-center">
                  <UserPlus className="text-on-primary" size={20} />
                </div>
                <h3 className="font-headline text-xl font-bold">New Patient Intake</h3>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-surface-container-high rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Full Name</label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-surface-container-lowest border-none rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-primary/40 outline-none"
                  placeholder="e.g. Alistair Vance"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Age</label>
                  <input
                    required
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="w-full bg-surface-container-lowest border-none rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-primary/40 outline-none"
                    placeholder="e.g. 45"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Gender</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full bg-surface-container-lowest border-none rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-primary/40 outline-none appearance-none"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Phone Number</label>
                <input
                  required
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-surface-container-lowest border-none rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-primary/40 outline-none"
                  placeholder="e.g. +15550101"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Primary Condition</label>
                <input
                  required
                  type="text"
                  value={formData.condition}
                  onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                  className="w-full bg-surface-container-lowest border-none rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-primary/40 outline-none"
                  placeholder="e.g. Post-Op Cardiology"
                />
              </div>

              <div className="pt-4">
                <button
                  disabled={loading}
                  type="submit"
                  className="w-full py-4 obsidian-gradient text-on-primary font-bold rounded-xl shadow-lg shadow-inverse-primary/20 active:scale-[0.98] transition-all disabled:opacity-50"
                >
                  {loading ? 'Processing...' : 'Register Patient'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
