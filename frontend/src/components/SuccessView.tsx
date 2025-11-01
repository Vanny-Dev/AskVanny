import React from 'react';
import { Check } from 'lucide-react';

interface SuccessViewProps {
  onSendAnother: () => void;
}

const SuccessView: React.FC<SuccessViewProps> = ({ onSendAnother }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 flex items-center justify-center p-4 pb-24">
      <div className="w-full max-w-md">
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 text-center transform animate-bounce">
          <div className="bg-gradient-to-br from-green-500 to-emerald-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-white" />
          </div>
          
          <h2 className="text-3xl font-bold text-gray-800 mb-3">Message Sent! 🎉</h2>
          <p className="text-gray-600 mb-8">Your anonymous message has been delivered successfully</p>
          
          <button
            onClick={onSendAnother}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-2xl font-semibold hover:shadow-2xl hover:shadow-green-500/50 transform hover:scale-105 transition-all duration-300"
          >
            Send Another Message
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessView;