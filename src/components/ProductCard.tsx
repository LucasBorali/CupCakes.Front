import type { Produto } from "../types/Produto";
import { useCart } from "../context/CartContext";

interface ProductCardProps {
    produto: Produto;
}

export function ProductCard({ produto }: ProductCardProps) {
    const { adicionar } = useCart();

    return (
        <div className="product-card">
            <img
                src={
                    produto.imagemUrl ||
                    "https://placehold.co/400x300?text=Cupcake"
                }
                alt={produto.nome}
            />

            <div className="product-card-content">
                <h3>{produto.nome}</h3>

                <p>{produto.descricao}</p>

                <div className="product-card-footer">
                    <span>
                        R$ {produto.preco.toFixed(2)}
                    </span>

                    <button onClick={() => adicionar(produto)}>
                        Adicionar
                    </button>
                </div>
            </div>
        </div>
    );
}