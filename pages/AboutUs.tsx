
import React from 'react';
import { Button } from '../components/Button';
import { PageView } from '../types';

interface AboutUsProps {
    onNavigate: (page: PageView) => void;
}

export const AboutUs: React.FC<AboutUsProps> = ({ onNavigate }) => {
  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-slate-50 py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h1 className="text-4xl font-extrabold text-slate-900 mb-6">Nossa História</h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                A EloProfissa nasceu com uma missão simples: conectar o talento angolano a quem precisa de soluções de qualidade.
            </p>
        </div>
      </div>

      {/* Story Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-6">De Luanda para Angola inteira</h2>
                  <div className="space-y-4 text-slate-600 leading-relaxed">
                      <p>
                          Em 2023, percebemos uma lacuna no mercado. De um lado, excelentes eletricistas, advogados e professores lutando para encontrar clientes. Do outro, famílias com dificuldade em achar profissionais de confiança.
                      </p>
                      <p>
                          A EloProfissa surgiu para ser essa ponte. Desenvolvemos uma tecnologia proprietária, adaptada à realidade local, que usa Inteligência Artificial para entender exatamente o que o cliente precisa e sugerir o profissional ideal.
                      </p>
                      <p>
                          Hoje, operamos em Luanda, Benguela, Huambo e estamos em rápida expansão para as 18 províncias. Acreditamos no potencial humano de Angola e trabalhamos todos os dias para formalizar e dignificar o trabalho liberal.
                      </p>
                  </div>
              </div>
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1577415124269-fc6309db8726?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                    alt="Equipe trabalhando em Luanda" 
                    className="absolute inset-0 w-full h-full object-cover"
                  />
              </div>
          </div>
      </div>

      {/* Values */}
      <div className="bg-slate-900 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-center mb-16">Nossos Valores</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center p-6 border border-slate-700 rounded-xl hover:bg-slate-800 transition">
                      <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">🇦🇴</div>
                      <h3 className="text-xl font-bold mb-3">Angolanidade</h3>
                      <p className="text-slate-400">Entendemos a nossa cultura, os nossos desafios e a nossa gente.</p>
                  </div>
                  <div className="text-center p-6 border border-slate-700 rounded-xl hover:bg-slate-800 transition">
                      <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">🤝</div>
                      <h3 className="text-xl font-bold mb-3">Confiança</h3>
                      <p className="text-slate-400">Segurança é inegociável. Verificamos cada profissional.</p>
                  </div>
                  <div className="text-center p-6 border border-slate-700 rounded-xl hover:bg-slate-800 transition">
                      <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">🚀</div>
                      <h3 className="text-xl font-bold mb-3">Inovação</h3>
                      <p className="text-slate-400">Usamos tecnologia de ponta para simplificar a vida real.</p>
                  </div>
              </div>
          </div>
      </div>

      <div className="py-20 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Quer fazer parte dessa história?</h2>
          <Button onClick={() => onNavigate('careers')}>Ver Vagas Disponíveis</Button>
      </div>
    </div>
  );
};
