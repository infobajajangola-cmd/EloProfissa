
import React, { useState } from 'react';
import { Professional, ServiceRequest, PortfolioItem } from '../types';
import { Button } from '../components/Button';
import { MOCK_PROFESSIONALS, MOCK_REQUESTS } from '../constants';

interface ProfessionalDashboardProps {
  userProfessionalId?: string; // ID do profissional logado
}

export const ProfessionalDashboard: React.FC<ProfessionalDashboardProps> = ({ userProfessionalId }) => {
  // Simular busca dos dados do profissional logado
  // No caso real, viria do Backend/Context
  const currentProfessional = MOCK_PROFESSIONALS.find(p => p.id === (userProfessionalId || '4')) || MOCK_PROFESSIONALS[3];
  
  const [activeTab, setActiveTab] = useState<'overview' | 'portfolio' | 'profile' | 'requests' | 'subscription'>('overview');
  const [isEditing, setIsEditing] = useState(false);
  
  // State local
  const [formData, setFormData] = useState(currentProfessional);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>(currentProfessional.portfolio || []);
  const [requests, setRequests] = useState<ServiceRequest[]>(MOCK_REQUESTS.filter(r => r.professionalId === currentProfessional.id));

  // Portfolio Modal State
  const [isPortfolioModalOpen, setIsPortfolioModalOpen] = useState(false);
  const [newProject, setNewProject] = useState({ title: '', description: '', imageUrl: '', date: '' });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(value);
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    alert('Perfil atualizado com sucesso!');
  };

  const handleSubmitPortfolio = (e: React.FormEvent) => {
      e.preventDefault();
      const newItem: PortfolioItem = {
          id: `new-${Date.now()}`,
          title: newProject.title,
          description: newProject.description,
          imageUrl: newProject.imageUrl || `https://picsum.photos/id/${Math.floor(Math.random() * 100)}/600/400`,
          date: newProject.date || new Date().toISOString().split('T')[0]
      };
      setPortfolio([newItem, ...portfolio]);
      setIsPortfolioModalOpen(false);
      setNewProject({ title: '', description: '', imageUrl: '', date: '' });
      alert('Projeto adicionado com sucesso!');
  };

  const handleRequestAction = (reqId: string, action: 'accept' | 'reject') => {
      setRequests(prev => prev.map(req => {
          if (req.id === reqId) {
              return { ...req, status: action === 'accept' ? 'accepted' : 'cancelled' };
          }
          return req;
      }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Profile */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mb-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="relative">
             <img 
                src={currentProfessional.imageUrl} 
                alt={currentProfessional.name} 
                className="w-24 h-24 rounded-full object-cover border-4 border-slate-50"
             />
             {currentProfessional.isVerified && (
                 <div className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full border-2 border-white" title="Verificado">
                     <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                 </div>
             )}
          </div>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl font-bold text-slate-900 flex items-center justify-center md:justify-start gap-2">
                {currentProfessional.name}
                {currentProfessional.subscriptionTier === 'elite' && (
                    <span className="bg-amber-100 text-amber-700 text-xs px-2 py-0.5 rounded-full font-bold uppercase border border-amber-200">Elite</span>
                )}
            </h1>
            <p className="text-blue-600 font-medium">{currentProfessional.title}</p>
            <p className="text-slate-500 text-sm mt-1">{currentProfessional.location}</p>
          </div>
          <div className="flex flex-col gap-2 w-full md:w-auto">
            <div className="flex items-center justify-center md:justify-end gap-2 bg-slate-50 p-2 rounded-lg">
                <span className={`w-3 h-3 rounded-full ${currentProfessional.available ? 'bg-green-500' : 'bg-red-500'}`}></span>
                <span className="text-sm font-medium text-slate-700">
                    {currentProfessional.available ? 'Disponível para trabalho' : 'Indisponível'}
                </span>
                <button className="text-xs text-blue-600 underline ml-2">Alterar</button>
            </div>
            <div className="text-center md:text-right">
                <span className="text-2xl font-bold text-slate-900">{formatCurrency(currentProfessional.hourlyRate)}</span>
                <span className="text-slate-500 text-sm">/hora</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="border-b border-slate-200 mb-8 overflow-x-auto">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'overview', label: 'Visão Geral' },
            { id: 'requests', label: 'Solicitações' },
            { id: 'portfolio', label: 'Meu Portfólio' },
            { id: 'profile', label: 'Editar Perfil' },
            { id: 'subscription', label: 'Minha Assinatura' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors
                ${activeTab === tab.id 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}
              `}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        
        {/* TAB: VISÃO GERAL */}
        {activeTab === 'overview' && (
          <div className="animate-fade-in">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg shadow-blue-200">
                    <h3 className="text-blue-100 text-sm font-medium mb-1">Ganhos em {new Date().getFullYear()}</h3>
                    <p className="text-3xl font-bold">{formatCurrency(450000)}</p>
                    <div className="mt-4 text-xs text-blue-100 bg-white/20 inline-block px-2 py-1 rounded">
                        +15% vs mês passado
                    </div>
                </div>
                <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm">
                    <h3 className="text-slate-500 text-sm font-medium mb-1">Visualizações do Perfil</h3>
                    <p className="text-3xl font-bold text-slate-900">1,234</p>
                    <p className="text-xs text-green-600 mt-2">↑ 24 novas essa semana</p>
                </div>
                <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm">
                    <h3 className="text-slate-500 text-sm font-medium mb-1">Avaliação Média</h3>
                    <div className="flex items-end gap-2">
                        <p className="text-3xl font-bold text-slate-900">{currentProfessional.rating}</p>
                        <span className="text-amber-500 text-xl mb-1">★</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-2">{currentProfessional.reviewsCount} avaliações</p>
                </div>
             </div>
             
             <h3 className="font-bold text-slate-900 mb-4">Próximos trabalhos</h3>
             {requests.filter(r => r.status === 'accepted' || r.status === 'in_progress').length > 0 ? (
                 <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                    {/* Lista de trabalhos aceitos/em progresso */}
                    {requests.filter(r => r.status === 'accepted' || r.status === 'in_progress').map(req => (
                        <div key={req.id} className="p-4 border-b border-slate-100 last:border-0 flex justify-between items-center">
                            <div>
                                <p className="font-medium text-slate-900">{req.description}</p>
                                <p className="text-sm text-slate-500">Data: {req.date}</p>
                            </div>
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-full">
                                {req.status === 'accepted' ? 'Aceito - Aguardando Início' : 'Em andamento'}
                            </span>
                        </div>
                    ))}
                 </div>
             ) : (
                 <div className="text-center p-8 bg-slate-50 rounded-xl border border-dashed border-slate-300 text-slate-500">
                     Nenhum trabalho agendado para hoje.
                 </div>
             )}
          </div>
        )}

        {/* TAB: SOLICITAÇÕES */}
        {activeTab === 'requests' && (
           <div className="space-y-4 animate-fade-in">
              <h3 className="font-bold text-lg text-slate-900">Gerir Pedidos</h3>
              {requests.length === 0 ? (
                  <p className="text-slate-500">Você não tem novas solicitações no momento.</p>
              ) : (
                  requests.map(req => (
                      <div key={req.id} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col md:flex-row justify-between gap-6 transition-all">
                          <div>
                              <div className="flex items-center gap-2 mb-2">
                                  <span className={`px-2 py-0.5 text-xs font-bold rounded uppercase
                                      ${req.status === 'pending' ? 'bg-amber-100 text-amber-700' : 
                                        req.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                                        req.status === 'accepted' ? 'bg-green-100 text-green-700' :
                                        'bg-slate-100 text-slate-600'}
                                  `}>
                                      {req.status === 'pending' ? 'Pendente' : 
                                       req.status === 'cancelled' ? 'Recusado' :
                                       req.status === 'accepted' ? 'Aceito' : req.status}
                                  </span>
                                  <span className="text-slate-400 text-sm">• {req.date}</span>
                              </div>
                              <p className="text-lg font-medium text-slate-900 mb-2">{req.description}</p>
                              <div className="flex items-center gap-4 text-sm text-slate-600">
                                  <span>Cliente: Cliente Teste</span>
                                  <span>Orçamento Est.: {req.priceEstimate ? formatCurrency(req.priceEstimate) : 'A definir'}</span>
                              </div>
                          </div>
                          <div className="flex items-center gap-3">
                              {req.status === 'pending' && (
                                  <>
                                    <Button onClick={() => handleRequestAction(req.id, 'reject')} variant="outline" className="text-red-600 hover:bg-red-50 hover:text-red-700 border-red-200">Recusar</Button>
                                    <Button onClick={() => handleRequestAction(req.id, 'accept')} variant="primary">Aceitar Pedido</Button>
                                  </>
                              )}
                              {(req.status === 'accepted' || req.status === 'in_progress') && (
                                  <Button variant="secondary">Ver Detalhes</Button>
                              )}
                          </div>
                      </div>
                  ))
              )}
           </div>
        )}

        {/* TAB: PORTFÓLIO */}
        {activeTab === 'portfolio' && (
            <div className="animate-fade-in">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-lg text-slate-900">Meus Trabalhos Publicados</h3>
                    <Button onClick={() => setIsPortfolioModalOpen(true)} variant="primary">
                        + Adicionar Projeto
                    </Button>
                </div>

                {portfolio.length === 0 ? (
                    <div className="text-center py-16 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200">
                        <svg className="mx-auto h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <h3 className="mt-2 text-sm font-medium text-slate-900">Seu portfólio está vazio</h3>
                        <p className="mt-1 text-sm text-slate-500">Mostre seus melhores trabalhos para atrair mais clientes.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {portfolio.map((item) => (
                            <div key={item.id} className="group bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all">
                                <div className="relative h-48 overflow-hidden">
                                    <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                </div>
                                <div className="p-4">
                                    <h4 className="font-bold text-slate-900">{item.title}</h4>
                                    <p className="text-xs text-slate-400 mb-2">{item.date}</p>
                                    <p className="text-sm text-slate-600 line-clamp-2">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        )}

        {/* TAB: EDITAR PERFIL */}
        {activeTab === 'profile' && (
            <div className="max-w-2xl bg-white rounded-xl shadow-sm border border-slate-200 p-8 animate-fade-in">
                <div className="space-y-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold text-slate-900">Informações do Perfil</h3>
                        {!isEditing ? (
                            <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>Editar Dados</Button>
                        ) : (
                            <div className="flex gap-2">
                                <Button variant="ghost" size="sm" onClick={() => setIsEditing(false)}>Cancelar</Button>
                                <Button variant="primary" size="sm" onClick={handleSaveProfile}>Salvar Alterações</Button>
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Nome Completo</label>
                            <input 
                                disabled={!isEditing}
                                type="text" 
                                className="w-full border border-slate-300 rounded-lg p-2.5 bg-slate-50 disabled:text-slate-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Título Profissional</label>
                            <input 
                                disabled={!isEditing}
                                type="text" 
                                className="w-full border border-slate-300 rounded-lg p-2.5 bg-slate-50 disabled:text-slate-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                value={formData.title}
                                onChange={(e) => setFormData({...formData, title: e.target.value})}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Valor Hora (Kz)</label>
                            <input 
                                disabled={!isEditing}
                                type="number" 
                                className="w-full border border-slate-300 rounded-lg p-2.5 bg-slate-50 disabled:text-slate-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                value={formData.hourlyRate}
                                onChange={(e) => setFormData({...formData, hourlyRate: Number(e.target.value)})}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Localização</label>
                            <input 
                                disabled={!isEditing}
                                type="text" 
                                className="w-full border border-slate-300 rounded-lg p-2.5 bg-slate-50 disabled:text-slate-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                value={formData.location}
                                onChange={(e) => setFormData({...formData, location: e.target.value})}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Sobre Mim</label>
                        <textarea 
                            disabled={!isEditing}
                            rows={4}
                            className="w-full border border-slate-300 rounded-lg p-2.5 bg-slate-50 disabled:text-slate-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            value={formData.description}
                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                        ></textarea>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Habilidades (Separadas por vírgula)</label>
                        <input 
                            disabled={!isEditing}
                            type="text"
                            className="w-full border border-slate-300 rounded-lg p-2.5 bg-slate-50 disabled:text-slate-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            value={formData.skills.join(', ')}
                            onChange={(e) => setFormData({...formData, skills: e.target.value.split(',').map(s => s.trim())})}
                        />
                        <p className="text-xs text-slate-500 mt-1">Ex: Instalação, Manutenção, Orçamento...</p>
                    </div>
                </div>
            </div>
        )}

        {/* TAB: ASSINATURA */}
        {activeTab === 'subscription' && (
            <div className="max-w-3xl bg-white rounded-xl shadow-sm border border-slate-200 p-8 animate-fade-in">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h3 className="text-lg font-bold text-slate-900">Plano Atual</h3>
                        <p className="text-slate-500 text-sm">Gerencie sua assinatura e cobranças</p>
                    </div>
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase">
                        {currentProfessional.subscriptionTier || 'Básico'}
                    </span>
                </div>
                
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 mb-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-bold text-slate-900 text-lg">
                                {currentProfessional.subscriptionTier === 'elite' ? 'Elite Business' : 
                                 currentProfessional.subscriptionTier === 'pro' ? 'Profissional Pro' : 'Plano Grátis'}
                            </p>
                            <p className="text-sm text-slate-600 mt-1">
                                Próxima cobrança: 15 de Junho, 2024
                            </p>
                        </div>
                        <div className="text-right">
                             <p className="font-bold text-xl text-slate-900">
                                {currentProfessional.subscriptionTier === 'elite' ? formatCurrency(15000) : 
                                 currentProfessional.subscriptionTier === 'pro' ? formatCurrency(5000) : formatCurrency(0)}
                             </p>
                             <p className="text-xs text-slate-400">/mês</p>
                        </div>
                    </div>
                </div>
                
                <div className="flex gap-4">
                    <Button variant="outline">Alterar Plano</Button>
                    <Button variant="ghost" className="text-red-600 hover:text-red-700 hover:bg-red-50">Cancelar Assinatura</Button>
                </div>
            </div>
        )}
      </div>

      {/* MODAL ADICIONAR PORTFÓLIO */}
      {isPortfolioModalOpen && (
         <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 bg-slate-900 bg-opacity-75 transition-opacity" onClick={() => setIsPortfolioModalOpen(false)}></div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full">
                    <form onSubmit={handleSubmitPortfolio}>
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <h3 className="text-lg leading-6 font-bold text-slate-900 mb-4" id="modal-title">
                                Adicionar Novo Projeto
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700">Título do Projeto</label>
                                    <input 
                                        type="text" 
                                        required
                                        className="mt-1 block w-full border border-slate-300 rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Ex: Reforma Apartamento Talatona"
                                        value={newProject.title}
                                        onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700">Descrição Detalhada</label>
                                    <textarea 
                                        rows={3}
                                        required
                                        className="mt-1 block w-full border border-slate-300 rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Descreva o que foi feito..."
                                        value={newProject.description}
                                        onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700">Data de Conclusão</label>
                                    <input 
                                        type="date" 
                                        required
                                        className="mt-1 block w-full border border-slate-300 rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500"
                                        value={newProject.date}
                                        onChange={(e) => setNewProject({...newProject, date: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700">URL da Imagem (Opcional)</label>
                                    <input 
                                        type="url" 
                                        className="mt-1 block w-full border border-slate-300 rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="https://..."
                                        value={newProject.imageUrl}
                                        onChange={(e) => setNewProject({...newProject, imageUrl: e.target.value})}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="bg-slate-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            <Button type="submit" variant="primary" className="w-full sm:w-auto sm:ml-3">
                                Salvar Projeto
                            </Button>
                            <Button type="button" onClick={() => setIsPortfolioModalOpen(false)} variant="outline" className="mt-3 w-full sm:w-auto sm:mt-0">
                                Cancelar
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
         </div>
      )}
    </div>
  );
};
