"use client"
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useSelector } from "react-redux";

import { useCart } from "@/app/[slug]/contexts/cartContext"; 
import { RootState } from "@/app/orders/store/components/store";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";


const Cart = () => {

    const cart = useSelector((state: RootState) => state.order);
    const [quantity, setQuantity] = useState(1);
    const { isCartVisible, setCartVisible } = useCart();
    const [isModalOpen, setIsModalOpen] = useState({
        isOpen: false,
        validation: false
    });

    const handleModalOpen = () => {
        console.log("Modal Open: ", cart)
        setIsModalOpen((prev) => ({
            ...prev,
            isOpen: !prev.isOpen
        }))
    }

    const handleConfirmOrder = () => {
        // Salvar pedido no DB
        // Zerar redux-order
        if (isModalOpen.validation) {
            return setIsModalOpen({
                isOpen: false,
                validation: false
            })
        }

        setIsModalOpen((prev) => ({
            isOpen: !prev.isOpen,
            validation: !prev.validation
        }));
    }




    return (
        <div>
            {/* 🔹 Overlay escuro para bloquear interação no fundo */}
            {isCartVisible && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-50"
                    onClick={() => setCartVisible(false)}
                ></div>
            )}
            <div className={`fixed top-0 right-0 z-50 px-5 py-3 w-[330px] h-full bg-white shadow-lg 
                transition-transform duration-300 ${isCartVisible ? "translate-x-0" : "translate-x-full"}`}>
                <p>Listar todas os items do pedido atual - OrderProduct</p>
                <ul>
                    {cart.orderProduct.map((item, index) => {
                        return <li className="flex items-center justify-between" key={index}>
                            <div className="">
                                <p>{item.product.name}</p>
                                <p className="font-bold">R${item.product.price}</p>
                                <div className="flex items-center gap-4">
                                    <Button className={quantity > 1 ? "bg-red-500" : ""} onClick={() => setQuantity()} variant="outline" size="icon">
                                        <ChevronLeft />
                                    </Button>
                                    <p className="w-[24px] text-center">{quantity}</p>
                                    <Button className={quantity >= 1 ? "bg-red-500" : ""} onClick={() => setQuantity()} variant="outline" size="icon">
                                        <ChevronRight />
                                    </Button>
                                </div>
                            </div>
                            <Button></Button>
                        </li>
                    })}
                </ul>
            </div>
            <div>
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
                            <Button className="rounded-full bg-red-500 w-[130px] font-semibold" onClick={() => handleConfirmOrder()}>Finalizar</Button>
                        </div>
                    </DialogContent>
                </Dialog>

                <Dialog open={isModalOpen.validation} onOpenChange={() => handleConfirmOrder()}>
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
                            <Link href={`/orders`}>
                                <Button variant="ghost" className="rounded-3xl w-[130px] text-red-500 font-semibold">Ver pedidos</Button>
                            </Link>
                            <Button variant="secondary" className="rounded-3xl w-[130px] font-semibold" onClick={() => handleConfirmOrder()}>Continuar</Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </div>

    )
}

export default Cart;

// Imagem do Produto
// Nome
// Preço
// Botão para quantidade
// Botão de excluir produto