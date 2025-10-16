# EZ Scheduler

A (soon to be agentic) browser extension that uses gpt-5 to convert natural language into calendar events. Simply describe your event in plain English, and let AI handle the scheduling details.

## 🎬 Demo

_Video demo coming soon..._

<!-- Placeholder for demo video -->

## 🛠️ Tech Stack

- **[WXT](https://wxt.dev/)**: kinda like nextjs for extensions imo
- **[OpenAI gpt-5-nano](https://openai.com/)**: cheapest model there is, i doubt this app needs anything better. may look into adding other models for ex: deepseek or gemini if bored


## 🚀 Setup

### Prerequisites

- Node.js (v18 or higher)
- pnpm installed globally (`npm install -g pnpm`)
- OpenAI API key ([Get one here](https://platform.openai.com/api-keys))

### Installation

1. **Install dependencies**
   ```bash
   pnpm install
   ```

2. **Start development server**
   ```bash
   pnpm dev
   ```

3. **Load the extension in your browser**

   **Chrome/Edge:**
   - Navigate to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the `.output/chrome-mv3` directory from your project

## ⚙️ Settings Configuration

After installing the extension, you need to configure your OpenAI API key:

1. Click on the EZ Scheduler extension icon in your browser toolbar
2. Click the ⚙️ (Settings) icon in the top-right corner
3. Enter your OpenAI API key
4. (Optional) Select your preferred GPT model (default: `gpt-4o-2024-08-06`)
5. Click "Save Settings"

Your API key is stored locally in your browser and never shared.  You're responsible for your own keys. 

## 📝 Usage

1. Click the extension icon to open the EZ Scheduler popup
2. Type a natural language description of your event, for example:
   - "Meeting with John tomorrow at 3pm for 1 hour"
   - "Dentist appointment next Friday at 10am"
   - "Weekly team standup every Monday at 9am"
3. The AI will parse your input and generate a structured calendar event
4. Review the event details and add to your calendar

## 📋 To-Do

- [ ] Migrate GPT integration away from completions to responses and implement conversation mode
- [ ] Add chat persistence across extension open/close sessions
- [ ] Add "New Conversation" button to start fresh chats
- [ ] Add event editing capabilities before confirming
- [ ] Add export functionality (ICS file format)






