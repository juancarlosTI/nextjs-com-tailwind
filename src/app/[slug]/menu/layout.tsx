import Cart from "@/app/cart/components/cart";

export default function RestaurantLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative">
            {children}  {/* Renderiza a página correspondente */}
            <Cart />    {/* Mantém o Carrinho visível em todas as páginas */}
        </div>
    );
}