"use client"
import { ConsumptionMethod, OrderStatus, Product, Restaurant } from "@prisma/client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "@/app/orders/store/components/store";
import { addProductToOrder, createOrderWithProduct } from "@/app/orders/store/reducers/orderProducts-and-order";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";


interface ProductDetailsProps {
    product: Product
    restaurant: Restaurant
    params: { slug: string }
    consumptionMethodProps: { consumptionMethod: string }
}

const ProductDetails = ({ product, restaurant, params, consumptionMethodProps }: ProductDetailsProps) => {
    const [quantity, setQuantity] = useState(1);

    const { slug } = params;
    const { consumptionMethod } = consumptionMethodProps;
    const { toast } = useToast();

    const dispatch = useDispatch();
    const order = useSelector((state: RootState) => state.order);

    //Handler's
    const handleQuantity = (type: string) => {
        if (type === "minus" && quantity > 1) {
            setQuantity(prevState => prevState - 1)
        } else if (type === "plus") {
            setQuantity(prevState => prevState + 1)
        }
    }

    const handleAddToCart = () => {

        const orderData = {
            consumptionMethod: consumptionMethod as ConsumptionMethod,
            status: "PENDING" as OrderStatus,
            total: product.price * quantity,
            restaurantId: restaurant.id
        }

        const productData = {
            id: "",
            orderId: 0,
            productId: product.id,
            quantity: quantity,
            price: product.price,
            createdAt: new Date(),
            updatedAt: new Date(),
            product: {
                id: product.id,
                name: product.name,
                description: product.description,
                price: product.price,
                imageUrl: product.imageUrl,
                ingredients: product.ingredients,
                restaurantId: product.restaurantId,
                menuCategoryId: product.menuCategoryId,
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        }

        // Verificar se o pedido que está sendo adicionado é do mesmo restaurante
        // Verificar se já existe um pedido e se o método de consumo é o mesmo
        // Resolver problema de declaração de ID. (Quando um pedido já existir, ele existirá no banco de dados e terá um ID !== 0. Logo entrará no laço else automaticamente)

        if (order.total == 0) {
            console.log(orderData);
            console.log(productData);

            // Significa que o estado é o inicial. - Iniciar o order
            dispatch(createOrderWithProduct({ order: orderData, orderProducts: productData }))
            console.log("Ação despacha com sucesso")
        } else if (order.total > 0) {
            dispatch(addProductToOrder(productData))
        }
    }
    // chartContext possuirá o produto e a quantidade;
    // Só podem ser adicionado produtos da mesma loja por pedido;


    if (!slug) {
        return notFound();
    }
    console.log("Recebendo params :", slug);

    return (
        <div className="p-5 rounded-3xl flex flex-col gap-4">
            <div>
                <div className="flex items-center gap-2">
                    <Image className="rounded-full" src={restaurant.avatarImageUrl} alt={restaurant.name} height={18} width={18} />
                    <div>
                        <p className="text-sm text-gray-300">{restaurant.name}</p>
                    </div>
                </div>
                <p className="font-semibold text-lg">{product.name}</p>
            </div>
            <div>
                <div className="flex items-center gap-2 justify-between">
                    <p className="text-2xl font-semibold">R${product.price}</p>
                    <div className="flex items-center justify-center gap-4">
                        <Button className={quantity > 1 ? "bg-red-500 text-white" : ""} onClick={() => handleQuantity("minus")} variant="outline" size="icon">
                            <ChevronLeft />
                        </Button>
                        <p className="w-[24px] text-center">{quantity}</p>
                        <Button className={quantity >= 1 ? "bg-red-500 text-white" : ""} onClick={() => handleQuantity("plus")} variant="outline" size="icon">
                            <ChevronRight />
                        </Button>
                    </div>

                </div>
            </div>
            <div className="">
                <div>
                    <p className="font-semibold text-lg">
                        Sobre
                    </p>
                    <p>
                        {product.description}
                    </p>
                </div>
                <div className="py-5">
                    <div className="flex items-center gap-2">
                        <Image
                            src="/chef-hat.png"
                            alt=""
                            className="object-contain"
                            width={16}
                            height={16}
                        />
                        <p className="font-semibold text-lg">
                            Ingredientes:
                        </p>
                    </div>
                    <ul className="px-5 list-disc">
                        {product.ingredients.map((ingredient, index) => {
                            return <li key={index}>{ingredient}</li>
                        })}
                    </ul>
                </div>
            </div>
            <Button className="rounded-full" onClick={() => handleAddToCart()}>Adicionar à Sacola</Button>

        </div>

    );
}

{/* - Borda redonda 
    - Precisa estar fixa, independente da rolagem da tela (Se ela estiver centralizada horizontalmente, o tamanho da listagem dos detalhes pode alterar a centralização)*/}

export default ProductDetails;