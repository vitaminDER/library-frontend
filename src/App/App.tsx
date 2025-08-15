import "./App.css";

import AuthProvider from "@/App/Provider/AuthProvider";
import { BrowserProvider } from "@/App/Provider/BrowserProvider";
import { StoreProvider } from "@/App/Provider/StoreProvider";

function App() {
  return (
    <StoreProvider>
      <AuthProvider>
        <BrowserProvider />
      </AuthProvider>
    </StoreProvider>
  );
}

export default App;
