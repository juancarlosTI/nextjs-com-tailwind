"use client"
import { Product, Restaurant } from "@prisma/client";
import Image from "next/image";

import { useAddToCart } from "@/app/hooks/useAddToCart";
import { Button } from "@/components/ui/button";

type Order = {
  status: string;
  id: number;
  consumptionMethod: string;
  total: number;
  restaurantId: string;
  orderProducts: {
    id: string;
    quantity: number;
    price: number;
    product: Product;
  }[];
};


interface Props {
  orders: Order[];
  restaurants: Restaurant[];
}


const OrdersDetails: React.FC<Props> = ({ orders, restaurants }: Props) => {
  const { handleAddToCart } = useAddToCart();

  return (
    <div className="pt-24 px-5">
      <div className="flex gap-2">
        <Image src="/scroll-text.png" alt="" width={16} height={16} />
        <h1 className="">Meus Pedidos</h1>
      </div>
      {/* Listagem dos pedidos 
        Status
        Nome do estabelecimento
        Nome do produto
        Preço
        Adicionar a sacola (novamente) - Novo item
      */}



      {orders.map((order) => {

        const orderRestaurant = restaurants.find((r) => r.id === order.restaurantId);


        return <div key={order.id} className="border-2 border-solid rounded-xl p-4 my-4 flex flex-col gap-2">
          <p className={`px-2 border rounded-3xl w-fit font-bold
          ${order.status === "PENDING" ? "bg-white" :
              order.status === "IN_PREPARATION" ? "bg-creme text-textcreme" :
                order.status === "FINISHED" ? "bg-green-500" : ""
            }`}>{order.status}</p>
          <div className="flex items-center gap-2">
            <Image src={orderRestaurant?.avatarImageUrl} alt="Slug" width={16} height={16} />
            <p className="capitalize flex font-bold">{orderRestaurant?.slug}</p>
          </div>

          <div>
            <ul>
              {order.orderProducts.map((item) => (
                <li key={item.id} className="text-sm">
                  <div className="flex items-center gap-2 border-t border-b py-2">
                    <span className="w-6 h-6 bg-gray-500 text-white rounded-full text-center text-xs flex items-center justify-center">
                      {item.quantity}
                    </span>
                    <p>{item.product.name}</p>
                  </div>

                  <div className="flex justify-between items-center mt-5">
                    <p>R$ {item.price.toFixed(2)}</p>
                    <Button variant="ghost" className="text-red-500" onClick={() => handleAddToCart({
                      product: item.product,
                      restaurant: orderRestaurant!,
                      consumptionMethod: order.consumptionMethod as ConsumptionMethod,
                      quantity: 1,
                    })}>Adicionar à sacola</Button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      })}
    </div >

  );
}

export default OrdersDetails;