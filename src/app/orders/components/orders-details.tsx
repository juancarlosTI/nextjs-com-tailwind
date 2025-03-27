"use client"
import Image from "next/image";
import { useSelector } from "react-redux";

import { RootState } from "../store/components/store";


const OrdersDetails = () => {

    const orders = useSelector((state: RootState) => state.order);

    return (
        <div className="pt-24 px-5">
            <div className="flex gap-2">
                <Image src="/scroll-text.png" alt="" width={16} height={16} />
                <h1 className="">Meus Pedidos</h1>
            </div>
            {/* Listagem dos pedidos */}
            <div className="border-2 border-solid">
                <p>Order-ID: {orders.id}</p>
                <p>ConsumptionMethod: {orders.consumptionMethod}</p>
                <div>
                    <p>Produtos:</p>
                    <ul>
                        {orders.orderProduct.map((item, index) => {
                            return <li key={index}>
                                <p>{item.id}</p>
                            </li>
                        })}
                    </ul>
                    <div className="flex">
                        <p>Preço:</p>
                        <p>Adicionar à sacola</p>
                    </div>
                </div>
            </div>


        </div >

    );
}

export default OrdersDetails;