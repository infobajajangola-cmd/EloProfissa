
import { Professional, Category, ServiceRequest, User, PortfolioItem, Conversation, BlogPost, SubscriptionPlan } from './types';

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'plan_basic',
    name: 'Plano Grátis',
    price: 0,
    tier: 'basic',
    features: ['Perfil Básico', '3 Orçamentos/mês', 'Taxa de serviço padrão'],
    badgeUrl: ''
  },
  {
    id: 'plan_pro',
    name: 'Profissional Pro',
    price: 5000,
    tier: 'pro',
    features: ['Orçamentos Ilimitados', 'Selo de Verificado', 'Destaque nas buscas (Nível 1)', 'Suporte Prioritário'],
    badgeUrl: 'https://cdn-icons-png.flaticon.com/512/7595/7595571.png'
  },
  {
    id: 'plan_elite',
    name: 'Elite Business',
    price: 15000,
    tier: 'elite',
    features: ['Tudo do Pro', 'Topo das buscas sempre', 'Gestor de Conta Dedicado', 'Taxa de serviço zero', 'Acesso a leads exclusivos'],
    badgeUrl: 'https://cdn-icons-png.flaticon.com/512/6941/6941697.png'
  }
];

export const MOCK_BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: '5 Dicas para contratar um eletricista em Luanda',
    excerpt: 'Saiba como evitar problemas e garantir a segurança da sua casa com estas dicas essenciais antes de fechar negócio.',
    content: `
      <p>Contratar um eletricista em Luanda pode ser um desafio se você não souber o que procurar. A segurança da sua casa e da sua família depende de instalações elétricas bem feitas. Aqui estão 5 dicas fundamentais:</p>
      
      <h3>1. Verifique as credenciais</h3>
      <p>Não tenha vergonha de pedir referências ou certificações. Na EloProfissa, todos os profissionais passam por uma verificação básica, mas profissionais com o selo "Elite" têm suas certificações validadas manualmente.</p>

      <h3>2. Peça um orçamento detalhado</h3>
      <p>Evite surpresas. O orçamento deve incluir o custo da mão de obra e uma estimativa clara dos materiais. Em Angola, os preços dos materiais podem variar, então é bom ter essa lista para comparar em lojas como a Pumangol ou a Omatapalo.</p>

      <h3>3. Experiência com a rede local</h3>
      <p>A rede elétrica em alguns bairros de Luanda tem oscilações específicas. Um bom eletricista sabe como instalar protetores de surto e estabilizadores para proteger seus eletrodomésticos.</p>

      <h3>4. Segurança em primeiro lugar</h3>
      <p>Observe se o profissional utiliza equipamentos de proteção individual (EPIs). Isso demonstra profissionalismo e cuidado com o trabalho.</p>

      <h3>5. Avaliações anteriores</h3>
      <p>Sempre leia os comentários de outros clientes na plataforma. Eles são o melhor indicador da pontualidade e da qualidade do serviço.</p>
    `,
    category: 'Manutenção',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    date: '10 Fev 2024',
    author: {
      name: 'Eng. Carlos Manuel',
      avatar: 'https://ui-avatars.com/api/?name=Carlos+Manuel&background=0D8ABC&color=fff',
      role: 'Especialista em Elétrica'
    }
  },
  {
    id: 2,
    title: 'Como funciona a regularização de PMEs na AGT',
    excerpt: 'Entenda os passos necessários para formalizar seu negócio, obter o NIF e evitar multas fiscais.',
    content: `
      <p>Formalizar o seu negócio em Angola é o primeiro passo para o crescimento sustentável. Muitos empreendedores temem a burocracia, mas estar regularizado com a AGT (Administração Geral Tributária) traz inúmeros benefícios.</p>

      <h3>O que é o NIF e por que você precisa dele?</h3>
      <p>O Número de Identificação Fiscal é a identidade da sua empresa. Sem ele, você não pode emitir faturas válidas, participar de concursos públicos ou abrir contas bancárias empresariais.</p>

      <h3>Passo a Passo Simplificado:</h3>
      <ol>
        <li><strong>Registo Comercial:</strong> Feito no Guichê Único da Empresa.</li>
        <li><strong>Cadastro na AGT:</strong> Com o certidão comercial, dirija-se a uma repartição fiscal.</li>
        <li><strong>Regime de Tributação:</strong> Escolha entre o Regime Geral ou o Simplificado, dependendo do seu volume de negócios.</li>
      </ol>

      <p>Profissionais contábeis na EloProfissa podem ajudar você a navegar por todo esse processo sem dores de cabeça, garantindo que você pague apenas o justo e mantenha seu negócio 100% legal.</p>
    `,
    category: 'Empreendedorismo',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    date: '05 Fev 2024',
    author: {
      name: 'Dra. Cláudia Martins',
      avatar: 'https://picsum.photos/id/1027/100/100',
      role: 'Contadora Certificada'
    }
  },
  {
    id: 3,
    title: 'Tendências de decoração para casas no Kilamba',
    excerpt: 'Ideias modernas, acessíveis e climáticas para transformar o seu apartamento na centralidade.',
    content: `
      <p>As centralidades como o Kilamba trouxeram um novo padrão de moradia para Luanda. Mas como deixar esses apartamentos com a sua cara, sem gastar uma fortuna e mantendo o ambiente fresco?</p>

      <h3>1. Cores Claras e Tons Terrosos</h3>
      <p>Para combater o calor, opte por paredes brancas ou em tons de areia. Use cores vibrantes (como o laranja ou azul turquesa) nos detalhes, como almofadas e quadros, para trazer a alma angolana para dentro de casa.</p>

      <h3>2. Plantas Tropicais</h3>
      <p>Espadas de São Jorge e Palmeiras Raphis se adaptam bem a interiores e ajudam a purificar o ar.</p>

      <h3>3. Mobiliário Multifuncional</h3>
      <p>Os apartamentos pedem otimização de espaço. Sofás-cama, mesas retráteis e estantes verticais são ótimas pedidas. Você pode contratar marceneiros na EloProfissa para criar móveis sob medida perfeitos para sua sala.</p>
    `,
    category: 'Decoração',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4f9d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    date: '28 Jan 2024',
    author: {
      name: 'Sofia Design',
      avatar: 'https://ui-avatars.com/api/?name=Sofia+D&background=FF5722&color=fff',
      role: 'Designer de Interiores'
    }
  }
];

