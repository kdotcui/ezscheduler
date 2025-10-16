import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function SettingsModal() {
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

  return (
    <div className="p-4">
      <div className="w-full rounded-lg bg-white shadow-xl ring-1 ring-black/5 max-w-sm">
        <div className="px-4 py-3 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Settings</h2>
        </div>
        <div className="p-4 space-y-4">
          <div className="space-y-1">
            <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700">
              API Key
            </label>
            <div className="relative">
              <input
                id="apiKey"
                type={showApiKey ? "text" : "password"}
                value={apiKey}
                onChange={(e) => handleApiKeyChange(e.target.value)}
                placeholder="Enter your API key"
                className="w-full rounded-md border border-gray-300 px-3 py-2 pr-16 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
              <button
                type="button"
                onClick={() => setShowApiKey(!showApiKey)}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded"
              >
                {showApiKey ? (
                  <EyeOff className="w-4 h-4" aria-label="Hide API key" />
                ) : (
                  <Eye className="w-4 h-4" aria-label="Show API key" />
                )}
              </button>
            </div>
          </div>

          <div className="space-y-1">
            <label htmlFor="model" className="block text-sm font-medium text-gray-700">
              Model
            </label>
            <select
              id="model"
              value={model}
              onChange={(e) => handleModelChange(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white"
            >
              <option value="gpt-5-nano">GPT-5 Nano</option>
              <option value="deepseek-v3.1">DeepSeek V3.1</option>
              <option value="gemini-2.5-flash-lite">Gemini 2.5 Flash-Lite</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}


