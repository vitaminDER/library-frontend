import "./App.css";

import {BrowserProvider} from "@/App/Provider/BrowserProvider";
import {StoreProvider} from "@/App/Provider/StoreProvider";
import AuthProvider from "@/App/Provider/AuthProvider";

function App() {
    return (
        <StoreProvider>
            <AuthProvider>
                <BrowserProvider/>
            </AuthProvider>
        </StoreProvider>
    );
}

export default App;
