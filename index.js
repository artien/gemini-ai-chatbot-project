import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

// Check for the API key at startup for robust error handling
if (!process.env.GEMINI_API_KEY) {
    console.error("Error: GEMINI_API_KEY is not defined. Please create a .env file and add your API key.");
    process.exit(1); // Exit the process with an error code
}

const app = express();
const port = process.env.PORT || 3000;

// Middleware setup

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Gemini API setup: Initialize genAI before using it to get the model.
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const GEMINI_MODEL_NAME = "gemini-1.5-flash";
const model = genAI.getGenerativeModel({ model: GEMINI_MODEL_NAME });

//Endpoint POST api/chat

app.post('/api/chat', async (req, res) => {
    const userMessage = req.body.message;

    if (!userMessage) {
        return res.status(400).json({ reply: "Message is required." });
    }

    try {
        const result = await model.generateContent(userMessage);
        const response = result.response;
        const text = response.text();
        res.json({ reply: text });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

app.listen(port, () => {
    console.log(`Gemini Chatbot running on http://localhost:${port}`);
});