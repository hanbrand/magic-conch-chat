import { useState, useEffect } from 'react';
import { Bubble } from '@/components/Bubble';
import { ChatMessage } from '@/components/ChatMessage';
import { MagicConch } from '@/components/MagicConch';
import { UnderwaterBackground } from '@/components/UnderwaterBackground';

const Index = () => {
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([]);
  const [input, setInput] = useState('');
  const [bubbles, setBubbles] = useState<number[]>([]);

  useEffect(() => {
    setBubbles(Array.from({ length: 10 }, (_, i) => i));
  }, []);

  const handleSubmit = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { text: userMessage, isUser: true }]);
    setInput('');

    // Mock response for now - in a real app, this would call the ChatGPT API
    const response = "All signs point to maybe.";
    setTimeout(() => {
      setMessages(prev => [...prev, { text: response, isUser: false }]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-ocean-light to-ocean-dark relative overflow-hidden">
      <UnderwaterBackground />

      {/* Bubbles */}
      {bubbles.map((i) => (
        <Bubble key={i} />
      ))}
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 mb-8 h-[400px] overflow-y-auto">
            {messages.map((msg, i) => (
              <ChatMessage key={i} message={msg.text} isUser={msg.isUser} />
            ))}
          </div>
          
          <div className="flex flex-col items-center gap-8">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
              placeholder="Ask the Magic Conch..."
              className="w-full px-4 py-2 rounded-lg bg-white/90 backdrop-blur-sm font-fredoka focus:outline-none focus:ring-2 focus:ring-shell-primary"
            />
            
            <MagicConch onPull={handleSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;