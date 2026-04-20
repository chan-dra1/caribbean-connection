import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, User, MessageCircle, MoreVertical, X } from 'lucide-react';

const CHAT_USERNAME_KEY = 'caribbean-connection-chat-username';

const INITIAL_MESSAGES = [
  { id: 1, user: 'RadioHost', text: 'Welcome to the live show! What are we listening to today?', isHost: true },
  { id: 2, user: 'IslandVibes99', text: 'Play some old school reggae please!', isHost: false },
  { id: 3, user: 'SocaKing', text: 'Vibing from NY! 🔥', isHost: false },
];

const ChatWidget = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [username, setUsername] = useState('');
  const [hasSetUsername, setHasSetUsername] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(CHAT_USERNAME_KEY);
      if (saved?.trim()) {
        setUsername(saved.trim());
        setHasSetUsername(true);
      }
    } catch {
      /* sessionStorage unavailable */
    }
  }, []);

  // Auto-scroll to bottom on new message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newMessage = {
      id: Date.now(),
      user: username || 'Guest',
      text: inputValue.trim(),
      isHost: false,
    };

    setMessages([...messages, newMessage]);
    setInputValue('');
  };

  const joinChat = (e) => {
    e.preventDefault();
    const name = username.trim();
    if (name) {
      try {
        sessionStorage.setItem(CHAT_USERNAME_KEY, name);
      } catch {
        /* ignore */
      }
      setHasSetUsername(true);
    }
  };

  return (
    <motion.div 
      initial={{ x: '100%', opacity: 0 }}
      animate={{ x: isOpen ? 0 : '100%', opacity: isOpen ? 1 : 0 }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed top-0 right-0 w-[85%] md:w-[350px] h-full bg-dark-900/95 backdrop-blur-2xl border-l border-white/10 flex flex-col z-50 shadow-2xl"
      style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
    >
       {/* Header */}
       <div className="h-20 border-b border-white/10 flex items-center justify-between px-6 bg-dark-800/50 shrink-0">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-teal-500/20 flex items-center justify-center border border-teal-500/50">
               <MessageCircle className="text-teal-400" size={20} />
             </div>
             <div>
                <h3 className="text-white font-bold text-sm tracking-wide">Live Studio Chat</h3>
                <p className="text-xs text-teal-500 font-semibold">{messages.length + 24} Listeners</p>
             </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X size={20} />
          </button>
       </div>

       {/* Chat Messages */}
       <div 
         ref={scrollRef}
         className="flex-1 overflow-y-auto p-6 space-y-6 flex flex-col pt-8"
       >
         {messages.map((msg) => (
            <motion.div 
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               key={msg.id} 
               className="flex flex-col gap-1"
            >
               <div className="flex items-baseline gap-2">
                 <span className={`text-xs font-bold ${msg.isHost ? 'text-teal-400' : 'text-slate-300'}`}>
                    {msg.user}
                    {msg.isHost && <span className="ml-2 px-1.5 py-0.5 bg-teal-500/20 text-teal-300 text-[10px] rounded uppercase">Host</span>}
                 </span>
               </div>
               <div className="bg-dark-800/80 p-3 rounded-tr-xl rounded-b-xl rounded-tl-sm border border-white/5 text-sm text-slate-200 leading-relaxed max-w-[90%] break-words">
                 {msg.text}
               </div>
            </motion.div>
         ))}
       </div>

       {/* Input Area */}
       <div className="p-4 border-t border-white/10 bg-dark-900/95 shrink-0">
         {!hasSetUsername ? (
           <form onSubmit={joinChat} className="flex flex-col gap-2 relative">
             <div className="absolute -top-10 left-0 text-xs text-teal-400 font-bold mb-2">Join chat to request songs!</div>
             <input 
               type="text" 
               placeholder="Choose a username..." 
               value={username}
               onChange={(e) => setUsername(e.target.value)}
               className="w-full bg-dark-800 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-teal-500 outline-none transition-colors"
               maxLength={15}
             />
             <button disabled={!username.trim()} className="w-full bg-teal-600 disabled:opacity-50 hover:bg-teal-500 text-white text-sm font-bold py-3 rounded-xl transition-colors">
               Enter Chat
             </button>
           </form>
         ) : (
           <form onSubmit={handleSend} className="relative flex items-center">
             <input 
               type="text"
               value={inputValue}
               onChange={(e) => setInputValue(e.target.value)}
               placeholder="Type a message..."
               className="w-full bg-dark-800 border border-white/10 rounded-full pl-5 pr-12 py-3 text-sm text-white focus:border-teal-500 outline-none transition-colors"
             />
             <button 
               type="submit"
               disabled={!inputValue.trim()}
               className="absolute right-2 w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-white disabled:opacity-50 hover:bg-teal-400 transition-colors"
             >
                <Send size={14} />
             </button>
           </form>
         )}
       </div>
    </motion.div>
  );
};

export default ChatWidget;
