import React from 'react';
import { Button } from '../components/Button';

export const Careers: React.FC = () => {
  const openings = [
    { title: 'Desenvolvedor Frontend Senior', dept: 'Engenharia', location: 'Luanda (Híbrido)', type: 'Tempo Integral' },
    { title: 'Customer Success Manager', dept: 'Suporte', location: 'Remoto (Angola)', type: 'Tempo Integral' },
    { title: 'Analista de Marketing', dept: 'Marketing', location: 'Luanda (Talatona)', type: 'Tempo Integral' },
  ];

  return (
    <div className="bg-white min-h-screen">
       <div className="bg-blue-600 py-24">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <h1 className="text-4xl font-extrabold text-white mb-4">Junte-se à EloProfissa</h1>
                <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                    Estamos construindo o futuro dos serviços em Angola. Buscamos mentes criativas e apaixonadas por tecnologia.
                </p>
            </div>
       </div>

       <div className="max-w-5xl mx-auto px-4 py-20">
           <h2 className="text-2xl font-bold text-slate-900 mb-10">Vagas Abertas</h2>
           
           <div className="space-y-4">
               {openings.map((job, idx) => (
                   <div key={idx} className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow flex flex-col md:flex-row justify-between items-center gap-4">
                       <div>
                           <h3 className="text-lg font-bold text-slate-900">{job.title}</h3>
                           <div className="flex gap-4 text-sm text-slate-500 mt-2">
                               <span className="flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                                   {job.dept}
                               </span>
                               <span className="flex items-center gap-1">
                                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                   {job.location}
                               </span>
                               <span className="flex items-center gap-1">
                                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                   {job.type}
                               </span>
                           </div>
                       </div>
                       <Button variant="outline">Ver Detalhes</Button>
                   </div>
               ))}
           </div>

           <div className="mt-12 p-8 bg-slate-50 rounded-2xl text-center">
               <h3 className="text-lg font-semibold text-slate-900 mb-2">Não encontrou sua vaga?</h3>
               <p className="text-slate-600 mb-6">Envie seu currículo para nosso banco de talentos.</p>
               <Button variant="primary">Enviar Candidatura Espontânea</Button>
           </div>
       </div>
    </div>
  );
};