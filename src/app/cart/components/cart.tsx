"use client"
import { useSelector } from "react-redux";

import { RootState } from "@/app/orders/store/components/store";


const Cart = () => {

    const cart = useSelector((state: RootState) => state.order);

    return (
        <div>
            <p>Listar todas os items do pedido atual - OrderProduct</p>
            <ul>
                {cart.orderProduct.map((item, index) => {
                    return <li key={index}>
                        <p>{item.product.name}</p>
                    </li>
                })}
            </ul>
        </div>
    )
}

export default Cart;