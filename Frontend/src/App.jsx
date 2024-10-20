// App.jsx
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false); // State for dark mode

  // Set the base URL based on the environment
  const BASE_URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3001';

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userMessage = { text: prompt, type: 'user' };

    // Add user's message to the chat
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      const response = await axios.post(`${BASE_URL}/generate-content`, { prompt });
      const botMessage = { text: response.data.text, type: 'bot' };

      // Add bot's response to the chat
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setPrompt(''); // Clear input field
    } catch (error) {
      console.error('Error submitting prompt:', error);
      const errorMessage = { text: 'Error generating response. Please try again.', type: 'bot' };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark-mode');
  };

  return (
    <div className={`chat-container ${isDarkMode ? 'dark-mode' : ''}`}>
      <h1 style={{ color: isDarkMode ? 'white' : 'black' }}>Health Chatbot v1</h1> {/* Change heading color */}
      <button onClick={toggleDarkMode} style={{ marginBottom: '20px' }}>
        Toggle to {isDarkMode ? 'Light Mode' : 'Dark Mode'} {/* Change button text */}
      </button>
      <div className={`messages ${isDarkMode ? 'dark-mode' : ''}`}>
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.type} ${isDarkMode ? 'dark-mode' : ''}`}>
            <p>{message.text}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="input-container">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask a health-related question..."
          required
          className={isDarkMode ? 'dark-mode' : ''}
        />
        <button type="submit" className={isDarkMode ? 'dark-mode' : ''}>Send</button>
      </form>
    </div>
  );
};

export default App;
