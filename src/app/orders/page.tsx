import { getAllOrders } from "@/data/get-orders";
import { getRestaurantById } from "@/data/get-restaurant-by-id";
import { getRestaurantBySlug } from "@/data/get-restaurant-by-slug";

import OrdersHeader from "./components/header"
import OrdersDetails from "./components/orders-details"

const fetchRestaurantData = async (restaurantId: string) => {
    const restaurant = await getRestaurantById(restaurantId); // 
    return restaurant;
}

const OrderPage = async () => {

    const orders = await getAllOrders();

    const restaurantIds = orders.map((order) => order.restaurantId);

    const restaurants = await Promise.all(
        restaurantIds.map(async (id) => {
          const restaurant = await fetchRestaurantData(id);
          return restaurant
        })
      );

    // console.log("Slugs dos restaurantes:", slugs);

    return (
        <div>
            <OrdersHeader />
            <OrdersDetails orders={orders} restaurants={restaurants}/>
        </div>
    )
}

export default OrderPage