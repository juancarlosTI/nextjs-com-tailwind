// hooks/useAddToCart.ts
import { ConsumptionMethod, OrderStatus, Product, Restaurant } from "@prisma/client";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../orders/store/components/store";
import { addProductToOrder, createOrderWithProduct } from "../orders/store/reducers/orderProducts-and-order";

// ajuste para onde está o slice

export function useAddToCart() {
    const dispatch = useDispatch<AppDispatch>();
    const order = useSelector((state: RootState) => state.order);

    const handleAddToCart = ({ product, restaurant, consumptionMethod, quantity }: {
        product: Product;
        restaurant: Restaurant;
        consumptionMethod: string;
        quantity: number;
    }) => {
        const orderData = {
            consumptionMethod: consumptionMethod as ConsumptionMethod,
            status: "PENDING" as OrderStatus,
            total: product.price * quantity,
            restaurantId: restaurant.id
        };

        const productData = {
            id: "",
            orderId: 0,
            productId: product.id,
            quantity,
            price: product.price,
            createdAt: new Date(),
            updatedAt: new Date(),
            product: {
                ...product,
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        };

        if (order.total === 0) {
            dispatch(createOrderWithProduct({ order: orderData, orderProducts: productData }));
        } else {
            dispatch(addProductToOrder(productData));
        }
    };

    return { handleAddToCart };
}
