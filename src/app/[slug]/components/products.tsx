"use client";
import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useConsumptionMethod } from "../context/consumptionMethodContext"; 


interface ProductsProps {
    products: Product[],
}

const Products = ({ products }: ProductsProps) => {

    const currentUrl = usePathname();

    // Contexto 
    const { consumptionMethodContext } = useConsumptionMethod();  

    console.log('Consumption Method - Products: ', consumptionMethodContext);
    
    return (
        <div className="space-y-3 px-5 py-3">
            {products.map(product => (
                <Link key={product.id} href={`${currentUrl}/product?item=${product.id}&consumptionMethod=${consumptionMethodContext}`} className="flex items-center justify-between gap-10 py-3">
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
    )
}

export default Products;