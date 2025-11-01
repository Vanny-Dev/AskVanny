import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { sendMessage } from '../services/api';

interface SendViewProps {
  recipient: string;
  onSuccess: () => void;
}

const SendView: React.FC<SendViewProps> = ({ recipient, onSuccess }) => {
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const handleSend = async () => {
    if (!message.trim() || sending) return;
    
    setSending(true);
    setError('');
    
    try {
      await sendMessage(recipient, message);
      setMessage('');
      onSuccess();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to send message');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center p-4 pb-24">
      <div className="w-full max-w-2xl">
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 transform hover:scale-[1.01] transition-all duration-300">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-500 p-3 rounded-xl">
              <Send className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Send Anonymous Message</h2>
              <p className="text-gray-600">to @{recipient}</p>
            </div>
          </div>
          
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your anonymous message here... Be kind! 💜"
            className="w-full h-48 p-4 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:outline-none transition-all duration-300 resize-none text-lg"
            maxLength={500}
          />
          
          {error && (
            <p className="text-red-500 text-sm mt-2">{error}</p>
          )}
          
          <div className="flex items-center justify-between mt-4">
            <span className="text-sm text-gray-500">{message.length}/500</span>
            
            <button
              onClick={handleSend}
              disabled={!message.trim() || sending}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-2xl hover:shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              {sending ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send Anonymously
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendView;