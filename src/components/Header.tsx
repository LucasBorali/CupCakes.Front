import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export function Header() {

    const { quantidadeTotal } = useCart();
    const { usuario, logout } = useAuth();

    return (
        <header className="header">

            <Link to="/" className="logo">
                🧁 CupCake Gourmet
            </Link>

            <nav>

                <Link to="/">
                    Início
                </Link>

                <Link to="/carrinho">
                    🛒 Carrinho ({quantidadeTotal})
                </Link>

                {usuario ? (
                    <>
                        <span>
                            Olá, {usuario.nome}
                        </span>

                        <button onClick={logout}>
                            Sair
                        </button>
                    </>
                ) : (
                    <Link to="/login">
                        Entrar
                    </Link>
                )}

            </nav>

        </header>
    );
}