
export enum Category {
  SAUDE = 'Saúde',
  TECNOLOGIA = 'Tecnologia',
  JURIDICO = 'Jurídico',
  DOMESTICO = 'Serviços Domésticos',
  EDUCACAO = 'Educação',
  CONSTRUCAO = 'Construção & Reformas',
  BELEZA = 'Beleza & Estética',
  FINANCAS = 'Finanças',
  OUTROS = 'Outros'
}

export type UserRole = 'client' | 'professional' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  professionalId?: string; // Link para o perfil profissional se for um pro
}

export interface PortfolioItem {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
  date: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number; // Em Kwanzas
  features: string[];
  tier: 'basic' | 'pro' | 'elite';
  badgeUrl?: string;
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string; // HTML content
  category: string;
  image: string;
  date: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
}

export interface Professional {
  id: string;
  name: string;
  title: string;
  category: Category;
  rating: number;
  reviewsCount: number;
  hourlyRate: number;
  location: string;
  imageUrl: string;
  description: string;
  skills: string[];
  available: boolean;
  joinedDate?: string;
  status?: 'active' | 'pending' | 'blocked';
  portfolio?: PortfolioItem[]; // Lista de trabalhos realizados
  subscriptionTier?: 'basic' | 'pro' | 'elite';
  isVerified?: boolean;
}

export interface ServiceRequest {
  id: string;
  clientId: string;
  professionalId: string;
  professional: Professional;
  status: 'pending' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';
  date: string;
  description: string;
  priceEstimate?: number;
}

export interface SearchResponse {
  matchedProfessionalIds: string[];
  reasoning: string;
  suggestedCategory?: string;
}

export interface SearchFilters {
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  onlyAvailable?: boolean;
}

// Chat Types
export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isRead: boolean;
}

export interface Conversation {
  id: string;
  participants: User[]; // Client + Professional
  messages: Message[];
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount: number;
}

// Tipos de navegação
export type PageView = 
  | 'home' 
  | 'results' 
  | 'login' 
  | 'register' 
  | 'profile' 
  | 'client-dashboard' 
  | 'professional-dashboard'
  | 'admin-dashboard'
  | 'how-it-works'
  | 'for-professionals'
  | 'about'
  | 'careers'
  | 'blog'
  | 'blog-post' // New Single Post View
  | 'chat';
