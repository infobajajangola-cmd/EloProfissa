
import React, { useState, useEffect } from 'react';
import { MOCK_PROFESSIONALS, MOCK_USERS } from './constants';
import { Professional, Category, User, PageView, UserRole, SearchFilters } from './types';
import { geminiService } from './services/geminiService';
import { SearchBar } from './components/SearchBar';
import { ProfessionalCard } from './components/ProfessionalCard';
import { ContactModal } from './components/ContactModal';
import { Button } from './components/Button';
import { Navbar } from './components/Navbar';
import { Toast, ToastType } from './components/Toast';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { AdminDashboard } from './pages/AdminDashboard';
import { ClientDashboard } from './pages/ClientDashboard';
import { ProfessionalDashboard } from './pages/ProfessionalDashboard';
import { ProfessionalDetails } from './pages/ProfessionalDetails';
import { Chat } from './pages/Chat';

// New Pages
import { HowItWorks } from './pages/HowItWorks';
import { ForProfessionals } from './pages/ForProfessionals';
import { AboutUs } from './pages/AboutUs';
import { Careers } from './pages/Careers';
import { Blog } from './pages/Blog';
import { BlogPost } from './pages/BlogPost'; // New

const App: React.FC = () => {
  // Navigation & User State
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Data State
  const [professionals, setProfessionals] = useState<Professional[]>(MOCK_PROFESSIONALS);
  const [selectedProfessional, setSelectedProfessional] = useState<Professional | null>(null);
  const [selectedBlogPostId, setSelectedBlogPostId] = useState<number | null>(null);
  
  // Search State
  const [isSearching, setIsSearching] = useState(false);
  const [lastQuery, setLastQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<SearchFilters>({});
  const [searchReasoning, setSearchReasoning] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<Category | 'Todos'>('Todos');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Toast State
  const [toast, setToast] = useState<{ msg: string, type: ToastType, visible: boolean }>({ msg: '', type: 'info', visible: false });

  const showToast = (message: string, type: ToastType = 'success') => {
      setToast({ msg: message, type, visible: true });
  };

  // Handlers
  const handleLogin = (role: UserRole) => {
    let user = { ...MOCK_USERS['client'] }; // Default

    if (role === 'admin') {
        user = { ...MOCK_USERS['admin'] };
    } else if (role === 'professional') {
        user = { ...MOCK_USERS['professional'] };
    }
    
    setCurrentUser({...user, role});
    
    showToast(`Bem-vindo de volta, ${user.name}!`, 'success');

    if (role === 'admin') setCurrentPage('admin-dashboard');
    else if (role === 'client') setCurrentPage('client-dashboard');
    else if (role === 'professional') setCurrentPage('professional-dashboard');
    else setCurrentPage('home');
  };

  const handleRegister = (role: UserRole, name: string) => {
      // Simula um registro e login automático
      const newUser: User = {
          id: `new-${Date.now()}`,
          name: name,
          email: 'novo@email.com',
          role: role,
          avatarUrl: `https://ui-avatars.com/api/?name=${name.replace(' ', '+')}&background=random`
      };
      
      setCurrentUser(newUser);
      showToast('Conta criada com sucesso!', 'success');
      
      if (role === 'professional') setCurrentPage('professional-dashboard');
      else setCurrentPage('client-dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage('home');
    setProfessionals(MOCK_PROFESSIONALS);
    showToast('Sessão encerrada.', 'info');
  };

  const handleSearch = async (query: string, filters: SearchFilters) => {
    setIsSearching(true);
    setSearchReasoning(null);
    setLastQuery(query);
    setActiveFilters(filters);
    
    try {
      let matchedPros = MOCK_PROFESSIONALS;

      // 1. AI Text Search (if query provided)
      if (query.trim()) {
          const { matchedProfessionalIds, reasoning, suggestedCategory } = await geminiService.findProfessionals(query);
          if (matchedProfessionalIds.length > 0) {
              matchedPros = MOCK_PROFESSIONALS.filter(p => matchedProfessionalIds.includes(p.id));
              setSearchReasoning(reasoning);
          } else {
             setSearchReasoning("A IA não encontrou correspondências exatas, mostrando resultados baseados nos filtros.");
          }
      }

      // 2. Apply Manual Filters
      matchedPros = matchedPros.filter(p => {
          let match = true;
          
          if (filters.location && !p.location.toLowerCase().includes(filters.location.toLowerCase())) match = false;
          if (filters.maxPrice && p.hourlyRate > filters.maxPrice) match = false;
          if (filters.minRating && p.rating < filters.minRating) match = false;
          if (filters.onlyAvailable && !p.available) match = false;
          
          return match;
      });

      setProfessionals(matchedPros);
      setCurrentPage('results');
      
    } catch (error) {
      console.error("Search failed", error);
      showToast('Erro ao realizar busca. Tente novamente.', 'error');
    } finally {
      setIsSearching(false);
    }
  };

  const resetHome = () => {
    setCurrentPage('home');
    setProfessionals(MOCK_PROFESSIONALS);
    setSearchReasoning(null);
    setActiveCategory('Todos');
    setLastQuery('');
    setActiveFilters({});
  };

  const handleNavigateToBlogPost = (id: number) => {
      setSelectedBlogPostId(id);
      setCurrentPage('blog-post');
      window.scrollTo(0,0);
  };

  // Filter effect for categories in Results page
  useEffect(() => {
    if (currentPage === 'results') {
        if (activeCategory === 'Todos') {
            if (!lastQuery) setProfessionals(MOCK_PROFESSIONALS);
        } else {
            setProfessionals(prev => prev.filter(p => p.category === activeCategory));
        }
    }
  }, [activeCategory, currentPage]);


  // Router Switcher
  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <Login onLogin={handleLogin} onNavigateBack={resetHome} />;

      case 'register':
        return <Register onRegister={handleRegister} onNavigateLogin={() => setCurrentPage('login')} />;
      
      case 'how-it-works':
        return <HowItWorks onNavigate={setCurrentPage} />;

      case 'for-professionals':
        return <ForProfessionals onNavigate={setCurrentPage} />;

      case 'about':
        return <AboutUs onNavigate={setCurrentPage} />;

      case 'careers':
        return <Careers />;

      case 'blog':
        return <Blog onNavigateToPost={handleNavigateToBlogPost} />;

      case 'blog-post':
        return selectedBlogPostId ? (
            <BlogPost 
                postId={selectedBlogPostId} 
                onBack={() => setCurrentPage('blog')}
                onNavigateToPost={handleNavigateToBlogPost}
            />
        ) : <Blog onNavigateToPost={handleNavigateToBlogPost} />;

      case 'chat':
        return currentUser ? <Chat currentUser={currentUser} /> : <Login onLogin={handleLogin} onNavigateBack={resetHome} />;

      case 'admin-dashboard':
        return currentUser?.role === 'admin' ? <AdminDashboard /> : <div className="p-8 text-center">Acesso negado</div>;

      case 'client-dashboard':
        return currentUser ? <ClientDashboard onNavigate={setCurrentPage} /> : <div className="p-8 text-center">Faça login para ver esta página</div>;

      case 'professional-dashboard':
        return currentUser?.role === 'professional' ? <ProfessionalDashboard userProfessionalId={currentUser.professionalId} /> : <div className="p-8 text-center">Acesso restrito a profissionais.</div>;

      case 'profile':
        return selectedProfessional ? (
          <ProfessionalDetails 
            professional={selectedProfessional} 
            onBack={() => setCurrentPage('results')}
            onContact={() => setIsModalOpen(true)}
          />
        ) : null;

      case 'results':
        return (
             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
             <div className="mb-8">
                <Button onClick={resetHome} variant="ghost" size="sm" className="mb-4 pl-0 hover:bg-transparent hover:text-blue-600">
                    ← Voltar para o início
                </Button>
                <div className="flex flex-col gap-6">
                    <h2 className="text-2xl font-bold text-slate-900">
                        Resultados encontrados
                        <span className="text-slate-400 font-normal text-lg ml-2">({professionals.length})</span>
                    </h2>
                    <div className="w-full">
                        <SearchBar onSearch={handleSearch} isSearching={isSearching} initialQuery={lastQuery} />
                    </div>
                </div>
                {searchReasoning && (
                    <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-lg text-blue-800 text-sm flex items-start animate-fade-in">
                        <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <p><span className="font-bold">Análise IA:</span> {searchReasoning}</p>
                    </div>
                )}
             </div>

             <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
                 {(['Todos', ...Object.values(Category)] as const).map(cat => (
                     <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all ${
                            activeCategory === cat 
                            ? 'bg-blue-600 text-white shadow-md' 
                            : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                        }`}
                     >
                         {cat}
                     </button>
                 ))}
             </div>

             {professionals.length === 0 ? (
                 <div className="text-center py-20 bg-slate-50 rounded-2xl border border-slate-200 border-dashed">
                     <svg className="mx-auto h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-slate-900">Nenhum profissional encontrado</h3>
                    <p className="mt-1 text-sm text-slate-500">Tente ajustar seus filtros, mudar a localização ou termo de busca.</p>
                    <Button onClick={() => handleSearch('', {})} variant="ghost" className="mt-4 text-blue-600">Limpar tudo</Button>
                 </div>
             ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {professionals.map(p => (
                        <ProfessionalCard 
                            key={p.id} 
                            professional={p} 
                            onSelect={(prof) => {
                                setSelectedProfessional(prof);
                                setCurrentPage('profile');
                            }} 
                        />
                    ))}
                </div>
             )}
          </div>
        );

      case 'home':
      default:
        return (
          <>
            {/* Hero Section with Real Image */}
            <div className="relative overflow-hidden bg-slate-900 pt-16 pb-32 lg:pt-24 lg:pb-40">
              <div className="absolute inset-0 z-0">
                  <img 
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
                    alt="Profissionais trabalhando juntos"
                    className="w-full h-full object-cover opacity-20" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-slate-900/40"></div>
              </div>

              <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
                <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl mb-6 drop-shadow-lg">
                  <span className="block">Conecte-se aos melhores</span>
                  <span className="block text-blue-400">Profissionais em Angola</span>
                </h1>
                <p className="mt-3 max-w-md mx-auto text-base text-slate-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl mb-10">
                  Um sistema inteligente que entende o seu problema e encontra o técnico ideal para resolvê-lo. Rápido, seguro e moderno, de Cabinda ao Cunene.
                </p>
                
                <div className="flex justify-center mb-16">
                  <SearchBar onSearch={handleSearch} isSearching={isSearching} />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
                    {[
                        { cat: Category.SAUDE, icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z', color: 'red', label: 'Saúde' },
                        { cat: Category.CONSTRUCAO, icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z', color: 'orange', label: 'Obras' },
                        { cat: Category.JURIDICO, icon: 'M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3', color: 'indigo', label: 'Jurídico' },
                        { cat: Category.TECNOLOGIA, icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', color: 'cyan', label: 'Tecnologia' }
                    ].map((item) => (
                        <div key={item.cat} className="bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-white/20 hover:border-blue-300 transition-all cursor-pointer group transform hover:-translate-y-1" onClick={() => { setActiveCategory(item.cat); setCurrentPage('results'); }}>
                            <div className={`w-10 h-10 bg-${item.color}-100 rounded-lg flex items-center justify-center mb-3 text-${item.color}-600 group-hover:scale-110 transition-transform`}>
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon}></path></svg>
                            </div>
                            <h3 className="font-semibold text-slate-800">{item.label}</h3>
                            <p className="text-xs text-slate-500">Ver profissionais</p>
                        </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Featured Section */}
            <div className="bg-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-bold text-slate-900 mb-8">Profissionais em Destaque</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                         {MOCK_PROFESSIONALS.slice(0, 4).map(p => (
                             <ProfessionalCard key={p.id} professional={p} onSelect={(prof) => {
                                setSelectedProfessional(prof);
                                setCurrentPage('profile');
                             }} />
                         ))}
                    </div>
                </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-50">
      {currentPage !== 'login' && currentPage !== 'register' && (
        <Navbar 
            user={currentUser} 
            onNavigate={setCurrentPage} 
            onLogout={handleLogout} 
        />
      )}

      <main className="flex-grow">
        {renderPage()}
      </main>

      {/* Footer */}
      {currentPage !== 'login' && currentPage !== 'register' && currentPage !== 'chat' && (
        <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <span className="font-bold text-2xl text-white">Elo<span className="text-blue-500">Profissa</span></span>
                    <p className="mt-4 text-sm text-slate-400">
                        A plataforma mais completa para conectar você aos melhores profissionais liberais de Angola. Segurança, rapidez e confiança.
                    </p>
                </div>
                <div>
                    <h4 className="font-bold text-white mb-4">Links Rápidos</h4>
                    <ul className="space-y-2 text-sm">
                        <li><button onClick={() => setCurrentPage('about')} className="hover:text-white transition">Sobre nós</button></li>
                        <li><button onClick={() => setCurrentPage('careers')} className="hover:text-white transition">Carreiras</button></li>
                        <li><button onClick={() => setCurrentPage('blog')} className="hover:text-white transition">Blog</button></li>
                        <li><button onClick={() => setCurrentPage('how-it-works')} className="hover:text-white transition">Como funciona</button></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-white mb-4">Contacto</h4>
                    <ul className="space-y-2 text-sm">
                        <li>suporte@eloprofissa.ao</li>
                        <li>+244 923 456 789</li>
                        <li className="flex gap-4 mt-4">
                            <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition cursor-pointer">
                                <span className="text-xs font-bold">FB</span>
                            </div>
                            <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition cursor-pointer">
                                <span className="text-xs font-bold">IG</span>
                            </div>
                            <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition cursor-pointer">
                                <span className="text-xs font-bold">IN</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 mt-8 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
                © 2024 EloProfissa. Feito com ❤️ em Angola.
            </div>
        </footer>
      )}

      <ContactModal 
        professional={selectedProfessional} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

      {/* Global Toast Notification */}
      <Toast 
        message={toast.msg} 
        type={toast.type} 
        isVisible={toast.visible} 
        onClose={() => setToast({ ...toast, visible: false })} 
      />
    </div>
  );
};

export default App;
