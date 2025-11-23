
import React from 'react';
import { Button } from '../components/Button';
import { PageView } from '../types';

interface ForProfessionalsProps {
    onNavigate: (page: PageView) => void;
}

export const ForProfessionals: React.FC<ForProfessionalsProps> = ({ onNavigate }) => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-blue-900 py-24 sm:py-32">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
            alt="Profissional trabalhando"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900 via-blue-900/80 to-transparent"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Trabalhe com liberdade e ganhe mais
          </h1>
          <p className="mt-6 text-xl text-blue-100 max-w-3xl">
            Junte-se a milhares de profissionais em Angola que estão transformando suas carreiras com a EloProfissa. Conecte-se a clientes que valorizam seu trabalho.
          </p>
          <div className="mt-10 max-w-sm w-full sm:max-w-none sm:flex sm:justify-center">
            <Button size="lg" onClick={() => onNavigate('register')} className="w-full sm:w-auto text-lg px-8 py-4">
              Começar Agora
            </Button>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-base font-semibold text-blue-600 tracking-wide uppercase">Por que a EloProfissa?</h2>
                <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                    Ferramentas poderosas para o seu crescimento
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { title: 'Visibilidade Premium', desc: 'Apareça para milhares de clientes em Luanda e outras províncias procurando exatamente o que você faz.', icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' },
                    { title: 'Gestão Simplificada', desc: 'Um painel completo para gerir pedidos, agenda e pagamentos. Tudo no seu telemóvel ou computador.', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
                    { title: 'Pagamento Garantido', desc: 'Sistema seguro que protege seu serviço. Receba diretamente na sua conta bancária angolana.', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' }
                ].map((item, idx) => (
                    <div key={idx} className="bg-slate-50 rounded-xl p-8 border border-slate-100 hover:shadow-lg transition-shadow duration-300">
                         <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-6">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon}></path></svg>
                         </div>
                         <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                         <p className="text-slate-600">{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>
      </div>

      {/* Pricing Preview Section - Simplified Version of Subscription Cards */}
      <div className="bg-slate-900 py-24">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-extrabold text-white">Planos que cabem no seu bolso</h2>
                <p className="mt-4 text-xl text-slate-400">Escolha como quer começar. Você pode mudar a qualquer momento.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                 {/* Basic */}
                 <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
                    <h3 className="text-white text-lg font-bold">Plano Grátis</h3>
                    <p className="text-slate-400 text-sm mt-2">Para quem está começando</p>
                    <div className="my-6">
                        <span className="text-4xl font-bold text-white">Kz 0</span><span className="text-slate-400">/mês</span>
                    </div>
                    <ul className="space-y-3 mb-8 text-slate-300 text-sm">
                        <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Perfil Básico</li>
                        <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> 3 Orçamentos/mês</li>
                    </ul>
                    <Button variant="outline" className="w-full border-slate-600 text-white hover:bg-slate-700" onClick={() => onNavigate('register')}>Cadastrar Grátis</Button>
                 </div>

                 {/* Pro */}
                 <div className="bg-blue-600 rounded-2xl p-8 border border-blue-500 transform scale-105 shadow-2xl relative">
                    <div className="absolute top-0 right-0 bg-amber-400 text-amber-900 text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">POPULAR</div>
                    <h3 className="text-white text-lg font-bold">Profissional Pro</h3>
                    <p className="text-blue-200 text-sm mt-2">Para quem quer crescer</p>
                    <div className="my-6">
                        <span className="text-4xl font-bold text-white">Kz 5.000</span><span className="text-blue-200">/mês</span>
                    </div>
                    <ul className="space-y-3 mb-8 text-white text-sm">
                        <li className="flex items-center"><span className="text-white mr-2">✓</span> Orçamentos Ilimitados</li>
                        <li className="flex items-center"><span className="text-white mr-2">✓</span> Selo de Verificado</li>
                        <li className="flex items-center"><span className="text-white mr-2">✓</span> Destaque nas buscas</li>
                    </ul>
                    <Button variant="secondary" className="w-full bg-white text-blue-600 hover:bg-blue-50" onClick={() => onNavigate('register')}>Escolher Pro</Button>
                 </div>

                 {/* Elite */}
                 <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
                    <h3 className="text-white text-lg font-bold">Elite</h3>
                    <p className="text-slate-400 text-sm mt-2">Para empresas e especialistas</p>
                    <div className="my-6">
                        <span className="text-4xl font-bold text-white">Kz 15.000</span><span className="text-slate-400">/mês</span>
                    </div>
                    <ul className="space-y-3 mb-8 text-slate-300 text-sm">
                        <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Tudo do Pro</li>
                        <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Gestor de Conta Dedicado</li>
                        <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Topo das buscas sempre</li>
                    </ul>
                    <Button variant="outline" className="w-full border-slate-600 text-white hover:bg-slate-700" onClick={() => onNavigate('register')}>Escolher Elite</Button>
                 </div>
            </div>
         </div>
      </div>
    </div>
  );
};
