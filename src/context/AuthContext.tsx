import {
    createContext,
    useContext,
    useState,
    type ReactNode
} from "react";

interface Usuario {
    id: string;
    nome: string;
    email: string;
    role: string;
}

interface AuthContextData {
    usuario: Usuario | null;
    login: (usuario: Usuario, token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextData | undefined>(
    undefined
);

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {

    const [usuario, setUsuario] = useState<Usuario | null>(() => {

        const usuarioSalvo = localStorage.getItem("usuario");

        return usuarioSalvo
            ? JSON.parse(usuarioSalvo)
            : null;
    });

    function login(usuario: Usuario, token: string) {

        localStorage.setItem(
            "token",
            token
        );

        localStorage.setItem(
            "usuario",
            JSON.stringify(usuario)
        );

        setUsuario(usuario);
    }

    function logout() {

        localStorage.removeItem("token");
        localStorage.removeItem("usuario");

        setUsuario(null);
    }

    return (
        <AuthContext.Provider
            value={{
                usuario,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {

    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth deve ser usado dentro de AuthProvider"
        );
    }

    return context;
}