
import React, { useState } from 'react';
import { MOCK_PROFESSIONALS, SUBSCRIPTION_PLANS } from '../constants';
import { Button } from '../components/Button';
import { SubscriptionPlan } from '../types';

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'professionals' | 'plans'>('overview');
  const [plans, setPlans] = useState<SubscriptionPlan[]>(SUBSCRIPTION_PLANS);
  const [editingPlan, setEditingPlan] = useState<string | null>(null);

  const handlePriceChange = (id: string, newPrice: string) => {
      setPlans(prev => prev.map(p => p.id === id ? { ...p, price: Number(newPrice) } : p));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">Painel Administrativo</h1>
      
      {/* Tab Navigation */}
      <div className="flex gap-4 border-b border-slate-200 mb-8">
          <button 
            onClick={() => setActiveTab('overview')} 
            className={`pb-4 px-2 font-medium text-sm border-b-2 ${activeTab === 'overview' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500'}`}
          >
              Visão Geral
          </button>
          <button 
            onClick={() => setActiveTab('professionals')} 
            className={`pb-4 px-2 font-medium text-sm border-b-2 ${activeTab === 'professionals' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500'}`}
          >
              Profissionais
          </button>
          <button 
            onClick={() => setActiveTab('plans')} 
            className={`pb-4 px-2 font-medium text-sm border-b-2 ${activeTab === 'plans' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500'}`}
          >
              Planos de Assinatura
          </button>
      </div>

      {activeTab === 'overview' && (
          <div className="animate-fade-in">
             {/* Stats Cards */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                {[
                { label: 'Usuários Totais', value: '2,543', change: '+12%', color: 'bg-blue-500' },
                { label: 'Profissionais Ativos', value: '148', change: '+5%', color: 'bg-green-500' },
                { label: 'Receita Mensal', value: 'Kz 4.5M', change: '+24%', color: 'bg-indigo-500' },
                { label: 'Solicitações Pendentes', value: '12', change: '-2%', color: 'bg-amber-500' },
                ].map((stat, i) => (
                <div key={i} className="bg-white overflow-hidden shadow rounded-xl border border-slate-100">
                    <div className="p-5">
                    <div className="flex items-center">
                        <div className={`flex-shrink-0 rounded-md p-3 ${stat.color} bg-opacity-10`}>
                        <div className={`h-6 w-6 ${stat.color.replace('bg-', 'text-')}`}>
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                        </div>
                        </div>
                        <div className="ml-5 w-0 flex-1">
                        <dl>
                            <dt className="text-sm font-medium text-slate-500 truncate">{stat.label}</dt>
                            <dd>
                            <div className="text-lg font-bold text-slate-900">{stat.value}</div>
                            </dd>
                        </dl>
                        </div>
                    </div>
                    </div>
                    <div className="bg-slate-50 px-5 py-3">
                    <div className="text-sm">
                        <span className={`font-medium ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>{stat.change}</span>
                        <span className="text-slate-500"> em relação ao mês passado</span>
                    </div>
                    </div>
                </div>
                ))}
            </div>

             {/* Recent Activity */}
            <div className="bg-white shadow rounded-xl border border-slate-100 p-6">
                <h3 className="text-lg font-medium text-slate-900 mb-4">Atividade Recente</h3>
                <ul className="space-y-4">
                    {[1, 2, 3, 4, 5].map((item) => (
                        <li key={item} className="flex gap-4">
                            <div className="flex-shrink-0">
                                <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 text-xs">
                                    Log
                                </div>
                            </div>
                            <div>
                                <p className="text-sm text-slate-800">Novo cadastro de profissional: <span className="font-bold">Paulo K.</span></p>
                                <p className="text-xs text-slate-400">Há 2 horas</p>
                            </div>
                        </li>
                    ))}
                </ul>
                <div className="mt-6">
                    <Button variant="ghost" size="sm" className="w-full text-blue-600">Ver todo o histórico</Button>
                </div>
            </div>
          </div>
      )}

      {activeTab === 'professionals' && (
        /* Professionals Table */
        <div className="bg-white shadow rounded-xl border border-slate-100 overflow-hidden animate-fade-in">
          <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center">
            <h3 className="text-lg leading-6 font-medium text-slate-900">Gestão de Profissionais</h3>
            <Button variant="outline" size="sm">Exportar CSV</Button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Profissional</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Categoria</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Plano</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Ações</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {MOCK_PROFESSIONALS.map((pro) => (
                  <tr key={pro.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img className="h-10 w-10 rounded-full object-cover" src={pro.imageUrl} alt="" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-slate-900">{pro.name}</div>
                          <div className="text-xs text-slate-500">{pro.location}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-900">{pro.category}</div>
                      <div className="text-xs text-slate-500">{pro.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-0.5 text-xs font-bold rounded uppercase border ${
                            pro.subscriptionTier === 'elite' ? 'bg-amber-100 text-amber-800 border-amber-200' : 
                            pro.subscriptionTier === 'pro' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                            'bg-slate-100 text-slate-600 border-slate-200'
                        }`}>
                            {pro.subscriptionTier || 'Básico'}
                        </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        pro.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {pro.status === 'active' ? 'Ativo' : 'Pendente'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <a href="#" className="text-blue-600 hover:text-blue-900 mr-3">Editar</a>
                      <a href="#" className="text-red-600 hover:text-red-900">Bloquear</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'plans' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
              {plans.map((plan) => (
                  <div key={plan.id} className="bg-white rounded-xl shadow border border-slate-200 overflow-hidden relative">
                      <div className={`h-2 w-full ${plan.tier === 'elite' ? 'bg-amber-500' : plan.tier === 'pro' ? 'bg-blue-600' : 'bg-slate-400'}`}></div>
                      <div className="p-6">
                          <div className="flex justify-between items-start mb-4">
                              <h3 className="font-bold text-xl text-slate-900">{plan.name}</h3>
                              {editingPlan === plan.id ? (
                                  <button onClick={() => setEditingPlan(null)} className="text-xs text-green-600 font-bold hover:underline">Salvar</button>
                              ) : (
                                  <button onClick={() => setEditingPlan(plan.id)} className="text-xs text-blue-600 hover:underline">Editar</button>
                              )}
                          </div>
                          
                          <div className="mb-6">
                              <label className="text-xs text-slate-400 block mb-1">Preço Mensal (Kz)</label>
                              {editingPlan === plan.id ? (
                                  <input 
                                    type="number" 
                                    value={plan.price} 
                                    onChange={(e) => handlePriceChange(plan.id, e.target.value)}
                                    className="w-full border border-slate-300 rounded p-2 text-lg font-bold"
                                  />
                              ) : (
                                  <p className="text-3xl font-bold text-slate-900">{new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(plan.price)}</p>
                              )}
                          </div>

                          <div className="border-t border-slate-100 pt-4">
                              <p className="text-xs text-slate-400 uppercase font-bold mb-3">Benefícios</p>
                              <ul className="space-y-2">
                                  {plan.features.map((feat, idx) => (
                                      <li key={idx} className="flex items-center text-sm text-slate-600">
                                          <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                          {feat}
                                      </li>
                                  ))}
                              </ul>
                          </div>
                      </div>
                      <div className="bg-slate-50 p-4 border-t border-slate-100 text-center">
                          <p className="text-xs text-slate-500">
                              {MOCK_PROFESSIONALS.filter(p => (p.subscriptionTier || 'basic') === plan.tier).length} profissionais inscritos
                          </p>
                      </div>
                  </div>
              ))}
          </div>
      )}
    </div>
  );
};
