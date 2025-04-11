import { Order, OrderProduct } from "@prisma/client";

import { db } from "@/lib/prisma";

// Define um payload que inclui os produtos
export type NewOrderWithProducts = Omit<
    Order,
    "id" | "createdAt" | "updatedAt"
> & {
    orderProducts: Array<
        Omit<OrderProduct, "id" | "orderId" | "createdAt" | "updatedAt">
    >;
};

export const addOrderToDb = async (
    order: NewOrderWithProducts) => {
    return db.order.create({
        data: {
            // campos escalares
            total: order.total,
            status: order.status,
            consumptionMethod: order.consumptionMethod,
            restaurantId: order.restaurantId,

            // nested create para todos os produtos
            orderProducts: {
                create: order.orderProducts.map((p) => ({
                    productId: p.productId,
                    quantity: p.quantity,
                    price: p.price,
                })),
            },
        },
        include: {
            orderProducts: true,  // retorna também os produtos criados
        },
    });
}

// Ao adicionar um order (vindo do redux) ao banco de dados, não é possível alterar a order.
// Muda de status "pending" para "in_preparation"

