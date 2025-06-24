import React, { useState } from 'react';
import OptionsPanel from './OptionsPanel';
import ChatComponent from './ChatComponent';

export default function App() {
  const [source, setSource] = useState('supabase');

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Finance Chat Agent</h1>
      <OptionsPanel selectedSource={source} onSelectSource={setSource} />
      <ChatComponent querySource={source} />
    </div>
  );
}
