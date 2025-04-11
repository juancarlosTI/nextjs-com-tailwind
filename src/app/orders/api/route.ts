import { NextRequest, NextResponse } from "next/server";

import { addOrderProductToDb, addOrderToDb } from "@/data/add-order-to-db";

export async function POST(req: NextRequest) {
   
    const order = await req.json();
    console.log("Order:", order);
    //console.log("Order Product: ", orderProducts);

    // console.log("Dentro do route: ", cart);

    if (!order) {
        console.error("Corpo da requisição inválido, faltando 'order'");
        return NextResponse.json({ success: false, message: "Dados do pedido inválidos" }, { status: 400 });
    }

    const savedOrder = await addOrderToDb(order);


    if (!savedOrder){
        throw new Error("Falha ao salvar pedido")
    }
    return NextResponse.json({ success: true, order: savedOrder });
}
