import "@/assets/tailwind.css"; // Adjust the path if necessary
import { Settings } from "lucide-react";
import SettingsModal from "./SettingsModal";

function App() {
  return (
    <>
      <div className="bg-blue-100 flex justify-between items-center p-4">
        <span className="text-xl text-nowrap">EZ Scheduler</span>
        <div className="p-1 rounded">
          <Settings />
        </div>
      </div>
      <SettingsModal />
    </>
  );
}

export default App;
