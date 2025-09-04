import React, { useState } from 'react';
import { Send, Bot, User } from 'lucide-react';

const AIChat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: 'Hello! I\'m your disaster preparedness assistant. Ask me anything about emergency planning, safety procedures, or disaster response.'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: inputMessage
    };

    setMessages([...messages, newMessage]);
    setInputMessage('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        sender: 'ai',
        text: getAIResponse(inputMessage)
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const getAIResponse = (userMessage: string) => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('earthquake')) {
      return 'During an earthquake: Drop, Cover, and Hold On. Drop to your hands and knees, take cover under a sturdy desk or table, and hold on to your shelter. Stay away from windows and heavy objects that could fall.';
    } else if (message.includes('fire')) {
      return 'Fire safety tips: Have working smoke detectors, plan escape routes from every room, practice your escape plan, and remember to Stop, Drop, and Roll if your clothes catch fire.';
    } else if (message.includes('flood')) {
      return 'During flood warnings: Move to higher ground immediately, avoid walking or driving through flood waters, and have an emergency kit ready with water, food, and important documents.';
    } else if (message.includes('emergency kit')) {
      return 'Essential emergency kit items: Water (1 gallon per person per day), non-perishable food, flashlight, battery-powered radio, first aid kit, medications, copies of important documents, and cash.';
    } else {
      return 'That\'s a great question! For specific emergency situations, I recommend checking our learning modules or consulting with local emergency services. Is there a particular type of disaster you\'d like to know more about?';
    }
  };

  return (
    <div className="h-full flex flex-col space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">AI Assistant</h1>
        <p className="text-muted-foreground">Get instant answers to your disaster preparedness questions</p>
      </div>

      <div className="flex-1 bg-card border border-subtle-border rounded-lg flex flex-col">
        {/* Chat Messages */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.sender === 'ai' && (
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-primary" />
                </div>
              )}
              
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-foreground'
                }`}
              >
                <p className="text-sm">{message.text}</p>
              </div>

              {message.sender === 'user' && (
                <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-secondary-foreground" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Chat Input */}
        <div className="border-t border-subtle-border p-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask about emergency preparedness..."
              className="flex-1 p-3 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent"
            />
            <button
              onClick={handleSendMessage}
              className="bg-primary text-primary-foreground p-3 rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChat;