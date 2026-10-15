
import { useEffect, useState } from "react";
import { api } from "../services/api";
import type { Produto } from "../types/Produto";
import { ProductCard } from "../components/ProductCard";

export function Home() {
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(false);

    useEffect(() => {
        async function carregarProdutos() {
            try {
                const response = await api.get<Produto[]>("/Produto");
                setProdutos(response.data);
            } catch (error) {
                console.error("Erro ao carregar cupcakes:", error);
                setErro(true);
            } finally {
                setLoading(false);
            }
        }

        carregarProdutos();
    }, []);

    return (
        <main>
            <h1>CupCake Gourmet</h1>

            {loading ? (
                <div className="estado-carregamento" role="status">
                    <span className="spinner spinner-rosa" aria-hidden="true" />
                    <p>Preparando nossos cupcakes...</p>
                </div>
            ) : erro ? (
                <div className="mensagem mensagem-erro" role="alert">
                    Não foi possível carregar os cupcakes.
                    Verifique sua conexão e tente novamente.
                    <button
                        className="botao-recarregar"
                        onClick={() => window.location.reload()}
                    >
                        Tentar novamente
                    </button>
                </div>
            ) : produtos.length === 0 ? (
                <div className="estado-vazio">
                    <h2>Nenhum cupcake disponível</h2>
                    <p>Volte em breve para conferir nossas opções!</p>
                </div>
            ) : (
                <div className="product-grid">
                    {produtos.map(produto => (
                        <ProductCard
                            key={produto.id}
                            produto={produto}
                        />
                    ))}
                </div>
            )}
        </main>
    );
}
