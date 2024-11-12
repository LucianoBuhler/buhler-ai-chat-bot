
# The Buhler AI Chat Bot 

This is a **Chat Bot application built with React** using Vite as the build tool. It leverages the ChatGPT API to simulate human-like conversations with AI and maintains an ongoing conversation history, allowing users to continue previous chats even after closing the application.

## Features

- **Human-like Conversations**: Utilizes the ChatGPT API for natural, interactive conversations.
- **Persistent Chat History**: Saves conversation history, so users can seamlessly continue previous chats.
- **Real-time Responses**: Provides a responsive, real-time experience for engaging interactions.
- **User-friendly Interface**: Clean and simple UI for easy navigation and usage.

## Technologies Used

- **React**: Frontend framework used for building the user interface.
- **Vite**: Build tool for fast development and optimized production builds.
- **ChatGPT API**: Provides AI-powered conversation capabilities.
- **Local Storage**: Used to store and persist conversation history.

## Getting Started

### Prerequisites

- **Node.js** and **npm**: Ensure you have Node.js and npm installed.
- **ChatGPT API Key**: Sign up and obtain your API key from OpenAI to use ChatGPT API.

### Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/LucianoBuhler/buhler-ai-chat-bot.git
   cd buhler-ai-chat-bot
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Add API Key**:

   Create a `.env` file in the root directory and add your ChatGPT API key:

   ```plaintext
   VITE_GPT_API_KEY=your_api_key_here
   ```

### Running the Application

To start the development server with Vite, run:

```bash
npm run dev
```

This will open the application on `http://localhost:5173`.

## Usage

- **Start a New Chat**: Type a message in the chat box to begin a conversation with the bot.
- **Continue a Previous Chat**: If you’ve chatted before, click on one of the previous conversations to load automatically.
- **Clear Chat History**: Clear the chat history from the app's settings or local storage if you want to start fresh.


## Project Structure

```
buhler-ai-chat-bot/
├── public/                   # Static assets served by Vite
├── src/
│   ├── assets/               # Static assets like images or icons
│   ├── Components/           # React components for various parts of the UI
│   │   ├── ChatBotApp.jsx    # Main chat interface displaying conversation history and input
│   │   ├── ChatBotApp.css    # ChatBotApp styles
│   │   ├── ChatBotStart.jsx  # Start page with the initial button 
│   │   ├── ChatBotStart.css  # ChatBotStart styles
│   ├── App.jsx               # Root component of the application
│   ├── main.jsx              # Entry point file where the app is rendered
│   └── index.css             # Main CSS file, imported by components as needed
├── .env                      # Environment variables (e.g., API key)
├── .gitignore                # Files and directories to ignore in Git
├── index.html                # The main HTML file served by Vite, linking to the JavaScript bundle.
├── vite.config.js            # Vite configuration for the project
├── package-lock.json         # Lock file for installed dependencies
├── package.json              # Project dependencies and scripts
└── README.md                 # Documentation for the project
```

## License

This project is licensed under the MIT License.
