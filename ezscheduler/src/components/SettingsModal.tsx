import { useState, useEffect } from "react";
import { Eye, EyeOff, X } from "lucide-react";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const [apiKey, setApiKey] = useState("");
  const [model, setModel] = useState("gpt-5-nano");
  const [showApiKey, setShowApiKey] = useState(false);

  // Load saved settings on component mount
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedApiKey = await storage.getItem<string>('local:apiKey');
        const savedModel = await storage.getItem<string>('local:model');
        if (savedApiKey) setApiKey(savedApiKey);
        if (savedModel) setModel(savedModel);
      } catch (error) {
        console.error('Failed to load settings:', error);
      }
    };
    loadSettings();
  }, []);

  const handleApiKeyChange = async (value: string) => {
    setApiKey(value);
    try {
      await storage.setItem('local:apiKey', value);
    } catch (error) {
      console.error('Failed to save API key:', error);
    }
  };

  const handleModelChange = async (value: string) => {
    setModel(value);
    try {
      await storage.setItem('local:model', value);
    } catch (error) {
      console.error('Failed to save model:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-start justify-center z-50 pt-20" onClick={onClose}>
      <div className="w-full max-w-md mx-4" onClick={(e) => e.stopPropagation()}>
        <div className="rounded-xl bg-gray-800 shadow-xl ring-1 ring-zinc-600">
          <div className="px-4 py-3 border-b border-zinc-600 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-zinc-200">Settings</h2>
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-zinc-700 transition-colors"
              aria-label="Close settings"
            >
              <X className="w-5 h-5 text-zinc-400" />
            </button>
          </div>
          
          {/* Security Warning Banner */}
          <div className="px-4 py-3 bg-red-900/30 border-b border-red-800">
            <p className="text-xs text-red-200 leading-relaxed">
              <span className="font-semibold">Warning:</span> Never share your API key with anyone. 
                You are solely responsible for all usage and charges associated with your key.
            </p>
          </div>

          <div className="p-4 space-y-4">
            <div className="space-y-1">
              <label htmlFor="apiKey" className="block text-sm font-medium text-zinc-200">
                OpenAI API Key
              </label>
              <div className="relative">
                <input
                  id="apiKey"
                  type={showApiKey ? "text" : "password"}
                  value={apiKey}
                  onChange={(e) => handleApiKeyChange(e.target.value)}
                  placeholder="Enter your OpenAI API key"
                  className="w-full rounded-lg border border-zinc-600 bg-zinc-700 px-3 py-2 pr-16 text-sm text-zinc-200 placeholder:text-zinc-400 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
                />
                <button
                  type="button"
                  onClick={() => setShowApiKey(!showApiKey)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-zinc-600 rounded-lg transition-colors"
                >
                  {showApiKey ? (
                    <EyeOff className="w-4 h-4 text-zinc-400" aria-label="Hide API key" />
                  ) : (
                    <Eye className="w-4 h-4 text-zinc-400" aria-label="Show API key" />
                  )}
                </button>
              </div>

            </div>

            <div className="space-y-1">
              <label htmlFor="model" className="block text-sm font-medium text-zinc-200">
                Model
              </label>
              <select
                id="model"
                value={model}
                onChange={(e) => handleModelChange(e.target.value)}
                className="w-full rounded-lg border border-zinc-600 bg-zinc-700 px-3 py-2 text-sm text-zinc-200 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
              >
                <option value="gpt-5-nano">GPT-5 Nano</option>
                <option value="gpt-5">GPT-4o</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

