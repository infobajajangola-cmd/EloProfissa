
import React, { useState } from 'react';
import { Conversation, Message, User } from '../types';
import { MOCK_CONVERSATIONS } from '../constants';
import { Button } from '../components/Button';

interface ChatProps {
  currentUser: User;
}

export const Chat: React.FC<ChatProps> = ({ currentUser }) => {
  const [conversations, setConversations] = useState<Conversation[]>(MOCK_CONVERSATIONS);
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');

  const selectedConversation = conversations.find(c => c.id === selectedConversationId);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConversationId) return;

    const msg: Message = {
        id: `m-${Date.now()}`,
        senderId: currentUser.id,
        text: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isRead: false
    };

    const updatedConversations = conversations.map(c => {
        if (c.id === selectedConversationId) {
            return {
                ...c,
                messages: [...c.messages, msg],
                lastMessage: newMessage,
                lastMessageTime: 'Agora'
            };
        }
        return c;
    });

    setConversations(updatedConversations);
    setNewMessage('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 h-[calc(100vh-80px)]">
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden flex h-full">
        
        {/* Sidebar List */}
        <div className={`w-full md:w-1/3 border-r border-slate-200 flex flex-col ${selectedConversationId ? 'hidden md:flex' : 'flex'}`}>
            <div className="p-4 border-b border-slate-200 bg-slate-50">
                <h2 className="text-lg font-bold text-slate-900">Mensagens</h2>
            </div>
            <div className="flex-1 overflow-y-auto">
                {conversations.map(conv => {
                    const otherUser = conv.participants.find(p => p.id !== currentUser.id) || conv.participants[0];
                    return (
                        <div 
                            key={conv.id}
                            onClick={() => setSelectedConversationId(conv.id)}
                            className={`p-4 border-b border-slate-100 cursor-pointer hover:bg-slate-50 transition-colors ${selectedConversationId === conv.id ? 'bg-blue-50 border-l-4 border-l-blue-600' : ''}`}
                        >
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <img src={otherUser.avatarUrl} alt={otherUser.name} className="w-12 h-12 rounded-full object-cover" />
                                    {conv.unreadCount > 0 && (
                                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white">
                                            {conv.unreadCount}
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-semibold text-slate-900 truncate">{otherUser.name}</h3>
                                        <span className="text-xs text-slate-400">{conv.lastMessageTime}</span>
                                    </div>
                                    <p className={`text-sm truncate ${conv.unreadCount > 0 ? 'font-bold text-slate-800' : 'text-slate-500'}`}>
                                        {conv.lastMessage}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>

        {/* Chat Area */}
        <div className={`w-full md:w-2/3 flex flex-col ${!selectedConversationId ? 'hidden md:flex' : 'flex'}`}>
            {selectedConversation ? (
                <>
                    {/* Chat Header */}
                    <div className="p-4 border-b border-slate-200 flex items-center gap-4 bg-white shadow-sm z-10">
                        <button onClick={() => setSelectedConversationId(null)} className="md:hidden text-slate-500">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                        </button>
                        <img 
                            src={selectedConversation.participants.find(p => p.id !== currentUser.id)?.avatarUrl} 
                            alt="User" 
                            className="w-10 h-10 rounded-full" 
                        />
                        <div>
                            <h3 className="font-bold text-slate-900">
                                {selectedConversation.participants.find(p => p.id !== currentUser.id)?.name}
                            </h3>
                            <span className="text-xs text-green-500 flex items-center gap-1">
                                <span className="w-2 h-2 bg-green-500 rounded-full"></span> Online agora
                            </span>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
                        {selectedConversation.messages.map((msg) => {
                            const isMe = msg.senderId === currentUser.id;
                            return (
                                <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[75%] rounded-2xl px-4 py-3 shadow-sm ${
                                        isMe 
                                        ? 'bg-blue-600 text-white rounded-br-none' 
                                        : 'bg-white text-slate-800 border border-slate-100 rounded-bl-none'
                                    }`}>
                                        <p className="text-sm">{msg.text}</p>
                                        <p className={`text-[10px] text-right mt-1 ${isMe ? 'text-blue-100' : 'text-slate-400'}`}>
                                            {msg.timestamp}
                                            {isMe && (
                                                <span className="ml-1">
                                                    {msg.isRead ? '✓✓' : '✓'}
                                                </span>
                                            )}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Input Area */}
                    <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-200 bg-white">
                        <div className="flex items-center gap-2">
                            <button type="button" className="p-2 text-slate-400 hover:text-blue-600 transition-colors">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path></svg>
                            </button>
                            <input 
                                type="text" 
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Digite sua mensagem..." 
                                className="flex-1 border border-slate-300 rounded-full py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <Button type="submit" variant="primary" className="rounded-full w-12 h-12 p-0 flex items-center justify-center">
                                <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
                            </Button>
                        </div>
                    </form>
                </>
            ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-slate-400 p-8 text-center bg-slate-50">
                    <div className="w-24 h-24 bg-slate-200 rounded-full flex items-center justify-center mb-4">
                        <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                    </div>
                    <h3 className="text-xl font-bold text-slate-700">Suas Mensagens</h3>
                    <p className="max-w-xs mt-2">Selecione uma conversa ao lado para combinar detalhes com o profissional.</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};
