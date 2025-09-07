import React from "react";

interface ChatMessageProps {
  id: number;
  username: string;
  avatarUrl: string;
  message: string;
  isReply?: boolean;
  repliedTo?: string; 
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  username,
  avatarUrl,
  message,
  isReply = false,
  repliedTo,
}) => {
  // Tailwind classes
  const containerClass = `flex items-start space-x-4 p-3 bg-gray-800 rounded-xl shadow-md w-full ${
    isReply ? "pl-16" : ""
  }`;

  const avatarClass = `w-12 h-12 rounded-full object-cover ${
    isReply ? "opacity-80" : ""
  }`;

  const usernameClass = "font-semibold text-white";

  const replyBadgeClass =
    "text-xs text-gray-400 bg-gray-700 px-2 py-0.5 rounded-full";

  const repliedToClass = "mt-1 p-2 bg-gray-700 rounded-l-lg text-gray-300 text-sm";

  const messageClass = "mt-2 text-white text-sm";

  return (
    <div className={containerClass}>
      {/* Profile Section */}
      <img src={avatarUrl} alt={username} className={avatarClass} />

      {/* Message Content */}
      <div className="flex flex-col w-full">
        <div className="flex items-center space-x-2">
          <span className={usernameClass}>{username}</span>
          {isReply && <span className={replyBadgeClass}>Replied</span>}
        </div>

        {/* Replied-to UI */}
        {isReply && repliedTo && (
          <div className={repliedToClass}>Replied to {repliedTo}</div>
        )}

        {/* Actual message */}
        <p className={messageClass}>{message}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
