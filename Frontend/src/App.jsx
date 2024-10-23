import React, { useState } from 'react'; 
import axios from 'axios';
import './App.css';

const App = () => {
    const [prompt, setPrompt] = useState('');
    const [messages, setMessages] = useState([]);
    const [isDarkMode, setIsDarkMode] = useState(true);  
    const [selectedFile, setSelectedFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false); 

    const BASE_URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3001';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true); 

       
        if (!selectedFile) {
            await handleTextPrompt();
            setIsLoading(false); 
            return;
        }

        await handleImageUpload();
        setIsLoading(false); 
    };

    const handleTextPrompt = async () => {
        try {
            const response = await axios.post(`${BASE_URL}/generate-response`, { prompt });
            const { aiResponse } = response.data;

           
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: `AI : ${aiResponse}`, type: 'bot' },
            ]);
        } catch (error) {
            console.error('Error sending prompt:', error);
            const errorMessage = { text: error.response?.data?.error || 'Error processing prompt. Please try again.', type: 'bot' };
            setMessages((prevMessages) => [...prevMessages, errorMessage]);
        }
    };

    const handleImageUpload = async () => {
        const formData = new FormData();
        formData.append('image', selectedFile);
        formData.append('prompt', prompt); 

        try {
            const response = await axios.post(`${BASE_URL}/classify-image`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            const { disease, description, symptoms, causes, treatment, aiResponse } = response.data;

            
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: `Disease: ${disease}`, type: 'bot' },
                { text: `Description: ${description}`, type: 'bot' },
                { text: `Symptoms: ${symptoms}`, type: 'bot' },
                { text: `Causes: ${causes}`, type: 'bot' },
                { text: `Treatment: ${treatment}`, type: 'bot' },
                { text: `AI: ${aiResponse}`, type: 'bot' }, 
            ]);
        } catch (error) {
            console.error('Error uploading image:', error);
            const errorMessage = { text: error.response?.data?.error || 'Error classifying image. Please try again.', type: 'bot' };
            setMessages((prevMessages) => [...prevMessages, errorMessage]);
        }
    };

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        document.body.classList.toggle('dark-mode');
    };

    return (
        <div className={`chat-container ${isDarkMode ? 'dark-mode' : ''}`}>
            <h1 style={{ color: isDarkMode ? 'white' : 'black' }}>Health Chatbot v1</h1>
            <button onClick={toggleDarkMode} style={{ marginBottom: '20px' }}>
                Toggle to {isDarkMode ? 'Light Mode' : 'Dark Mode'}
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
                    className={isDarkMode ? 'dark-mode' : ''}
                />
                <input
                    type="file"
                    accept="image/*" 
                    onChange={(e) => setSelectedFile(e.target.files[0])}
                    className={isDarkMode ? 'dark-mode' : ''}
                />
                <button type="submit" className={isDarkMode ? 'dark-mode' : ''}>
                    {isLoading ? 'Sending...' : 'Send'} {}
                </button>
            </form>
        </div>
    );
};

export default App;
