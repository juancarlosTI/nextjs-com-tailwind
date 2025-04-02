"use client";

import { createContext, ReactNode, useContext, useState } from "react";


interface CartContextType {
    isCartVisible: string;
    setCartVisible: (visible: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [isCartVisible, setCartVisible] = useState(false);

    return (
        <CartContext.Provider value={{ isCartVisible, setCartVisible }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};