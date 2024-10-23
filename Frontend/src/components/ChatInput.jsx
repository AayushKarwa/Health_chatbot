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
    <div className="input-container">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
        disabled={loading}
      />
      <input
        id="file-upload"
        type="file"
        className="file-input"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <label htmlFor="file-upload" className="file-label">Choose File</label>
      <button onClick={handleSend} disabled={loading}>
        {loading ? 'Sending...' : 'Send'}
      </button>
    </div>
  );
};

export default ChatInput;
