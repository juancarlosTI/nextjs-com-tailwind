import { Order, OrderProduct } from "@prisma/client";

import { db } from "@/lib/prisma";

export const addOrderToDb = async (
    order: Omit<Order, "id" | "createAt" | "updateAt">,
    orderProduct: Omit<OrderProduct, "id" | "orderId" | "createAt" | "updateAt">
): Promise<Order> => {
    try {
        const newOrder = await db.order.create({
            data: {
                ...order,
                orderProducts: {
                    create: [orderProduct],
                },
            },
        });
        return newOrder;

    }
    catch (err) {
        console.error("Erro ao registrar o código", err)
        throw err;
    }
}

export const addOrderProductToDb = async (
    orderId: number,
    orderProduct: Omit<OrderProduct, "id" | "orderId" | "createAt" | "updateAt">
): Promise<OrderProduct> => {
    try {
        const newOrderProduct = await db.orderProduct.create({
            data: {
                ...orderProduct,
                orderId, // Vincula ao pedido existente
            },
        });
        return newOrderProduct;
    } catch (err) {
        console.error("Erro ao adicionar ao carrinho",err)
        throw err;
    }
}