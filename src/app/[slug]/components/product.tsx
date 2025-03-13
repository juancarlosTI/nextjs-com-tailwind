"use client"
import { ConsumptionMethod, OrderProduct, Product, Restaurant } from "@prisma/client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "@/app/orders/store/components/store";
import { setOrder } from "@/app/orders/store/reducers/orderProducts";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";


interface ProductDetailsProps {
    product: Product
    restaurant: Restaurant
    params: { slug: string , consumptionMethod:string}
}

const ProductDetails = ({ product, restaurant, params }: ProductDetailsProps) => {
    const [quantity, setQuantity] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState({
        isOpen: false,
        validation: false
    });
    
    const { slug } = params;

    // Como obter o pedido? Redux
    const dispatch = useDispatch();
    const orderProducts = useSelector((state: RootState) => state.orderProduct);
    const order = useSelector((state:RootState)=> state.order)

    //Handler's
    const handleQuantity = (type: string) => {
        if (type === "minus" && quantity > 1) {
            setQuantity(prevState => prevState - 1)
        } else if (type === "plus") {
            setQuantity(prevState => prevState + 1)
        }
    }

    const handleModalOpen = () => {
        console.log(order)
        setIsModalOpen((prev) => ({
            ...prev,
            isOpen: !prev.isOpen
        }))
    }

    const handleConfirmOrderProduct = () => {
        // Salvar pedido no redux
        if (isModalOpen.validation) {
            return setIsModalOpen({
                isOpen: false,
                validation: false
            })
        }

        // Checar estado do redux

        // const orderProduct : OrderProduct = {
        //     product:product,
        //     productId: product.id,



        // }
        if (order.id === 0){
            // Significa que o estado é o inicial. - Iniciar o order
            dispatch(setOrder({
                id:0,
                consumptionMethod: slug as ConsumptionMethod,
                status:"PENDING",
                total: 1,
                createdAt:new Date(),
                updatedAt:new Date(),
                restaurantId: restaurant.id
            }))
        } else {
            // dispatch()
            console.log(order);
        }

        setIsModalOpen((prev) => ({
            isOpen: !prev.isOpen,
            validation: !prev.validation
        }));
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
                        <Button className={quantity > 1 ? "bg-red-500" : ""} onClick={() => handleQuantity("minus")} variant="outline" size="icon">
                            <ChevronLeft />
                        </Button>
                        <p className="w-[24px] text-center">{quantity}</p>
                        <Button className={quantity >= 1 ? "bg-red-500" : ""} onClick={() => handleQuantity("plus")} variant="outline" size="icon">
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
            <Button className="rounded-full" onClick={() => handleModalOpen()}>Adicionar à Sacola</Button>

            {/* Modal */}
            <Dialog open={isModalOpen.isOpen} onOpenChange={() => handleModalOpen()}>
                <DialogContent className="rounded-3xl p-6 w-[340px]">
                    <DialogHeader>
                        <DialogTitle>Quase lá</DialogTitle>
                        <p className="text-gray-500 text-center">
                            Para finalizar seu pedido, insira os seus dados abaixo:
                        </p>
                    </DialogHeader>
                    <form className="space-y-4">
                        <h4>Seu nome</h4>
                        <Input type="name" placeholder="Nome" />
                        <h4>Seu CPF</h4>
                        <Input type="cpf" placeholder="Seu CPF" />
                    </form>
                    <div className="flex justify-between">
                        <Button onClick={() => handleModalOpen()} className="rounded-full bg-gray-300 w-[130px] font-semibold">Cancelar</Button>
                        <Button className="rounded-full bg-red-500 w-[130px] font-semibold" onClick={() => handleConfirmOrderProduct()}>Finalizar</Button>
                    </div>
                </DialogContent>
            </Dialog>

            <Dialog open={isModalOpen.validation} onOpenChange={() => handleConfirmOrderProduct()}>
                <DialogContent className="rounded-3xl flex flex-col w-[340px] min-h-[280px]">
                    <DialogHeader className="flex flex-col items-center">
                        <div className="flex justify-center w-[80px] h-[80px]">
                            <Image
                                src="/big-check-icon.png"
                                alt="Order Checked"
                                className="object-contain"
                                width={72}
                                height={72}
                            />
                        </div>
                        <DialogTitle className="text-center">
                            Pedido efetuado
                        </DialogTitle>
                    </DialogHeader>
                    <div className="flex space-y-4">
                        <p className="text-center">
                            Seu pedido foi realizado com sucesso!
                        </p>
                    </div>
                    <div className="flex justify-between">
                        <Link href={`/${slug}/menu/cart?consumptionMethod=DINE_IN`}>
                            <Button variant="ghost" className="rounded-3xl w-[130px] text-red-500 font-semibold">Ver pedidos</Button>
                        </Link>
                        <Button variant="secondary" className="rounded-3xl w-[130px] font-semibold" onClick={() => handleConfirmOrderProduct()}>Continuar</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>

    );
}

{/* - Borda redonda 
    - Precisa estar fixa, independente da rolagem da tela (Se ela estiver centralizada horizontalmente, o tamanho da listagem dos detalhes pode alterar a centralização)*/}

export default ProductDetails;