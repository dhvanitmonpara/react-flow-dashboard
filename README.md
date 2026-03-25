# MERN React Flow AI App

A clean, production-ready MERN application integrating React Flow and OpenRouter (Mistral-7b). 
Users can visually connect an input prompt to an AI response and execute the flow.

## Features
- **Frontend**: React, Vite, React Flow, TailwindCSS
- **Backend**: Node.js, Express, MongoDB (Mongoose)
- **AI Integration**: OpenRouter API using the free `mistralai/mistral-7b-instruct:free` model.
- **Data Persistence**: Save executed flows to MongoDB.

---

## Prerequisites
- Node.js (v18+)
- MongoDB (Running locally on `mongodb://127.0.0.1:27017` or use a MongoDB Atlas URI)
- OpenRouter API Key (Get a free key from [OpenRouter](https://openrouter.ai/))

---

## 1. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file from the example:
   ```bash
   cp .env.example .env
   ```
4. Update the `.env` file with your details:
   ```env
   PORT=8000
   MONGO_URI=mongodb://127.0.0.1:27017/mern-flow-ai
   OPENROUTER_API_KEY=your_actual_api_key_here
   ```
5. Start the backend development server:
   ```bash
   npm run dev
   ```
   *The server should run on `http://localhost:8000`.*

---

## 2. Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *The app should be accessible at `http://localhost:5173`.*

---

## Usage

1. Open the frontend in your browser.
2. Type a prompt in the **Prompt Input** node (e.g., "What are the benefits of React?").
3. Click the **Run Flow** button in the top-right panel.
4. The backend will contact the Mistral AI via OpenRouter, and the response will appear in the **AI Response** node.
5. Click **Save Flow** to store the interaction in your MongoDB database.

---

## API Endpoints

- `POST /api/ask-ai`
  - Body: `{ "prompt": "String" }`
  - Returns: AI response string.
  
- `POST /api/save`
  - Body: `{ "prompt": "String", "response": "String" }`
  - Returns: Saved Mongo Document.
