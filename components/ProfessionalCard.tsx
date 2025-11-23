import React from 'react';
import { Professional } from '../types';
import { Button } from './Button';

interface ProfessionalCardProps {
  professional: Professional;
  onSelect: (prof: Professional) => void;
}

export const ProfessionalCard: React.FC<ProfessionalCardProps> = ({ professional, onSelect }) => {
  // Formatador de moeda para Angola (Kwanza)
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(value);
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full group">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={professional.imageUrl} 
          alt={professional.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold text-blue-800 shadow-sm">
          {formatCurrency(professional.hourlyRate)}/h
        </div>
        {professional.available && (
          <div className="absolute top-3 left-3 bg-green-500/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-bold text-white shadow-sm flex items-center gap-1">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
            Disponível
          </div>
        )}
      </div>
      
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-bold text-lg text-slate-900">{professional.name}</h3>
            <p className="text-sm text-blue-600 font-medium">{professional.title}</p>
          </div>
          <div className="flex items-center bg-amber-50 px-2 py-1 rounded-md">
            <svg className="w-4 h-4 text-amber-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm font-bold text-slate-700">{professional.rating}</span>
            <span className="text-xs text-slate-400 ml-1">({professional.reviewsCount})</span>
          </div>
        </div>

        <p className="text-slate-500 text-sm mb-4 line-clamp-2 flex-1">
          {professional.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {professional.skills.slice(0, 2).map((skill, idx) => (
            <span key={idx} className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded-md">
              {skill}
            </span>
          ))}
          {professional.skills.length > 2 && (
             <span className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded-md">
             +{professional.skills.length - 2}
           </span>
          )}
        </div>

        <div className="flex items-center text-xs text-slate-400 mb-4">
           <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
           {professional.location}
        </div>

        <Button onClick={() => onSelect(professional)} variant="outline" className="w-full hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200">
          Ver Perfil
        </Button>
      </div>
    </div>
  );
};