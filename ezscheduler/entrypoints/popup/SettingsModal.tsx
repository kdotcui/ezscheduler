import { useState, useEffect } from "react";

export default function SettingsModal() {
  const [apiKey, setApiKey] = useState("");
  const [model, setModel] = useState("gpt-5-nano");

  // Load saved settings on component mount
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const result = await browser.storage.local.get(['apiKey', 'model']);
          setApiKey(result.apiKey);
          setModel(result.model);
        
      } catch (error) {
        console.error('Failed to load settings:', error);
      }
    };
    loadSettings();
  }, []);

  const handleApiKeyChange = async (value: string) => {
    setApiKey(value);
    try {
      await browser.storage.local.set({ apiKey: value });
    } catch (error) {
      console.error('Failed to save API key:', error);
    }
  };

  const handleModelChange = async (value: string) => {
    setModel(value);
    try {
      await browser.storage.local.set({ model: value });
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
            <input
              id="apiKey"
              type="password"
              value={apiKey}
              onChange={(e) => handleApiKeyChange(e.target.value)}
              placeholder="Enter your API key"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
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


