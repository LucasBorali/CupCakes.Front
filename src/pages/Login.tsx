
import { useState } from "react";
import { isAxiosError } from "axios";
import { login as realizarLogin } from "../services/AuthService";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

type Mensagem = {
    tipo: "sucesso" | "erro";
    texto: string;
} | null;

export function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [carregando, setCarregando] = useState(false);
    const [mensagem, setMensagem] = useState<Mensagem>(null);
    const navigate = useNavigate();

    const { login } = useAuth();

    async function entrar(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (carregando) {
            return;
        }

        setCarregando(true);
        setMensagem(null);

        try {
            const resultado = await realizarLogin({
                email,
                senha
            });

            login(
                resultado.usuario,
                resultado.token
            );

            setMensagem({
                tipo: "sucesso",
                texto: "Login realizado com sucesso!"
            });
            navigate("/");
        } catch (error) {
            console.error("Erro ao realizar login:", error);

            if (isAxiosError(error) && error.response?.status === 401) {
                setMensagem({
                    tipo: "erro",
                    texto: "Email ou senha inválidos. Confira seus dados e tente novamente."
                });
            } else {
                setMensagem({
                    tipo: "erro",
                    texto: "Não foi possível entrar. Verifique sua conexão e tente novamente."
                });
            }
        } finally {
            setCarregando(false);
        }
    }

    return (
        <main>
            <div className="login-container">
                <h1>Entrar</h1>

                {mensagem && (
                    <div
                        className={`mensagem mensagem-${mensagem.tipo}`}
                        role={mensagem.tipo === "erro" ? "alert" : "status"}
                    >
                        {mensagem.texto}
                    </div>
                )}

                <form className="login-form" onSubmit={entrar}>
                    <input
                        type="email"
                        placeholder="Email"
                        aria-label="Email"
                        autoComplete="email"
                        value={email}
                        onChange={e => {
                            setEmail(e.target.value);
                            setMensagem(null);
                        }}
                        required
                        disabled={carregando}
                    />

                    <input
                        type="password"
                        placeholder="Senha"
                        aria-label="Senha"
                        autoComplete="current-password"
                        value={senha}
                        onChange={e => {
                            setSenha(e.target.value);
                            setMensagem(null);
                        }}
                        required
                        disabled={carregando}
                    />

                    <button type="submit" disabled={carregando}>
                        {carregando && (
                            <span className="spinner" aria-hidden="true" />
                        )}
                        {carregando ? "Entrando..." : "Entrar"}
                    </button>
                </form>
            </div>
        </main>
    );
}
