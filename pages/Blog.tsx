
import React from 'react';
import { MOCK_BLOG_POSTS } from '../constants';
import { PageView } from '../types';

interface BlogProps {
    onNavigateToPost: (id: number) => void;
}

export const Blog: React.FC<BlogProps> = ({ onNavigateToPost }) => {
  const posts = MOCK_BLOG_POSTS;

  return (
    <div className="bg-white min-h-screen">
      {/* Blog Hero */}
      <div className="relative bg-slate-900 py-24 sm:py-32">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1499750310159-52f8f7ea41d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Workspace"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-slate-900/60"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl">Blog EloProfissa</h1>
            <p className="mt-4 text-xl text-slate-300 max-w-2xl mx-auto">
                Dicas, notícias e histórias inspiradoras sobre o mercado de serviços em Angola.
            </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.map(post => (
                <div key={post.id} className="group cursor-pointer flex flex-col" onClick={() => onNavigateToPost(post.id)}>
                    <div className="relative h-64 overflow-hidden rounded-2xl mb-6">
                        <img 
                            src={post.image} 
                            alt={post.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-blue-600">
                            {post.category}
                        </div>
                    </div>
                    <div className="flex items-center text-xs text-slate-400 mb-2">
                        <span>{post.date}</span>
                        <span className="mx-2">•</span>
                        <span>5 min de leitura</span>
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">{post.title}</h2>
                    <p className="text-slate-600 line-clamp-3 mb-4 flex-1">
                        {post.excerpt}
                    </p>
                    <div className="flex items-center gap-3 mt-auto pt-4 border-t border-slate-100">
                        <img src={post.author.avatar} className="w-8 h-8 rounded-full" alt="" />
                        <span className="text-sm font-medium text-slate-700">{post.author.name}</span>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};
