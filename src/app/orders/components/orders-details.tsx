"use client"
import Image from "next/image";
import { useSelector } from "react-redux";

import { RootState } from "../store/components/store";

type Order = {
  id: number;
  consumptionMethod: string;
  total: number;
  orderProducts: {
    id: string;
    quantity: number;
    price: number;
    product: { name: string; price: number };
  }[];
};


interface Props {
  orders: Order[];
}

const OrdersDetails: React.FC<Props> = ({ orders }: Props) => {

  console.log(orders);


  return (
    <div className="pt-24 px-5">
      <div className="flex gap-2">
        <Image src="/scroll-text.png" alt="" width={16} height={16} />
        <h1 className="">Meus Pedidos</h1>
      </div>
      {/* Listagem dos pedidos */}

      {orders.map((order) => (
        <div key={order.id} className="border-2 border-solid p-4 my-4">
          <p>Order‑ID: {order.id}</p>
          <p>ConsumptionMethod: {order.consumptionMethod}</p>
          <p>Total: R$ {order.total.toFixed(2)}</p>

          <div>
            <p>Produtos:</p>
            <ul>
              {order.orderProducts.map((item) => (
                <li key={item.id}>
                  {item.product.name} — qtd: {item.quantity} — R$ {item.price.toFixed(2)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div >

  );
}

export default OrdersDetails;