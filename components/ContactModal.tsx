import React, { useState } from 'react';
import { Professional } from '../types';
import { Button } from './Button';

interface ContactModalProps {
  professional: Professional | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ professional, isOpen, onClose }) => {
  const [step, setStep] = useState(1);

  if (!isOpen || !professional) return null;

  const handleSend = () => {
    setStep(2);
    // Simulate API call
    setTimeout(() => {
      setStep(3);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        
        <div className="fixed inset-0 bg-slate-900 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={onClose}></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="relative inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full">
          
          {step === 1 && (
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <h3 className="text-xl leading-6 font-bold text-slate-900" id="modal-title">
                    Contatar {professional.name}
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-slate-500 mb-4">
                      Descreva brevemente sua necessidade para que o profissional possa se preparar.
                    </p>
                    
                    <div className="flex items-center gap-4 mb-4 bg-slate-50 p-3 rounded-lg border border-slate-100">
                        <img src={professional.imageUrl} alt="" className="w-12 h-12 rounded-full object-cover" />
                        <div>
                            <p className="font-medium text-slate-900">{professional.title}</p>
                            <p className="text-xs text-slate-500">{professional.location}</p>
                        </div>
                    </div>

                    <textarea 
                        className="w-full border border-slate-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        rows={4}
                        placeholder="Olá, gostaria de saber mais sobre..."
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="bg-slate-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse mt-4 -mx-6 -mb-4">
                <Button onClick={handleSend} variant="primary" className="w-full sm:w-auto sm:ml-3">
                  Enviar Solicitação
                </Button>
                <Button onClick={onClose} variant="outline" className="mt-3 w-full sm:w-auto sm:mt-0">
                  Cancelar
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
             <div className="bg-white px-4 pt-5 pb-4 sm:p-6 flex flex-col items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                <p className="text-slate-600 font-medium">Enviando sua mensagem...</p>
             </div>
          )}

          {step === 3 && (
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Solicitação Enviada!</h3>
                <p className="text-slate-500 mb-6">
                    {professional.name} receberá sua mensagem e entrará em contato em breve pelo sistema.
                </p>
                <Button onClick={onClose} variant="primary" className="w-full">
                    Voltar para o site
                </Button>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
};
