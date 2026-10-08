import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Carrinho } from "./pages/Carrinho";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { Header } from "./components/Header";
import { Login } from "./pages/Login";

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <CartProvider>
                    <Header />

                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/carrinho" element={<Carrinho />} />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </CartProvider>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;