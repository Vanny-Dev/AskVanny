import React from 'react';
import { MessageSquare, Send } from 'lucide-react';

interface NavigationProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeView, setActiveView }) => {
  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-white/95 backdrop-blur-xl rounded-full shadow-2xl px-2 py-2 flex gap-2 border border-gray-200">
        <button
          onClick={() => setActiveView('inbox')}
          className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 ${
            activeView === 'inbox'
              ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <MessageSquare className="w-5 h-5" />
          Inbox
        </button>
        
        <button
          onClick={() => setActiveView('send')}
          className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 ${
            activeView === 'send' || activeView === 'success'
              ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Send className="w-5 h-5" />
          Send
        </button>
      </div>
    </div>
  );
};

export default Navigation;