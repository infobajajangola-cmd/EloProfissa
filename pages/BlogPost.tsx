
import React from 'react';
import { MOCK_BLOG_POSTS } from '../constants';
import { Button } from '../components/Button';

interface BlogPostProps {
  postId: number;
  onBack: () => void;
  onNavigateToPost: (id: number) => void;
}

export const BlogPost: React.FC<BlogPostProps> = ({ postId, onBack, onNavigateToPost }) => {
  const post = MOCK_BLOG_POSTS.find(p => p.id === postId);
  
  if (!post) {
    return <div className="p-10 text-center">Artigo não encontrado. <button onClick={onBack} className="text-blue-600 underline">Voltar</button></div>;
  }

  const relatedPosts = MOCK_BLOG_POSTS.filter(p => p.id !== postId).slice(0, 2);

  return (
    <div className="bg-white min-h-screen">
       {/* Hero Image */}
       <div className="relative h-[400px] w-full">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
            <div className="absolute top-6 left-6 md:left-12">
                <Button variant="ghost" className="text-white hover:bg-white/20 hover:text-white border-white/30" onClick={onBack}>
                    ← Voltar para o Blog
                </Button>
            </div>
            <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
                <div className="max-w-4xl mx-auto">
                    <span className="inline-block px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full mb-4">
                        {post.category}
                    </span>
                    <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-4">
                        {post.title}
                    </h1>
                    <div className="flex items-center text-white/90 gap-6 text-sm">
                        <div className="flex items-center gap-2">
                             <img src={post.author.avatar} className="w-8 h-8 rounded-full border border-white/50" alt={post.author.name} />
                             <span className="font-medium">{post.author.name}</span>
                        </div>
                        <span>•</span>
                        <span>{post.date}</span>
                        <span>•</span>
                        <span>5 min de leitura</span>
                    </div>
                </div>
            </div>
       </div>

       {/* Content */}
       <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
            <div className="prose prose-lg prose-blue mx-auto text-slate-600">
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>

            {/* Author Bio Box */}
            <div className="mt-16 p-8 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-6">
                <img src={post.author.avatar} alt={post.author.name} className="w-20 h-20 rounded-full object-cover shadow-sm" />
                <div>
                    <h4 className="text-lg font-bold text-slate-900">Sobre o Autor</h4>
                    <p className="font-medium text-blue-600">{post.author.name}</p>
                    <p className="text-sm text-slate-500 mt-1">{post.author.role}. Escreve sobre tendências e dicas para o mercado angolano.</p>
                </div>
            </div>
       </div>

       {/* Related Posts */}
       <div className="bg-slate-50 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-8">Você também pode gostar</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {relatedPosts.map(related => (
                        <div key={related.id} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden cursor-pointer hover:shadow-md transition-all group" onClick={() => onNavigateToPost(related.id)}>
                            <div className="h-48 overflow-hidden">
                                <img src={related.image} alt={related.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            </div>
                            <div className="p-6">
                                <span className="text-xs font-bold text-blue-600 uppercase tracking-wide">{related.category}</span>
                                <h4 className="font-bold text-slate-900 mt-2 group-hover:text-blue-600 transition-colors">{related.title}</h4>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
       </div>
    </div>
  );
};
