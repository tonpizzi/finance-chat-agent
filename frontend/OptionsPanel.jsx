import React from 'react';

export default function OptionsPanel({ selectedSource, onSelectSource }) {
  return (
    <div className="flex gap-4 justify-center mb-4">
      <button
        className={`px-4 py-2 rounded ${
          selectedSource === 'supabase' ? 'bg-blue-600 text-white' : 'bg-gray-300'
        }`}
        onClick={() => onSelectSource('supabase')}
      >
        Consultar Supabase
      </button>
      <button
        className={`px-4 py-2 rounded ${
          selectedSource === 'yfinance' ? 'bg-green-600 text-white' : 'bg-gray-300'
        }`}
        onClick={() => onSelectSource('yfinance')}
      >
        Consultar yfinance
      </button>
    </div>
  );
}
