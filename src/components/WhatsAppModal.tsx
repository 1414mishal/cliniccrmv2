import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MessageCircle, Send, Copy } from 'lucide-react';
import { Patient, Template } from '../types';

interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  patient: Patient | null;
}

export const WhatsAppModal = ({ isOpen, onClose, patient }: WhatsAppModalProps) => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [customMessage, setCustomMessage] = useState('');

  useEffect(() => {
    if (isOpen) {
      fetch('/api/templates').then(res => res.json()).then(setTemplates);
    }
  }, [isOpen]);

  useEffect(() => {
    if (selectedTemplate && patient) {
      let content = selectedTemplate.content
        .replace('{{name}}', patient.name)
        .replace('{{phone}}', '+1 (800) LUME-MED')
        .replace('{{medication}}', 'Amoxicillin 500mg');
      setCustomMessage(content);
    }
  }, [selectedTemplate, patient]);

  const handleSend = () => {
    if (!patient) return;
    const encodedMessage = encodeURIComponent(customMessage);
    const whatsappUrl = `https://wa.me/${patient.phone.replace(/\D/g, '')}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && patient && (
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
            className="relative w-full max-w-2xl bg-surface-container rounded-2xl shadow-2xl border border-outline-variant/10 overflow-hidden"
          >
            <div className="p-6 border-b border-outline-variant/5 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                  <MessageCircle className="text-green-500" size={20} />
                </div>
                <div>
                  <h3 className="font-headline text-xl font-bold">WhatsApp Automation</h3>
                  <p className="text-xs text-on-surface-variant">Messaging: {patient.name}</p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-surface-container-high rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 h-[500px]">
              {/* Templates Sidebar */}
              <div className="border-r border-outline-variant/5 bg-surface-container-low p-4 overflow-y-auto">
                <h4 className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-4">Templates</h4>
                <div className="space-y-2">
                  {templates.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setSelectedTemplate(t)}
                      className={`w-full text-left p-3 rounded-xl text-xs font-medium transition-all ${
                        selectedTemplate?.id === t.id 
                          ? 'bg-primary text-on-primary' 
                          : 'bg-surface-container-high text-on-surface-variant hover:text-on-surface'
                      }`}
                    >
                      {t.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Editor Area */}
              <div className="md:col-span-2 p-6 flex flex-col">
                <h4 className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-4">Message Preview</h4>
                <textarea
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  className="flex-1 bg-surface-container-lowest border-none rounded-xl p-4 text-sm focus:ring-1 focus:ring-primary/40 outline-none resize-none mb-4"
                  placeholder="Select a template or type your message..."
                />
                <div className="flex gap-3">
                  <button 
                    onClick={() => navigator.clipboard.writeText(customMessage)}
                    className="flex-1 py-3 bg-surface-container-high text-on-surface font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-surface-container-highest transition-all"
                  >
                    <Copy size={16} />
                    Copy
                  </button>
                  <button 
                    onClick={handleSend}
                    className="flex-[2] py-3 bg-green-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-green-600/20 hover:bg-green-500 transition-all active:scale-[0.98]"
                  >
                    <Send size={16} />
                    Send WhatsApp
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
