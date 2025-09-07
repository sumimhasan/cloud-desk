"use client";

import React, { useState, useRef, useEffect } from "react";
import ChatMessage from "./chat-message-bar"; // adjust path if needed

const dummyMessages = [
  {
    id: 1,
    username: "Alice Johnson",
    avatarUrl: "https://i.pravatar.cc/150?img=1",
    message: "Hey, how's your day going?",
  },
  {
    id: 2,
    username: "Bob Smith",
    avatarUrl: "https://i.pravatar.cc/150?img=2",
    message: "Pretty good! Just finished some work.",
    isReply: true,
    repliedTo: "Alice Johnson",
  },
  {
    id: 3,
    username: "Charlie Brown",
    avatarUrl: "https://i.pravatar.cc/150?img=3",
    message: "Anyone up for a game tonight?",
  },
  {
    id: 4,
    username: "Alice Johnson",
    avatarUrl: "https://i.pravatar.cc/150?img=1",
    message: "Count me in!",
    isReply: true,
    repliedTo: "Charlie Brown",
  },
  {
    id: 5,
    username: "Alice Johnson",
    avatarUrl: "https://i.pravatar.cc/150?img=1",
    message: "Hey, how's your day going?",
  },
  {
    id: 6,
    username: "Bob Smith",
    avatarUrl: "https://i.pravatar.cc/150?img=2",
    message: "Pretty good! Just finished some work.",
    isReply: true,
    repliedTo: "Alice Johnson",
  },
  {
    id: 7,
    username: "Charlie Brown",
    avatarUrl: "https://i.pravatar.cc/150?img=3",
    message: "Anyone up for a game tonight?",
  },
  {
    id: 8,
    username: "Alice Johnson",
    avatarUrl: "https://i.pravatar.cc/150?img=1",
    message: "Count me in!",
    isReply: true,
    repliedTo: "Charlie Brown",
  },
  {
    id: 9,
    username: "Alice Johnson",
    avatarUrl: "https://i.pravatar.cc/150?img=1",
    message: "Count me in!",
    isReply: true,
    repliedTo: "Charlie Brown",
  },{
    id: 10,
    username: "Alice Johnson",
    avatarUrl: "https://i.pravatar.cc/150?img=1",
    message: "10Count me in!",
    isReply: true,
    repliedTo: "Charlie Brown",
  }
];

const ChatPageContainer: React.FC = () => {
  const [messages, setMessages] = useState(dummyMessages);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const handleSend = () => {
    if (!newMessage.trim()) return;
    const nextMessage = {
      id: messages.length + 1,
      username: "You",
      avatarUrl: "https://i.pravatar.cc/150?img=5",
      message: newMessage,
    };
    setMessages([...messages, nextMessage]);
    setNewMessage("");
  };

  // Scroll to bottom when new message is added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="bg-gray-900 h-full flex flex-col">

      {/* Messages container */}
      <div className="flex-1 overflow-y-scroll px-6 py-4 space-y-4">
        {messages.map((msg) => (
          <ChatMessage
            key={msg.id}
            id={msg.id}
            username={msg.username}
            avatarUrl={msg.avatarUrl}
            message={msg.message}
            isReply={msg.isReply}
            repliedTo={msg.repliedTo}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message input bar */}
      <div className="p-4 bg-gray-800 flex items-center space-x-4 static">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 rounded-md p-3 bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-semibold"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPageContainer;
