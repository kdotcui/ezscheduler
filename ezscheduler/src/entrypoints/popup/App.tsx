import "@/assets/tailwind.css";
import { useState } from "react";
import { Settings } from "lucide-react";
import SettingsModal from "@/components/SettingsModal";
import ChatMessages from "@/components/ChatMessages";
import ChatInput from "@/components/ChatInput";
import { useChat } from "@/hooks/useChat";
import { useAutoScroll } from "@/hooks/useAutoScroll";

function App() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { messages, isLoading, sendMessage } = useChat();
  const messagesEndRef = useAutoScroll(messages);

  return (
    <div className="flex flex-col h-[600px] w-[400px] bg-gray-50">
      {/* Header */}
      <div className="bg-blue-500 flex justify-between items-center p-4 shadow-md">
        <span className="text-xl text-white font-semibold">EZ Scheduler</span>
        <button
          onClick={() => setIsSettingsOpen(true)}
          className="p-2 rounded hover:bg-blue-600 transition-colors"
          aria-label="Open settings"
        >
          <Settings className="text-white" />
        </button>
      </div>

      {/* Chat Messages */}
      <ChatMessages messages={messages} isLoading={isLoading} messagesEndRef={messagesEndRef} />

      {/* Chat Input */}
      <ChatInput onSend={sendMessage} disabled={isLoading} />

      {/* Settings Modal */}
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </div>
  );
}

export default App;
