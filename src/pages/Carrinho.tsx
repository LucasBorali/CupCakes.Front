import { useCart } from "../context/CartContext";
import { criarPedido } from "../services/pedidoService";

export function Carrinho() {

    const {
        itens,
        remover,
        alterarQuantidade,
        valorTotal
    } = useCart();

    async function finalizarPedido() {

        try {

            const pedido = {
                itens: itens.map(item => ({
                    produtoId: item.produto.id,
                    quantidade: item.quantidade
                }))
            };

            const resultado = await criarPedido(pedido);

            alert(
                `Pedido realizado com sucesso!\nPedido: ${resultado.pedidoId}`
            );

        } catch (error) {

            console.error(error);

            alert(
                "Não foi possível finalizar o pedido."
            );
        }
    }

    if (itens.length === 0) {
        return (
            <main>
                <h1>Seu carrinho está vazio</h1>
            </main>
        );
    }

    return (
        <main>

            <h1>Seu carrinho</h1>

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
                                onClick={() =>
                                    alterarQuantidade(
                                        item.produto.id,
                                        item.quantidade - 1
                                    )
                                }
                            >
                                -
                            </button>

                            <span>
                                {item.quantidade}
                            </span>

                            <button
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

                    <button onClick={finalizarPedido}>
                        Finalizar pedido
                    </button>

                </div>

            </div>

        </main>
    );
}