
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export function Header() {
    const { quantidadeTotal } = useCart();
    const { usuario, logout } = useAuth();

    return (
        <header className="header">
            <Link to="/" className="logo" aria-label="CupCake Gourmet - Início">
                <span className="logo-icon">🧁</span>
                <span className="logo-text">
                    CupCake <strong>Gourmet</strong>
                </span>
            </Link>

            <nav className="header-nav" aria-label="Navegação principal">
                <NavLink
                    to="/"
                    end
                    className={({ isActive }) =>
                        `nav-link ${isActive ? "active" : ""}`
                    }
                >
                    Início
                </NavLink>

                <NavLink
                    to="/carrinho"
                    className={({ isActive }) =>
                        `nav-link ${isActive ? "active" : ""}`
                    }
                >
                    <span className="cart-link-icon" aria-hidden="true">
                        🛒
                    </span>
                    Carrinho
                    <span className="cart-badge" aria-label={`${quantidadeTotal} itens`}>
                        {quantidadeTotal}
                    </span>
                </NavLink>

                <div className="header-user">
                    {usuario ? (
                        <>
                            <span className="user-greeting">
                                Olá, <strong>{usuario.nome}</strong>
                            </span>

                            <button
                                className="logout-button"
                                onClick={logout}
                            >
                                Sair
                            </button>
                        </>
                    ) : (
                        <NavLink
                            to="/login"
                            className={({ isActive }) =>
                                `login-link ${isActive ? "active" : ""}`
                            }
                        >
                            Entrar
                        </NavLink>
                    )}
                </div>
            </nav>
        </header>
    );
}
