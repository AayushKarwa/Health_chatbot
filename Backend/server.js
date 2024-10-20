const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

// Create Express app
const app = express();
app.use(cors());
app.use(express.json());

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const constraintMessage = 'Only respond with information related to health. If the following prompt is unrelated to health, please don’t respond and say you only have information about health.';

// In-memory store for history
const history = [];

// Define API routes
app.post('/api/generate-content', async (req, res) => {
    try {
        const { prompt } = req.body;

        // Validate the prompt
        if (!prompt || prompt.length < 5) {
            return res.status(400).json({ error: 'Prompt must be at least 5 characters long.' });
        }

        // Generate additional content using the Gemini API
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(`${constraintMessage} ${prompt}`);
        const aiResponse = await result.response.text();

        // Store in history
        history.push({ prompt, aiResponse });

        res.json({ text: aiResponse, history });
    } catch (error) {
        console.error('Error generating content:', error);
        res.status(500).json({ error: 'Failed to generate content' });
    }
});

app.get('/api/history', (req, res) => {
    res.json(history);
});

// Export the Express app for Vercel
module.exports = app;

// Define the port for local development
const PORT = process.env.PORT || 3001;
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}
