"use client"
import Image from "next/image";
import { useSelector } from "react-redux";

import { RootState } from "../store/components/store";

const OrdersDetails = () => {

    const orders = useSelector((state: RootState) => state.orderProduct);

    return (
        <div className="pt-24 px-5">
            <div className="flex gap-2">
                <Image src="/scroll-text.png" alt="" width={16} height={16}/>
                <h1 className="">Meus Pedidos</h1>
            </div>
            {/* Listagem dos pedidos */}
            <ul>
                {orders.map((order,index) => (
                    <li key={index}>
                        <div>
                            <p>Tipo</p>
                            <p>SLUG</p>
                            <p>Produto</p>
                        </div>
                        <div className="flex">
                            <p>Preço</p>
                            <p>Botão?</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>

    );
}

export default OrdersDetails;