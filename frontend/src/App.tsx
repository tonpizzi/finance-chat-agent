import React, { useState } from "react";
import ChatBox from "./components/ChatBox";
import SuggestedQuestions from "./components/SuggestedQuestions";

export default function App() {
  const [chatHistory, setChatHistory] = useState<{user:string,bot:string}[]>([]);

  const sendMessage = async (msg:string) => {
    setChatHistory([...chatHistory, {user: msg, bot:"..."}]);
    const res = await fetch("http://localhost:8000/chat", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({message: msg})
    });
    const data = await res.json();
    setChatHistory(prev => prev.map((c, i) => i === prev.length-1 ? {user: c.user, bot: data.response} : c));
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <SuggestedQuestions onClick={sendMessage}/>
      <ChatBox chat={chatHistory} onSend={sendMessage}/>
    </div>
  );
}