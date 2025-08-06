import "./App.css";

import { BrowserProvider } from "@/App/Provider/BrowserProvider";
import { StoreProvider } from "@/App/Provider/StoreProvider";

function App() {
  return (
    <StoreProvider>
      <BrowserProvider />
    </StoreProvider>
  );
}

export default App;
