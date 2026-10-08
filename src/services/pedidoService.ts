import { api } from "./api";

interface CriarItemPedido {
    produtoId: string;
    quantidade: number;
}

interface CriarPedido {
    itens: CriarItemPedido[];
}

interface PedidoResponse {
    mensagem: string;
    pedidoId: string;
    valorTotal: number;
    status: string;
}

export async function criarPedido(
    pedido: CriarPedido
): Promise<PedidoResponse> {

    const response = await api.post<PedidoResponse>(
        "/Pedido",
        pedido
    );

    return response.data;
}