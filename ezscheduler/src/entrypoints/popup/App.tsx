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
    <div className="flex flex-col h-[600px] w-[400px] bg-zinc-900">
      {/* Header */}
      <div className="bg-gray-800 flex justify-between items-center px-4 py-2 border-b border-zinc-600">
        <span className="text-lg text-zinc-200 font-semibold">EZ Scheduler</span>
        <button
          onClick={() => setIsSettingsOpen(true)}
          className="p-1.5 rounded-lg hover:bg-emerald-600 transition-colors"
          aria-label="Open settings"
        >
          <Settings className="text-zinc-200" size={20} />
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
