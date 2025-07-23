import React, { useState } from 'react';
import './styles.css';

const FALLBACKS = [
  "I'm not sure I understand, but I'm always learning!",
  "Could you rephrase that? Crypto can be confusing!",
  "Sorry, I didn't get that. Try asking about prices, watchlist, or compare.",
  "I'm just a bot, but I'm here to help with CryptoTracker!",
  "That's interesting! Tell me more or ask about crypto features."
];

function getBotResponse(input) {
  const text = input.trim().toLowerCase();
  if (text.includes('hello') || text.includes('hi')) {
    return "Hi there! 👋 How can I assist you with CryptoTracker today?";
  }
  if (text.includes('help')) {
    return "Sure! I can help you track cryptocurrencies, compare coins, and manage your watchlist. What do you need help with?";
  }
  if (text.includes('price')) {
    return "You can view live prices on the Dashboard page. Is there a specific coin you're interested in?";
  }
  if (text.includes('watchlist')) {
    return "To manage your watchlist, go to the Watchlist page. You can add or remove coins there.";
  }
  if (text.includes('compare')) {
    return "Use the Compare page to see differences between two cryptocurrencies.";
  }
  // Random fallback
  return FALLBACKS[Math.floor(Math.random() * FALLBACKS.length)];
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: "Hello! I'm your CryptoTracker bot. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { from: 'user', text: input };
    setMessages([...messages, userMsg]);
    setTimeout(() => {
      const botReply = getBotResponse(input);
      setMessages(msgs => [...msgs, { from: 'bot', text: botReply }]);
    }, 500);
    setInput('');
  };

  return (
    <>
      <button className="chatbot-fab" onClick={() => setOpen(o => !o)}>
        💬
      </button>
      {open && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <span>Chatbot</span>
            <button className="chatbot-close" onClick={() => setOpen(false)}>×</button>
          </div>
          <div className="chatbot-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chatbot-msg chatbot-msg-${msg.from}`}>{msg.text}</div>
            ))}
          </div>
          <div className="chatbot-input-row">
            <input
              className="chatbot-input"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="Type your message..."
            />
            <button className="chatbot-send" onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </>
  );
} 
   