
import React from 'react';
import { Button } from '../components/Button';
import { PageView } from '../types';

interface HowItWorksProps {
    onNavigate: (page: PageView) => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onNavigate }) => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative py-20 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0">
            <img 
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
                alt="Cliente usando celular"
                className="w-full h-full object-cover opacity-30" 
            />
            <div className="absolute inset-0 bg-blue-900/60 mix-blend-multiply"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
            Simples, Rápido e Seguro
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-slate-200">
            Veja como é fácil contratar os melhores profissionais de Angola com a EloProfissa.
          </p>
        </div>
      </div>

      {/* Steps Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {/* Step 1 */}
                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-200"></div>
                    <div className="relative bg-white p-8 rounded-2xl border border-slate-100 h-full text-center">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600 font-bold text-2xl">
                            1
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-4">Descreva o Problema</h3>
                        <p className="text-slate-600">
                            Use nossa barra de pesquisa inteligente. Diga "Preciso pintar minha sala no Kilamba" ou "Meu AC parou de gelar". Nossa IA entende você.
                        </p>
                    </div>
                </div>

                {/* Step 2 */}
                <div className="relative group">
                     <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-200"></div>
                     <div className="relative bg-white p-8 rounded-2xl border border-slate-100 h-full text-center">
                        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 text-purple-600 font-bold text-2xl">
                            2
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-4">Escolha o Profissional</h3>
                        <p className="text-slate-600">
                            Veja uma lista de profissionais verificados, compare preços, avaliações e portfólios. Escolha o melhor para o seu orçamento.
                        </p>
                    </div>
                </div>

                {/* Step 3 */}
                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-200"></div>
                    <div className="relative bg-white p-8 rounded-2xl border border-slate-100 h-full text-center">
                        <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6 text-amber-600 font-bold text-2xl">
                            3
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-4">Agende e Relaxe</h3>
                        <p className="text-slate-600">
                            Entre em contato diretamente pelo sistema, combine os detalhes e pronto! O pagamento é seguro e você avalia o serviço no final.
                        </p>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-slate-50 py-16 border-t border-slate-200">
          <div className="max-w-4xl mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Pronto para resolver seu problema?</h2>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" onClick={() => onNavigate('home')}>Encontrar Profissional</Button>
                  <Button size="lg" variant="outline" onClick={() => onNavigate('register')}>Criar Conta Grátis</Button>
              </div>
          </div>
      </div>
    </div>
  );
};
