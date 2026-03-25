import express from 'express';
import axios from 'axios';
import FlowData from '../models/FlowData.js';

const router = express.Router();

// POST /api/ask-ai
// Calls OpenRouter AI API
router.post('/ask-ai', async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt || typeof prompt !== 'string' || prompt.trim() === '') {
      return res.status(400).json({ success: false, message: 'Prompt is required and cannot be empty.' });
    }

    const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

    if (!OPENROUTER_API_KEY) {
      console.error('Missing OPENROUTER_API_KEY environment variable');
      return res.status(500).json({ success: false, message: 'Server configuration error.' });
    }

    const openRouterRes = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: process.env.OPENROUTER_MODEL ?? "openrouter/free",
        messages: [{ role: 'user', content: prompt }]
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const aiResponse = openRouterRes.data.choices?.[0]?.message?.content || 'No response generated.';

    res.status(200).json({
      success: true,
      data: {
        response: aiResponse
      }
    });

  } catch (error) {
    console.error('Error calling OpenRouter API:', error.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to communicate with AI service.',
      details: error.response?.data || error.message
    });
  }
});

// POST /api/save
// Saves prompt and response to MongoDB
router.post('/save', async (req, res) => {
  try {
    const { prompt, response } = req.body;

    if (!prompt || !response) {
      return res.status(400).json({ success: false, message: 'Both prompt and response are required to save.' });
    }

    const flowData = new FlowData({
      prompt,
      response
    });

    await flowData.save();

    res.status(201).json({
      success: true,
      message: 'Flow data saved successfully.',
      data: flowData
    });

  } catch (error) {
    console.error('Error saving data:', error.message);
    res.status(500).json({ success: false, message: 'Failed to save data to database.' });
  }
});

export default router;
