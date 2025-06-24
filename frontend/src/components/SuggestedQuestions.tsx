import React from "react";

const questions = [
  "Top 5 ações com maior valorização hoje",
  "Top 5 ações que mais caíram na semana",
  "Preço da PETR4 hoje",
  "Desempenho do Ibovespa na última semana"
];

export default function SuggestedQuestions({onClick}:{onClick:(q:string)=>void}) {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {questions.map((q,i)=>
        <button key={i}
          className="bg-blue-500 text-white px-3 py-1 rounded"
          onClick={()=>onClick(q)}>
          {q}
        </button>
      )}
    </div>
  );
}