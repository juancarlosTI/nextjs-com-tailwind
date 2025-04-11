import { getAllOrders } from "@/data/get-orders";

import OrdersHeader from "./components/header"
import OrdersDetails from "./components/orders-details"

const OrderPage = async() => {

    const orders = await getAllOrders();



    return (
        <div>
            <OrdersHeader/>
            <OrdersDetails orders={orders}/>
        </div>
    )
}

export default OrderPage