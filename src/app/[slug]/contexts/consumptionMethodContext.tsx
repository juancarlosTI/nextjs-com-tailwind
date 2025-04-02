"use client";
import { createContext, ReactNode, useContext, useState } from "react";

interface ConsumptionMethodContextType {
    consumptionMethodContext: string;
    setConsumptionMethodContext: (value: string) => void;
}

const ConsumptionMethodContext = createContext<ConsumptionMethodContextType | undefined>(undefined);

export const ConsumptionMethodProvider = ({ children, consumptionMethod }: { children: ReactNode, consumptionMethod: string }) => {
    const [consumptionMethodContext, setConsumptionMethodContext] = useState(consumptionMethod);

    return (
        <ConsumptionMethodContext.Provider value={{ consumptionMethodContext, setConsumptionMethodContext }}>
            {children}
        </ConsumptionMethodContext.Provider>
    );
};

export const useConsumptionMethod = () => {
    const context = useContext(ConsumptionMethodContext);
    if (!context) {
        throw new Error("useConsumptionMethod deve ser usado dentro de um ConsumptionMethodProvider");
    }
    return context;
};