const express = require('express');
const cors = require('cors');
const multer = require('multer'); 
const axios = require('axios');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const path = require('path');
require('dotenv').config();
const fs = require('fs');
const FormData = require('form-data');


const app = express();
app.use(cors());
app.use(express.json());


const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const constraintMessage = process.env.CONSTRAINT_MESSAGE;



const history = [];


app.post('/classify-image', upload.single('image'), async (req, res) => {
    try {
        const imagePath = req.file.path;
        const userPrompt = req.body.prompt || ''; 

        
        const huggingFaceUrl = 'https://bilalsardar-skin-diseases-classification.hf.space/run/predict';
        const imageBase64 = fs.readFileSync(imagePath, { encoding: 'base64' });
        const response = await axios.post(huggingFaceUrl, {
            data: [`data:image/png;base64,${imageBase64}`],
        }, {
            headers: { 'Content-Type': 'application/json' }
        });

       
        const responseData = response.data.data;
        const [disease, description, symptoms, causes, treatment] = responseData;

        console.log(`Identified disease: ${disease}`);
        console.log(`Identified description: ${description}`);
        console.log(`Identified symptoms: ${symptoms}`);
        console.log(`Causes: ${causes}`);
        console.log(`Learn more: ${treatment}`);

       
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        let aiResponse = '';

        try {
            const diseases = disease || "diseases you know";
            const combinedPrompt = `${constraintMessage} Provide short symptoms information based on ${diseases} and considering ${userPrompt}`;
            const result = await model.generateContent(combinedPrompt);
            aiResponse = await result.response.text();
            console.log("Google response: " + aiResponse);
        } catch (genError) {
            console.error('Error generating content from Gemini API:', genError);
            aiResponse = 'Sorry, we were unable to retrieve further information at this time.';
        }

       
        history.push({ disease, description, symptoms, causes, treatment, aiResponse });

        
        res.json({ disease, description, symptoms, causes, treatment, aiResponse });

    } catch (error) {
        console.error('Error classifying image or generating content:', error);
        res.status(500).json({ error: 'Failed to classify image or generate content' });
    }
});


app.post('/generate-response', async (req, res) => {
    const userPrompt = req.body.prompt || '';
    let aiResponse = '';

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const combinedPrompt = `${constraintMessage} Provide information based on the user prompt: ${userPrompt}`;
        
        const result = await model.generateContent(combinedPrompt);
        aiResponse = await result.response.text();

        res.json({ aiResponse });
    } catch (error) {
        console.error('Error generating response from Gemini API:', error);
        res.status(500).json({ error: 'Failed to generate response' });
    }
});

app.get('/history', (req, res) => {
    res.json(history);
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