const MOCK_PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'p1',
    title: 'Website E-commerce Kero',
    imageUrl: 'https://picsum.photos/id/1/600/400',
    description: 'Desenvolvimento completo de loja virtual com integração de pagamentos Multicaixa.',
    date: '2023-11-15'
  },
  {
    id: 'p2',
    title: 'App de Entregas Luanda',
    imageUrl: 'https://picsum.photos/id/119/600/400',
    description: 'Aplicativo móvel para gestão de logística e entregas em tempo real.',
    date: '2024-01-20'
  }
];

export const MOCK_PROFESSIONALS: Professional[] = [
  {
    id: '1',
    name: 'Dr. Roberto Manuel',
    title: 'Advogado Trabalhista',
    category: Category.JURIDICO,
    rating: 4.9,
    reviewsCount: 124,
    hourlyRate: 25000,
    location: 'Luanda, Talatona',
    imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    description: 'Especialista em direitos do trabalhador e contratos corporativos com mais de 15 anos de experiência. Escritório localizado no Belas Business Park.',
    skills: ['Direito Trabalhista', 'Contratos', 'Consultoria Jurídica', 'Mediação'],
    available: true,
    joinedDate: '2023-01-15',
    status: 'active',
    isVerified: true,
    subscriptionTier: 'elite'
  },
  {
    id: '2',
    name: 'Mariana Costa',
    title: 'Psicóloga Clínica',
    category: Category.SAUDE,
    rating: 5.0,
    reviewsCount: 89,
    hourlyRate: 15000,
    location: 'Benguela, Centro',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    description: 'Atendimento humanizado focado em terapia cognitivo-comportamental. Consultas presenciais e online para todo o país.',
    skills: ['Terapia Cognitiva', 'Ansiedade', 'Mindfulness', 'Terapia de Casal'],
    available: true,
    joinedDate: '2023-03-10',
    status: 'active',
    subscriptionTier: 'pro'
  },
  {
    id: '3',
    name: 'Carlos Oliveira',
    title: 'Eletricista Predial',
    category: Category.CONSTRUCAO,
    rating: 4.8,
    reviewsCount: 210,
    hourlyRate: 8000,
    location: 'Luanda, Kilamba',
    imageUrl: 'https://images.unsplash.com/photo-1542178243-bc20204b769f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    description: 'Soluções elétricas residenciais e comerciais. Instalação de geradores, manutenção de AC e quadros elétricos.',
    skills: ['Instalação Elétrica', 'Manutenção de Geradores', 'AC', 'Projetos Elétricos'],
    available: true,
    joinedDate: '2022-11-05',
    status: 'active',
    isVerified: true,
    subscriptionTier: 'elite'
  },
  {
    id: '4',
    name: 'Ana Souza',
    title: 'Desenvolvedora Full Stack',
    category: Category.TECNOLOGIA,
    rating: 4.9,
    reviewsCount: 56,
    hourlyRate: 12000,
    location: 'Remoto / Huambo',
    imageUrl: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    description: 'Desenvolvimento de sites e aplicativos modernos. Especialista em React e Laravel. Atendo empresas de Luanda remotamente.',
    skills: ['React', 'Laravel', 'Node.js', 'UI/UX', 'Mobile'],
    available: false,
    joinedDate: '2023-06-20',
    status: 'active',
    portfolio: MOCK_PORTFOLIO_ITEMS, // Adicionando portfólio para Ana Souza
    subscriptionTier: 'pro'
  },
  {
    id: '5',
    name: 'Pedro Santos',
    title: 'Personal Trainer',
    category: Category.SAUDE,
    rating: 4.7,
    reviewsCount: 140,
    hourlyRate: 7500,
    location: 'Luanda, Maianga',
    imageUrl: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    description: 'Treinos personalizados para emagrecimento e ganho de massa muscular. Acompanhamento em ginásios ou ao domicílio.',
    skills: ['Musculação', 'Crossfit', 'Nutrição Esportiva'],
    available: true,
    joinedDate: '2023-02-15',
    status: 'active'
  },
  {
    id: '6',
    name: 'Cláudia Martins',
    title: 'Contadora',
    category: Category.FINANCAS,
    rating: 5.0,
    reviewsCount: 75,
    hourlyRate: 20000,
    location: 'Luanda, Mutamba',
    imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    description: 'Gestão contábil para PMEs. Especialista em impostos da AGT e regularização de empresas.',
    skills: ['AGT', 'Gestão Financeira', 'Consultoria Fiscal', 'Contabilidade Organizada'],
    available: true,
    joinedDate: '2023-04-01',
    status: 'active',
    isVerified: true,
    subscriptionTier: 'elite'
  },
  {
    id: '7',
    name: 'João Ferreira',
    title: 'Canalizador Profissional',
    category: Category.CONSTRUCAO,
    rating: 4.6,
    reviewsCount: 300,
    hourlyRate: 6000,
    location: 'Lubango, Huíla',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    description: 'Detecção de vazamentos e reparos hidráulicos de emergência. Instalação de tanques de água e eletrobombas.',
    skills: ['Hidráulica', 'Montagem de Tanques', 'Instalação de Torneiras', 'Desentupimento'],
    available: true,
    joinedDate: '2022-08-12',
    status: 'pending'
  },
  {
    id: '8',
    name: 'Fernanda Lima',
    title: 'Professora de Inglês',
    category: Category.EDUCACAO,
    rating: 4.9,
    reviewsCount: 112,
    hourlyRate: 5000,
    location: 'Online / Luanda',
    imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    description: 'Aulas de inglês para conversação e negócios. Preparação para exames internacionais.',
    skills: ['Inglês', 'IELTS Prep', 'Conversação', 'Business English'],
    available: true,
    joinedDate: '2023-05-30',
    status: 'active'
  }
];

