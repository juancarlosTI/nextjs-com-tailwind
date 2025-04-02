import Cart from "@/app/cart/components/cart";

import { CartProvider } from "../contexts/cartContext";

export default function RestaurantLayout({ children }: { children: React.ReactNode }) {
    return (
        <CartProvider>
            <div className="relative">
                {children}  {/* Renderiza a página correspondente */}
                <Cart />    {/* Mantém o Carrinho visível em todas as páginas */}
            </div>
        </CartProvider>
    );
}