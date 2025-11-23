
import React from 'react';
import { User, PageView } from '../types';
import { Button } from './Button';

interface NavbarProps {
  user: User | null;
  onNavigate: (page: PageView) => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ user, onNavigate, onLogout }) => {
  return (
    <nav className="bg-white border-b border-slate-100 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center cursor-pointer" onClick={() => onNavigate('home')}>
            <div className="bg-blue-600 p-2 rounded-lg mr-2 shadow-blue-200 shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>
            </div>
            <span className="font-bold text-2xl tracking-tight text-slate-800">Elo<span className="text-blue-600">Profissa</span></span>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            {!user && (
              <>
                <button onClick={() => onNavigate('how-it-works')} className="text-slate-500 hover:text-blue-600 font-medium transition-colors">Como funciona</button>
                <button onClick={() => onNavigate('for-professionals')} className="text-slate-500 hover:text-blue-600 font-medium transition-colors">Para Profissionais</button>
                <div className="h-6 w-px bg-slate-200"></div>
                <Button variant="ghost" onClick={() => onNavigate('login')}>Entrar</Button>
                <Button variant="primary" onClick={() => onNavigate('register')}>Cadastre-se</Button>
              </>
            )}

            {user && (
              <div className="flex items-center gap-4">
                {user.role === 'client' && (
                  <button onClick={() => onNavigate('client-dashboard')} className="text-slate-600 hover:text-blue-600 font-medium">Meus Pedidos</button>
                )}
                {user.role === 'admin' && (
                  <button onClick={() => onNavigate('admin-dashboard')} className="text-slate-600 hover:text-blue-600 font-medium">Painel Admin</button>
                )}
                {user.role === 'professional' && (
                  <button onClick={() => onNavigate('professional-dashboard')} className="text-slate-600 hover:text-blue-600 font-medium">Minha Conta</button>
                )}

                {/* Chat Icon */}
                <button 
                  onClick={() => onNavigate('chat')}
                  className="relative p-2 text-slate-500 hover:bg-slate-50 rounded-full hover:text-blue-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                </button>
                
                <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                  <div className="text-right hidden lg:block">
                    <p className="text-sm font-semibold text-slate-900">{user.name}</p>
                    <p className="text-xs text-slate-500 capitalize">{user.role}</p>
                  </div>
                  <img src={user.avatarUrl} alt={user.name} className="w-10 h-10 rounded-full border-2 border-slate-100" />
                  <Button variant="ghost" size="sm" onClick={onLogout} className="text-red-500 hover:bg-red-50 hover:text-red-600">
                    Sair
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center gap-2">
            {user && (
                 <button 
                  onClick={() => onNavigate('chat')}
                  className="relative p-2 text-slate-500 hover:bg-slate-50 rounded-full"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                </button>
            )}
            <button 
                className="text-slate-500 hover:bg-slate-50 p-2 rounded-lg" 
                onClick={() => {
                    if (!user) onNavigate('login');
                    else if (user.role === 'admin') onNavigate('admin-dashboard');
                    else if (user.role === 'professional') onNavigate('professional-dashboard');
                    else onNavigate('client-dashboard');
                }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
