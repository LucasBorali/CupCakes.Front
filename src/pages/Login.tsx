import { useState } from "react";
import { login as realizarLogin } from "../services/AuthService";
import { useAuth } from "../context/AuthContext";
export function Login() {

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const { login } = useAuth();

    async function entrar() {

        try {

            const resultado = await realizarLogin({
                email,
                senha
            });

            login(
                resultado.usuario,
                resultado.token
            );

            alert("Login realizado com sucesso!");

        } catch {

            alert("Email ou senha inválidos");
        }
    }

   return (
    <main>
        <div className="login-container">

            <h1>Entrar</h1>

            <div className="login-form">

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Senha"
                    value={senha}
                    onChange={e => setSenha(e.target.value)}
                />

                <button onClick={entrar}>
                    Entrar
                </button>

            </div>

        </div>
    </main>
);
}