export const MOCK_REQUESTS: ServiceRequest[] = [
  {
    id: 'req-1',
    clientId: 'client-1',
    professionalId: '3',
    professional: MOCK_PROFESSIONALS[2],
    status: 'in_progress',
    date: '2024-05-15',
    description: 'Preciso trocar o disjuntor principal da casa no Kilamba.',
    priceEstimate: 15000
  },
  {
    id: 'req-2',
    clientId: 'client-1',
    professionalId: '6',
    professional: MOCK_PROFESSIONALS[5],
    status: 'completed',
    date: '2024-04-10',
    description: 'Fecho de contas anual e submissão na AGT.',
    priceEstimate: 50000
  },
  {
    id: 'req-3',
    clientId: 'client-1',
    professionalId: '1',
    professional: MOCK_PROFESSIONALS[0],
    status: 'pending',
    date: '2024-05-20',
    description: 'Revisão de contrato de arrendamento comercial.',
    priceEstimate: 30000
  },
  {
    id: 'req-4',
    clientId: 'client-1',
    professionalId: '4', // Pedido para Ana Souza
    professional: MOCK_PROFESSIONALS[3],
    status: 'pending',
    date: '2024-06-01',
    description: 'Criação de um site para minha padaria no Huambo.',
    priceEstimate: 80000
  }
];

