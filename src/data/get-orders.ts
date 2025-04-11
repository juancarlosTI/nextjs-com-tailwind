import { db } from "@/lib/prisma";

export const getAllOrders = async () => {
    const orders = await db.order.findMany({
      // opcional: ordena do mais recente para o mais antigo
      orderBy: { createdAt: "desc" },
      include: {
        orderProducts: {
          include: {
            product: true,
          },
        },
      },
    });
    return orders;
  };