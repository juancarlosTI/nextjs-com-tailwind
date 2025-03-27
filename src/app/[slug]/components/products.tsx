"use client";
import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";

import { RootState } from "@/app/orders/store/components/store";
import { Button } from "@/components/ui/button";

import { useConsumptionMethod } from "../context/consumptionMethodContext";


interface ProductsProps {
    products: Product[],
}

const Products = ({ products }: ProductsProps) => {

    const currentUrl = usePathname();

    // Contexto 
    const { consumptionMethodContext } = useConsumptionMethod();
    const orders = useSelector((state: RootState) => state.order);

    console.log('Consumption Method - Products: ', consumptionMethodContext);

    return (<>
        <div className="space-y-3 px-5 py-3">
            {products.map(product => (
                <Link onClick={() => console.log("Products click: ", orders)} key={product.id} href={`${currentUrl}/product?item=${product.id}&consumptionMethod=${consumptionMethodContext}`} className="flex items-center justify-between gap-10 py-3">
                    {/* Esquerda */}
                    <div>
                        <h3 className="text-sm font-medium">
                            {product.name}
                        </h3>
                        <p className="line-clamp-2 text-sm text-muted-foreground">
                            {product.description}
                        </p>
                        <p className="pt-3 text-sm font-semibold">
                            {new Intl.NumberFormat("pt-BR", {
                                style: 'currency',
                                currency: 'BRL'
                            }).format(product.price)}</p>
                    </div>

                    {/* Direita */}
                    <div className="relative min-h-[82px] min-w-[120px]">
                        <Image
                            src={product.imageUrl}
                            alt={product.name}
                            fill
                            className="rounded-lg object-contain"
                        />
                    </div>
                </Link>
            ))
            }
        </div >

        <div className="flex justify-center">
            {orders.total > 0 ?
                <div className="flex w-full px-5 py-3 items-center justify-between">
                    <div>
                        <p>Total dos pedidos</p>
                        <p>R$ {orders.total}/{orders.orderProduct.length} item</p>
                    </div>
                    <Button variant="secret" className="bg-red-500">Pagamentos</Button>
                </div>
                :
                <p className="hidden">
                    Não temos orders
                </p>}
        </div>
    </>
    )
}

export default Products;