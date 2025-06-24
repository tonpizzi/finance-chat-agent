import React, { useState } from "react";

export default function ChatBox({ chat, onSend }:
  {chat:{user:string,bot:string}[], onSend:(msg:string)=>void}) {
  const [input, setInput] = useState("");
  const handleSend = () => { onSend(input); setInput(""); };
  return (
    <div className="border rounded p-4">
      <div className="h-60 overflow-auto mb-4">
        {chat.map((c,i)=><div key={i}>
          <p className="font-bold">Você:</p><p>{c.user}</p>
          <p className="font-bold text-blue-600">Bot:</p><p>{c.bot}</p>
          <hr/>
        </div>)}
      </div>
      <div className="flex">
        <input className="flex-1 border p-2" value={input} onChange={e=>setInput(e.target.value)}
          onKeyDown={e=>e.key==="Enter" && handleSend()}/>
        <button className="bg-green-500 text-white px-4 ml-2" onClick={handleSend}>Enviar</button>
      </div>
    </div>
  );
}