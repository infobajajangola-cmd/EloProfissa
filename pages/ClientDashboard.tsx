
import React, { useState } from 'react';
import { MOCK_REQUESTS } from '../constants';
import { Button } from '../components/Button';
import { PageView, ServiceRequest } from '../types';

interface ClientDashboardProps {
    onNavigate: (page: PageView) => void;
}

export const ClientDashboard: React.FC<ClientDashboardProps> = ({ onNavigate }) => {
  const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(null);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(value);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Meus Pedidos</h1>
          <Button variant="primary" onClick={() => onNavigate('home')}>Nova Solicitação</Button>
      </div>

      <div className="space-y-6">
        {MOCK_REQUESTS.map((request) => (
            <div key={request.id} className="bg-white shadow-sm rounded-xl border border-slate-100 overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                            <img src={request.professional.imageUrl} alt="" className="w-12 h-12 rounded-full object-cover" />
                            <div>
                                <h3 className="font-bold text-slate-900">{request.professional.name}</h3>
                                <p className="text-sm text-slate-500">{request.professional.title}</p>
                            </div>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide
                            ${request.status === 'completed' ? 'bg-green-100 text-green-700' : 
                              request.status === 'in_progress' ? 'bg-blue-100 text-blue-700' :
                              'bg-amber-100 text-amber-700'
                            }
                        `}>
                            {request.status === 'completed' ? 'Concluído' : 
                             request.status === 'in_progress' ? 'Em Andamento' : 'Pendente'}
                        </div>
                    </div>
                    
                    <div className="border-t border-slate-100 pt-4 mb-4">
                        <p className="text-slate-600 text-sm mb-2"><span className="font-semibold">Serviço:</span> {request.description}</p>
                        <div className="flex gap-6 text-sm text-slate-500">
                            <span className="flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                {request.date}
                            </span>
                            <span className="flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                {request.priceEstimate ? formatCurrency(request.priceEstimate) : 'Sob Consulta'}
                            </span>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3">
                        <Button variant="outline" size="sm" onClick={() => setSelectedRequest(request)}>Detalhes</Button>
                        <Button variant="primary" size="sm" onClick={() => onNavigate('chat')}>Chat</Button>
                    </div>
                </div>
            </div>
        ))}
      </div>

      {/* Details Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-center justify-center min-h-screen px-4 text-center sm:block sm:p-0">
                <div className="fixed inset-0 bg-slate-900 bg-opacity-75 transition-opacity" onClick={() => setSelectedRequest(null)}></div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-lg leading-6 font-bold text-slate-900" id="modal-title">
                                Detalhes do Pedido #{selectedRequest.id}
                            </h3>
                            <button onClick={() => setSelectedRequest(null)} className="text-slate-400 hover:text-slate-600">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button>
                        </div>
                        <div className="mt-2 space-y-4">
                            <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                                <p className="text-xs text-slate-500 uppercase tracking-wide font-bold mb-1">Profissional</p>
                                <div className="flex items-center gap-3">
                                    <img src={selectedRequest.professional.imageUrl} className="w-10 h-10 rounded-full" alt="" />
                                    <div>
                                        <p className="font-bold text-slate-900">{selectedRequest.professional.name}</p>
                                        <p className="text-xs text-slate-500">{selectedRequest.professional.title}</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div>
                                <p className="text-xs text-slate-500 uppercase tracking-wide font-bold mb-1">Descrição do Problema</p>
                                <p className="text-slate-700 bg-white border border-slate-200 p-3 rounded-lg">{selectedRequest.description}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xs text-slate-500 uppercase tracking-wide font-bold mb-1">Orçamento Estimado</p>
                                    <p className="font-bold text-lg text-blue-600">{selectedRequest.priceEstimate ? formatCurrency(selectedRequest.priceEstimate) : 'A definir'}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 uppercase tracking-wide font-bold mb-1">Status</p>
                                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide
                                        ${selectedRequest.status === 'completed' ? 'bg-green-100 text-green-700' : 
                                        selectedRequest.status === 'in_progress' ? 'bg-blue-100 text-blue-700' :
                                        'bg-amber-100 text-amber-700'
                                        }
                                    `}>
                                        {selectedRequest.status === 'completed' ? 'Concluído' : 
                                        selectedRequest.status === 'in_progress' ? 'Em Andamento' : 'Pendente'}
                                    </span>
                                </div>
                            </div>

                            <div>
                                <p className="text-xs text-slate-500 uppercase tracking-wide font-bold mb-2">Histórico</p>
                                <div className="space-y-2 text-sm text-slate-600 border-l-2 border-slate-200 pl-3">
                                    <p><span className="font-bold">{selectedRequest.date}:</span> Pedido criado</p>
                                    {selectedRequest.status !== 'pending' && <p><span className="font-bold">2024-05-16:</span> Profissional aceitou o pedido</p>}
                                    {selectedRequest.status === 'completed' && <p><span className="font-bold">2024-05-18:</span> Serviço finalizado e pago</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-slate-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <Button onClick={() => onNavigate('chat')} variant="primary" className="w-full sm:w-auto sm:ml-3">
                            Enviar Mensagem
                        </Button>
                        <Button onClick={() => setSelectedRequest(null)} variant="outline" className="mt-3 w-full sm:w-auto sm:mt-0">
                            Fechar
                        </Button>
                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};
