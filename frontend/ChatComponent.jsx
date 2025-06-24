import React, { useState } from 'react';

export default function ChatComponent({ querySource }) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages([...messages, userMessage]);

    // Enviar para backend
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        question: input,
        source: querySource,
      }),
    });

    const data = await res.json();

    const botMessage = { role: 'bot', content: data.answer || 'Erro na resposta' };
    setMessages((prev) => [...prev, botMessage]);
    setInput('');
  };

  return (
    <div>
      <div className="mb-4 max-h-80 overflow-y-auto border p-2 rounded bg-gray-50">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-2 my-1 rounded ${
              msg.role === 'user' ? 'bg-blue-200 text-right' : 'bg-green-200 text-left'
            }`}
          >
            {msg.content}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          className="flex-grow border rounded p-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Digite sua pergunta..."
        />
        <button
          className="bg-blue-600 text-white px-4 rounded"
          onClick={sendMessage}
        >
          Enviar
        </button>
      </div>
    </div>
  );
}
