import { useState, useEffect } from 'react';
import InboxView from './components/InboxView';
import SendView from './components/SendView';
import SuccessView from './components/SuccessView';
import Navigation from './components/Navigation';
import LoginView from './components/LoginView';
import HomeView from './components/HomeView';

function App() {
  const [activeView, setActiveView] = useState<'home' | 'login' | 'inbox' | 'send' | 'success'>('send');
  const [isOwner, setIsOwner] = useState(false);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [recipientUser, setRecipientUser] = useState('');

  useEffect(() => {
    // Check if user is logged in
    const loggedInUser = localStorage.getItem('username');
    if (loggedInUser) {
      setCurrentUser(loggedInUser);
      setIsOwner(true);
      setRecipientUser(loggedInUser);
      setActiveView('inbox');
    } else {
      // Check URL for recipient
      const params = new URLSearchParams(window.location.search);
      const user = params.get('user');
      if (user) {
        setRecipientUser(user);
        setActiveView('send');
      } else {
        setActiveView('home');
      }
    }
  }, []);

  const handleUserCreated = (username: string) => {
    setCurrentUser(username);
    setRecipientUser(username);
    setIsOwner(true);
    localStorage.setItem('username', username);
    setActiveView('inbox');
  };

  const handleSuccess = () => {
    setActiveView('success');
  };

  const handleSendAnother = () => {
    setActiveView('send');
  };

  const handleOwnerLogin = (username: string) => {
    setCurrentUser(username);
    setRecipientUser(username);
    setIsOwner(true);
    localStorage.setItem('username', username);
    setActiveView('inbox');
  };

  const handleBackToSend = () => {
    setActiveView('send');
  };

  const handleLogout = () => {
    localStorage.removeItem('username');
    setCurrentUser(null);
    setIsOwner(false);
    setActiveView('home');
  };

  // New user flow
  if (!currentUser && !recipientUser) {
    return <HomeView onUserCreated={handleUserCreated} />;
  }

  // Owner access (logged in)
  if (isOwner && currentUser) {
    return (
      <>
        {activeView === 'inbox' && <InboxView username={currentUser} onLogout={handleLogout} />}
        {activeView === 'send' && <SendView recipient={currentUser} onSuccess={handleSuccess} />}
        {activeView === 'success' && <SuccessView onSendAnother={handleSendAnother} />}
        
        <Navigation
          activeView={activeView}
          setActiveView={(v: string) => setActiveView(v as 'home' | 'login' | 'inbox' | 'send' | 'success')}
        />
      </>
    );
  }

  // Public view: only send messages
  return (
    <>
      {activeView === 'login' && <LoginView onLogin={handleOwnerLogin} onBack={handleBackToSend} />}
      {activeView === 'send' && <SendView recipient={recipientUser} onSuccess={handleSuccess} />}
      {activeView === 'success' && <SuccessView onSendAnother={handleSendAnother} />}
      
      {/* Show minimal navigation for public users - hide when on login view */}
      {activeView !== 'login' && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
          <button
            onClick={() => setActiveView('login')}
            className="bg-white/95 backdrop-blur-xl rounded-full shadow-2xl px-6 py-3 text-sm text-gray-600 hover:text-gray-900 border border-gray-200 transition-all duration-300 font-bold"
          >
            Owner Login
          </button>
        </div>
      )}
    </>
  );
}

export default App;