import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = 3000;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/ask', async (req, res) => {
  try {
    const userInput = req.body.message;
    const result = await model.generateContent(userInput);
    const response = await result.response;
    const text = response.text();
    res.json({ response: text });
  } catch (error) {
    res.status(500).json({ error: 'Gagal generate jawaban.' });
  }
});

app.listen(port, () => {
  console.log(`✅ Shel4 running di http://localhost:${port}`);
});