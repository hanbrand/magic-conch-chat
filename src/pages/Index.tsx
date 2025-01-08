import { useState, useEffect } from 'react';
import { Bubble } from '@/components/Bubble';
import { ChatMessage } from '@/components/ChatMessage';
import { MagicConch } from '@/components/MagicConch';

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
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Pineapple House */}
        <div className="absolute bottom-0 left-[10%] w-32 h-48 bg-yellow-400 rounded-t-[100px] transform -rotate-2">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSI1IiBmaWxsPSJyZ2JhKDAsIDAsIDAsIDAuMikiLz48L3N2Zz4=')] opacity-30" />
          <div className="absolute top-1/2 left-1/2 w-12 h-16 bg-blue-400 rounded-lg transform -translate-x-1/2" />
        </div>
        
        {/* Rock House */}
        <div className="absolute bottom-0 right-[15%] w-40 h-36 bg-gray-600 rounded-t-[50px] transform rotate-2">
          <div className="absolute top-1/3 left-1/4 w-8 h-8 bg-blue-300 rounded-full" />
          <div className="absolute top-1/2 right-1/4 w-10 h-10 bg-blue-300 rounded-full" />
        </div>
        
        {/* Seaweed */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-around">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="w-8 h-32 bg-green-600 rounded-full animate-float"
              style={{
                animationDelay: `${i * 0.5}s`,
                transform: `rotate(${Math.sin(i) * 10}deg)`,
              }}
            />
          ))}
        </div>
      </div>

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