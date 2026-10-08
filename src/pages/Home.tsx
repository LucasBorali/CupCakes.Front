import { useEffect, useState } from "react";
import { api } from "../services/api";
import type { Produto } from "../types/Produto";
import { ProductCard } from "../components/ProductCard";


export function Home() {
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        carregarProdutos();
    }, []);

    async function carregarProdutos() {
        try {
            const response = await api.get<Produto[]>("/Produto");

            setProdutos(response.data);
        }
        catch (error) {
            console.error(error);
        }
        finally {
            setLoading(false);
        }
    }

    if (loading) {
        return <h2>Carregando cupcakes...</h2>;
    }

    return (
        <main>
            <h1>CupCake Gourmet</h1>

            <div className="product-grid">
                {produtos.map(produto => (
                    <ProductCard
                        key={produto.id}
                        produto={produto}
                    />
                ))}
            </div>
        </main>
    );
}