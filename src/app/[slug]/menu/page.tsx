import { notFound } from "next/navigation";

import { db } from "@/lib/prisma";

import RestaurantCategories from "../components/categories";
import { ConsumptionMethodProvider } from "../context/consumptionMethodContext";
import ConsumptionMethodWrapper from "../context/consumptionMethodWrapper";
import RestaurantHeader from "./components/header";

interface RestaurantMenuPageProps {
    params: { slug: string }
    searchParams: { consumptionMethod: string }
}

const isConsumptionMethodValid = (consumptionMethod: string) => {
    return ["DINE_IN", "TAKEAWAY"].includes(consumptionMethod.toUpperCase());
}

const RestaurantMenuPage = async ({ params, searchParams }: RestaurantMenuPageProps) => {
    const { slug } = await params;
    const { consumptionMethod } = await searchParams;

    if (!isConsumptionMethodValid(consumptionMethod)) {
        return notFound();
    }


    // Criar contexto para o consumptionMethod - Só será permitido pedidos do mesmo restaurante


    const restaurant = await db.restaurant.findUnique({
        where: { slug },
        include: {
            menuCategories: {
                include: {
                    products: true
                }
            }
        }
    })
    if (!restaurant) {
        return notFound();
    }
    return (
        <div>
            <ConsumptionMethodProvider consumptionMethod={consumptionMethod}>
                <ConsumptionMethodWrapper>
                    <RestaurantHeader restaurant={restaurant} />
                    <RestaurantCategories restaurant={restaurant} />              
                </ConsumptionMethodWrapper>
            </ConsumptionMethodProvider>

        </div >
    );
}

export default RestaurantMenuPage; 