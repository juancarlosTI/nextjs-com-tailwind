import { OrderProduct } from "@prisma/client";

import { db } from "@/lib/prisma";

export const addOrderProductToDb = async (orderProduct: OrderProduct) => {
    await db.orderProduct.create({
        data: orderProduct
    }).catch((err) => {
        console.error("Erro: ", err)
    });
    
}