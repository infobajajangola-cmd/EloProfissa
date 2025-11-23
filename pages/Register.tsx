import React, { useState } from 'react';
import { Button } from '../components/Button';
import { UserRole } from '../types';

interface RegisterProps {
  onRegister: (role: UserRole, name: string) => void;
  onNavigateLogin: () => void;
}

export const Register: React.FC<RegisterProps> = ({ onRegister, onNavigateLogin }) => {
  const [role, setRole] = useState<UserRole>('client');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulating API Call
    setTimeout(() => {
        setIsLoading(false);
        onRegister(role, formData.name);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center mb-6">
            <span className="font-bold text-3xl tracking-tight text-slate-900">Elo<span className="text-blue-600">Profissa</span></span>
            <p className="text-sm text-slate-500 mt-2">Crie sua conta gratuitamente</p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl shadow-slate-200 sm:rounded-xl sm:px-10 border border-slate-100">
          
          {/* Role Selection */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-slate-700 mb-3 text-center">Como você deseja usar a plataforma?</label>
            <div className="grid grid-cols-2 gap-4">
                <button
                    type="button"
                    onClick={() => setRole('client')}
                    className={`p-4 rounded-xl border-2 text-center transition-all ${
                        role === 'client' 
                        ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-sm' 
                        : 'border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                >
                    <div className="flex justify-center mb-2">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                    </div>
                    <span className="font-bold text-sm block">Cliente</span>
                    <span className="text-xs opacity-75">Quero contratar</span>
                </button>
                <button
                    type="button"
                    onClick={() => setRole('professional')}
                    className={`p-4 rounded-xl border-2 text-center transition-all ${
                        role === 'professional' 
                        ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-sm' 
                        : 'border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                >
                     <div className="flex justify-center mb-2">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                    </div>
                    <span className="font-bold text-sm block">Profissional</span>
                    <span className="text-xs opacity-75">Quero trabalhar</span>
                </button>
            </div>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-slate-700">Nome Completo</label>
              <div className="mt-1">
                <input
                  name="name"
                  type="text"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-slate-300 rounded-lg placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Ex: Manuel António"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Email</label>
              <div className="mt-1">
                <input
                  name="email"
                  type="email"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-slate-300 rounded-lg placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="seu@email.com"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Telefone (Angola)</label>
              <div className="mt-1">
                <input
                  name="phone"
                  type="tel"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-slate-300 rounded-lg placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="+244 9xx xxx xxx"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Senha</label>
              <div className="mt-1">
                <input
                  name="password"
                  type="password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-slate-300 rounded-lg placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="••••••••"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <Button 
                type="submit" 
                variant="primary" 
                className="w-full justify-center py-3"
                isLoading={isLoading}
              >
                Criar Conta
              </Button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-slate-500">Já tem uma conta?</span>
              </div>
            </div>

            <div className="mt-6">
                <Button 
                    variant="outline" 
                    className="w-full justify-center"
                    onClick={onNavigateLogin}
                >
                    Fazer Login
                </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};