export const MOCK_USERS: Record<string, User> = {
  client: {
    id: 'client-1',
    name: 'João Cliente',
    email: 'joao@cliente.ao',
    role: 'client',
    avatarUrl: 'https://ui-avatars.com/api/?name=Joao+Cliente&background=0D8ABC&color=fff'
  },
  admin: {
    id: 'admin-1',
    name: 'Admin Sistema',
    email: 'admin@eloprofissa.ao',
    role: 'admin',
    avatarUrl: 'https://ui-avatars.com/api/?name=Admin+Sys&background=111827&color=fff'
  },
  professional: {
    id: 'prof-4',
    name: 'Ana Souza',
    email: 'ana.souza@dev.ao',
    role: 'professional',
    avatarUrl: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    professionalId: '4' // Liga ao perfil da Ana Souza
  }
};

export const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-1',
    participants: [
       MOCK_USERS['client'],
       { ...MOCK_USERS['professional'], name: MOCK_PROFESSIONALS[2].name, avatarUrl: MOCK_PROFESSIONALS[2].imageUrl }
    ],
    lastMessage: 'Vou chegar às 14h para verificar o quadro elétrico.',
    lastMessageTime: '10:30',
    unreadCount: 1,
    messages: [
      { id: 'm1', senderId: 'client-1', text: 'Bom dia, sr. Carlos. Pode vir hoje?', timestamp: '09:00', isRead: true },
      { id: 'm2', senderId: '3', text: 'Bom dia! Posso sim.', timestamp: '09:15', isRead: true },
      { id: 'm3', senderId: '3', text: 'Vou chegar às 14h para verificar o quadro elétrico.', timestamp: '10:30', isRead: false },
    ]
  },
  {
    id: 'conv-2',
    participants: [
       MOCK_USERS['client'],
       { ...MOCK_USERS['professional'], name: MOCK_PROFESSIONALS[5].name, avatarUrl: MOCK_PROFESSIONALS[5].imageUrl }
    ],
    lastMessage: 'Obrigado pelo serviço, dra. Cláudia!',
    lastMessageTime: 'Ontem',
    unreadCount: 0,
    messages: [
      { id: 'm1', senderId: '6', text: 'João, os documentos da AGT foram submetidos.', timestamp: '14:00', isRead: true },
      { id: 'm2', senderId: 'client-1', text: 'Obrigado pelo serviço, dra. Cláudia!', timestamp: '14:30', isRead: true },
    ]
  }
];
