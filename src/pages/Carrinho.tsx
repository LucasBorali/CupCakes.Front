
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { criarPedido } from "../services/pedidoService";

type Mensagem = {
    tipo: "sucesso" | "erro";
    texto: string;
} | null;

export function Carrinho() {
    const {
        itens,
        remover,
        alterarQuantidade,
        limparCarrinho,
        valorTotal
    } = useCart();

    const [carregando, setCarregando] = useState(false);
    const [mensagem, setMensagem] = useState<Mensagem>(null);

    async function finalizarPedido() {
        if (carregando || itens.length === 0) {
            return;
        }

        setCarregando(true);
        setMensagem(null);

        try {
            const pedido = {
                itens: itens.map(item => ({
                    produtoId: item.produto.id,
                    quantidade: item.quantidade
                }))
            };

            const resultado = await criarPedido(pedido);

            limparCarrinho();

            setMensagem({
                tipo: "sucesso",
                texto: `Pedido realizado com sucesso! Número: ${resultado.pedidoId}`
            });
        } catch (error) {
            console.error("Erro ao finalizar pedido:", error);

            setMensagem({
                tipo: "erro",
                texto: "Não foi possível finalizar seu pedido. Verifique sua conexão e tente novamente."
            });
        } finally {
            setCarregando(false);
        }
    }

    return (
        <main>
            <h1>Seu carrinho</h1>

            {mensagem && (
                <div
                    className={`mensagem mensagem-${mensagem.tipo}`}
                    role={mensagem.tipo === "erro" ? "alert" : "status"}
                >
                    {mensagem.texto}
                </div>
            )}

            {itens.length === 0 ? (
                <p>Seu carrinho está vazio.</p>
            ) : (
                <div className="cart">
                    {itens.map(item => (
                        <div
                            className="cart-item"
                            key={item.produto.id}
                        >
                            <div>
                                <h3>{item.produto.nome}</h3>
                                <p>
                                    R$ {item.produto.preco.toFixed(2)}
                                </p>
                            </div>

                            <div>
                                <button
                                    disabled={carregando}
                                    onClick={() =>
                                        alterarQuantidade(
                                            item.produto.id,
                                            item.quantidade - 1
                                        )
                                    }
                                >
                                    -
                                </button>

                                <span>{item.quantidade}</span>

                                <button
                                    disabled={carregando}
                                    onClick={() =>
                                        alterarQuantidade(
                                            item.produto.id,
                                            item.quantidade + 1
                                        )
                                    }
                                >
                                    +
                                </button>
                            </div>

                            <strong>
                                R${" "}
                                {(
                                    item.produto.preco *
                                    item.quantidade
                                ).toFixed(2)}
                            </strong>

                            <button
                                disabled={carregando}
                                onClick={() =>
                                    remover(item.produto.id)
                                }
                            >
                                Remover
                            </button>
                        </div>
                    ))}

                    <div className="cart-total">
                        <h2>
                            Total: R$ {valorTotal.toFixed(2)}
                        </h2>

                        <button
                            onClick={finalizarPedido}
                            disabled={carregando}
                        >
                            {carregando
                                ? "Finalizando pedido..."
                                : "Finalizar pedido"}
                        </button>
                    </div>
                </div>
            )}
        </main>
    );
}
