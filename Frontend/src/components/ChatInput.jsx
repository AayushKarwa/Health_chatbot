// ChatInput.jsx
import React, { useState } from 'react';

const ChatInput = ({ sendMessage, loading }) => {
  const [message, setMessage] = useState('');
  const [image, setImage] = useState(null);

  const handleSend = () => {
    if (message || image) {
      sendMessage(message, image);
      setMessage('');
      setImage(null);
    }
  };

  return (
    <div className="chat-input">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
        disabled={loading}
      />
      <label htmlFor="file-upload" className="file-upload-label">Upload Image</label>
      <input
        id="file-upload"
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <button onClick={handleSend} disabled={loading}>
        {loading ? 'Sending...' : 'Send'}
      </button>
    </div>
  );
};

export default ChatInput;
