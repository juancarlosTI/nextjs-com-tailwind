import { db } from "@/lib/prisma";

export const getRestaurantById = async (id:string) => {
    const restaurant = await db.restaurant.findUnique({ where: {id}});
    return restaurant;
}