import React, { useEffect, useState } from 'react';
import { User, Copy, Check, MessageSquare, Heart, LogOut } from 'lucide-react';
import { getMessages, toggleLikeMessage } from '../services/api';
import type { Message } from '../types';

interface InboxViewProps {
  username: string;
  onLogout?: () => void;
}

const InboxView: React.FC<InboxViewProps> = ({ username, onLogout }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMessages();
    const interval = setInterval(loadMessages, 5000);
    return () => clearInterval(interval);
  }, [username]);

  const loadMessages = async () => {
    try {
      const response = await getMessages(username);
      setMessages(response.messages);
    } catch (err) {
      console.error('Failed to load messages:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleLike = async (messageId: string) => {
    try {
      await toggleLikeMessage(messageId);
      setMessages(prev => prev.map(msg => 
        msg._id === messageId ? { ...msg, liked: !msg.liked } : msg
      ));
    } catch (err) {
      console.error('Failed to toggle like:', err);
    }
  };

  const copyLink = () => {
    const link = `${window.location.origin}/?user=${username}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pb-24">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-xl border-b border-white/10 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-2 rounded-xl">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-white font-bold text-lg">@{username}</h2>
                <p className="text-purple-300 text-sm">{messages.length} messages</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={copyLink}
                className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-all duration-300"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Share'}
              </button>
              
              {onLogout && (
                <button
                  onClick={onLogout}
                  className="bg-red-500/20 hover:bg-red-500/30 text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-all duration-300"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center py-20">
            <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-12 border border-white/10">
              <MessageSquare className="w-20 h-20 text-purple-400 mx-auto mb-4 opacity-50" />
              <h3 className="text-white text-2xl font-bold mb-2">No messages yet</h3>
              <p className="text-purple-300">Share your link to receive anonymous messages!</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg, idx) => (
              <div
                key={msg._id}
                className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:bg-white/15 transition-all duration-300 transform hover:scale-[1.02] animate-slide-in"
                style={{
                  animationDelay: `${idx * 0.1}s`,
                  animationFillMode: 'backwards'
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="bg-gradient-to-br from-purple-500 to-pink-500 w-10 h-10 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">
                        #{msg.author.split('#')[1]}
                      </span>
                    </div>
                    <span className="text-purple-300 font-semibold">{msg.author}</span>
                  </div>
                  
                  <button
                    onClick={() => handleToggleLike(msg._id)}
                    className="group"
                  >
                    <Heart 
                      className={`w-6 h-6 transition-all duration-300 ${
                        msg.liked 
                          ? 'text-red-500 fill-red-500' 
                          : 'text-purple-400 group-hover:text-red-400 group-hover:scale-110'
                      }`}
                    />
                  </button>
                </div>
                
                <p className="text-white text-lg leading-relaxed">{msg.content}</p>
                
                <div className="text-purple-400 text-sm mt-3">
                  {new Date(msg.createdAt).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default InboxView;