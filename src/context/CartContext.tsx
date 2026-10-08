import { createContext, useContext, useState, type ReactNode } from "react";
import type { Produto } from "../types/Produto";

interface CartItem {
    produto: Produto;
    quantidade: number;
}

interface CartContextData {
    itens: CartItem[];
    adicionar: (produto: Produto) => void;
    remover: (produtoId: string) => void;
    alterarQuantidade: (produtoId: string, quantidade: number) => void;
    quantidadeTotal: number;
    valorTotal: number;
}

const CartContext = createContext<CartContextData | undefined>(undefined);

interface CartProviderProps {
    children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
    const [itens, setItens] = useState<CartItem[]>([]);

    function adicionar(produto: Produto) {
        setItens(itensAtuais => {
            const itemExistente = itensAtuais.find(
                item => item.produto.id === produto.id
            );

            if (itemExistente) {
                return itensAtuais.map(item =>
                    item.produto.id === produto.id
                        ? { ...item, quantidade: item.quantidade + 1 }
                        : item
                );
            }

            return [
                ...itensAtuais,
                {
                    produto,
                    quantidade: 1
                }
            ];
        });
    }

    function remover(produtoId: string) {
        setItens(itensAtuais =>
            itensAtuais.filter(item => item.produto.id !== produtoId)
        );
    }

    function alterarQuantidade(produtoId: string, quantidade: number) {
        if (quantidade <= 0) {
            remover(produtoId);
            return;
        }

        setItens(itensAtuais =>
            itensAtuais.map(item =>
                item.produto.id === produtoId
                    ? { ...item, quantidade }
                    : item
            )
        );
    }

    const quantidadeTotal = itens.reduce(
        (total, item) => total + item.quantidade,
        0
    );

    const valorTotal = itens.reduce(
        (total, item) => total + item.produto.preco * item.quantidade,
        0
    );

    return (
        <CartContext.Provider
            value={{
                itens,
                adicionar,
                remover,
                alterarQuantidade,
                quantidadeTotal,
                valorTotal
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error("useCart deve ser usado dentro de CartProvider");
    }

    return context;
}