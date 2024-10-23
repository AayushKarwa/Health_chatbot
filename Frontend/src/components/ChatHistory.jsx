
import React from 'react';

const ChatHistory = ({ history = [] }) => {
  if (!Array.isArray(history) || history.length === 0) {
    return <p>No conversation history yet.</p>;
  }

  return (
    <div className="chat-history">
      {history.map((entry, index) => (
        <div key={index} className="chat-entry">
          <p className="user"><strong>You:</strong> {entry.user}</p>
          <p className="bot"><strong>Bot:</strong> {entry.bot}</p>
        </div>
      ))}
    </div>
  );
};

export default ChatHistory;
