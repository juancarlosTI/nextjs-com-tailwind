"use client"
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useCart } from "@/app/[slug]/contexts/cartContext";
import { RootState } from "@/app/orders/store/components/store";
import { resetOrder } from "@/app/orders/store/reducers/orderProducts-and-order";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";



const Cart = () => {
    const dispatch = useDispatch(); //agora você pode despachar ações
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

    const handleConfirmOrder = async () => {
        // Zerar redux-order
        if (isModalOpen.validation) {
            return setIsModalOpen({
                isOpen: false,
                validation: false
            })
        }

        const orderData = {
            ...cart, // Copia as informações do carrinho
            orderProducts: cart.orderProducts
        };

        // Salvar no db 
        const response = await fetch("/orders/api", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(orderData),
        });

        if (!response.ok) {
            console.error("Erro na resposta da API:", response.status, response.statusText);
            return;
        }
    
        const data = await response.json();
        console.log("Resposta da API:", response);

        if (data.success) {
            // Aqui você pode fazer um dispatch para limpar o carrinho
            dispatch(resetOrder());
            setIsModalOpen({ isOpen: false, validation: true });
        } else {
            console.error("Erro ao finalizar pedido");
        }
        // setIsModalOpen((prev) => ({
        //     isOpen: !prev.isOpen,
        //     validation: !prev.validation
        // }));
    }

    const handleQuantityProduct = (type: string) => {
        if (type === "minus" && quantity > 1) {
            setQuantity(prevState => prevState - 1)
        } else if (type === "plus") {
            setQuantity(prevState => prevState + 1)
        }
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
            <div className={`flex flex-col fixed top-0 right-0 z-50 px-5 py-3 w-[330px] h-full bg-white shadow-lg 
                transition-transform duration-300 ${isCartVisible ? "translate-x-0" : "translate-x-full"}`}>
                <div className="flex justify-between mb-3 mt-10">
                    <p><strong>Sacola</strong></p>
                    <div className="relative w-[25px] h-[25px] flex items-center justify-center">
                        <Image
                            onClick={() => setCartVisible(false)}
                            src="/X.png"
                            alt="Close"
                            width={20}
                            height={20}
                        />
                    </div>
                </div>
                <ul className="flex flex-col overflow-y-auto h-[60vh]">
                    {cart.orderProducts.map((item, index) => {
                        return <li className="flex items-center justify-between" key={index}>
                            <Image
                                src={item.product.imageUrl}
                                alt={item.product.name}
                                width={90}
                                height={90}
                            />
                            <div className="">
                                <p className="line-clamp-1 max-w-[140px] text-sm">{item.product.name}</p>
                                <p className="font-bold text-base">R${item.product.price}</p>
                                <div className="flex items-center gap-4">
                                    <Button className={`rounded-xl ${quantity > 1 ? "bg-red-500 text-white" : ""}`} onClick={() => handleQuantityProduct("minus")} variant="outline" size="icon">
                                        <ChevronLeft />
                                    </Button>
                                    <p className="w-[24px] text-center">{quantity}</p>
                                    <Button className={`rounded-xl ${quantity >= 1 ? "bg-red-500 text-white" : ""}`} onClick={() => handleQuantityProduct("plus")} variant="outline" size="icon">
                                        <ChevronRight />
                                    </Button>
                                </div>
                            </div>
                            <Button onClick={() => console.log("Excluir do orderProduct")} className="border px-2 bg-white" variant="secondary" size="sm">
                                <div className="flex items-center justify-center">
                                    <Image
                                        className="rounded-3xl"
                                        src="/Trash.png"
                                        alt="Trash"
                                        width={16}
                                        height={16} />
                                </div>

                            </Button>
                        </li>
                    })}
                </ul>
                <div className="flex flex-col mt-auto w-[307px] h-[130px] gap-2 border p-5 border rounded-3xl">
                    <div className="flex justify-between px-3">
                        <p>Subtotal</p>
                        <p>Preço</p>
                    </div>
                    <div className="flex justify-between px-3">
                        <p>Descontos</p>
                        <p>Preço</p>
                    </div>
                    <div>
                        <strong className="flex justify-between px-3">
                            <p>Total</p>
                            <p>Preço</p>
                        </strong>
                    </div>
                </div>
                <Button
                    variant="default"
                    className="mt-5 flex h-[40px] rounded-3xl"
                    onClick={() => handleModalOpen()}>
                    Terminar pedido
                </Button>
            </div>

            <div>
                {/* Modal */}
                <Dialog open={isModalOpen.isOpen} onOpenChange={() => handleModalOpen()}>
                    <DialogContent className="z-50 rounded-3xl p-6 w-[340px]">
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
                    <DialogContent className="z-50 rounded-3xl flex flex-col w-[340px] min-h-[280px]">
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
        </div >

    )
}

export default Cart;

// Imagem do Produto
// Nome
// Preço
// Botão para quantidade
// Botão de excluir produto