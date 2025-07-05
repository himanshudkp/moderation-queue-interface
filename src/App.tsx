import ModerationQueue from "./pages/ModerationQueue";
import { Toaster } from "sonner";

function App() {
  return (
    <div className="h-screen overflow-hidden relative">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 bg-white shadow z-10">
        <h1 className="text-center text-4xl font-extrabold text-gray-800 tracking-tight py-4">
          Moderation Queue System
        </h1>
      </header>

      {/* Scrollable Content */}
      <main className="pt-24 h-full overflow-y-auto px-6">
        <ModerationQueue />
      </main>

      {/* Toast Notification */}
      <Toaster richColors position="bottom-center" />
    </div>
  );
}

export default App;
