import React from 'react';
import { Professional } from '../types';
import { Button } from '../components/Button';

interface ProfessionalDetailsProps {
  professional: Professional;
  onBack: () => void;
  onContact: () => void;
}

export const ProfessionalDetails: React.FC<ProfessionalDetailsProps> = ({ professional, onBack, onContact }) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(value);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Button variant="ghost" onClick={onBack} className="mb-6 pl-0 hover:bg-transparent hover:text-blue-600">
        ← Voltar aos resultados
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden sticky top-24">
            <div className="h-32 bg-gradient-to-r from-blue-600 to-cyan-500"></div>
            <div className="px-6 pb-6 relative">
              <div className="relative -mt-16 mb-4">
                <img 
                  src={professional.imageUrl} 
                  alt={professional.name} 
                  className="w-32 h-32 rounded-full border-4 border-white shadow-md object-cover"
                />
                {professional.available && (
                   <span className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></span>
                )}
              </div>
              
              <h1 className="text-2xl font-bold text-slate-900">{professional.name}</h1>
              <p className="text-blue-600 font-medium mb-4">{professional.title}</p>
              
              <div className="flex items-center gap-2 mb-6">
                <div className="flex bg-amber-50 px-2 py-1 rounded text-amber-700 font-bold text-sm">
                  ★ {professional.rating}
                </div>
                <span className="text-slate-400 text-sm">{professional.reviewsCount} avaliações</span>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center text-slate-600">
                  <svg className="w-5 h-5 mr-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  {professional.location}
                </div>
                <div className="flex items-center text-slate-600">
                  <svg className="w-5 h-5 mr-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  {formatCurrency(professional.hourlyRate)} / hora
                </div>
              </div>

              <Button onClick={onContact} variant="primary" className="w-full shadow-lg shadow-blue-200">
                Contatar Profissional
              </Button>
            </div>
          </div>
        </div>

        {/* Right Column: Info */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Sobre</h2>
            <p className="text-slate-600 leading-relaxed">
              {professional.description}
            </p>
            <p className="text-slate-600 leading-relaxed mt-4">
              Sou um profissional dedicado com vasta experiência em resolver problemas complexos na minha área. Prezo pela pontualidade, qualidade técnica e satisfação total do cliente em Luanda e arredores.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Especialidades</h2>
            <div className="flex flex-wrap gap-2">
              {professional.skills.map((skill, i) => (
                <span key={i} className="bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg text-sm font-medium border border-slate-200">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Avaliações de Clientes</h2>
            <div className="space-y-6">
                {[1, 2].map((review) => (
                  <div key={review} className="border-b border-slate-100 pb-6 last:border-0 last:pb-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center text-xs font-bold text-slate-500">
                          {review === 1 ? 'JA' : 'PM'}
                        </div>
                        <span className="font-medium text-slate-900">{review === 1 ? 'José António' : 'Paula Miguel'}</span>
                      </div>
                      <span className="text-xs text-slate-400">Há 2 semanas</span>
                    </div>
                    <div className="flex text-amber-400 text-sm mb-2">★★★★★</div>
                    <p className="text-slate-600 text-sm">
                      Excelente profissional! Resolveu meu problema no Kilamba muito rápido e foi super educado. Recomendo a todos da plataforma EloProfissa.
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};