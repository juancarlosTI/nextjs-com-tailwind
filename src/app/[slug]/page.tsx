import Image from "next/image";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getRestaurantBySlug } from "@/data/get-restaurant-by-slug";
import { db } from "@/lib/prisma";

import { ConsumptionMethodOption } from "./components/consumption-method-option";

interface RestaurantPageProps {
    params: Promise<{ slug: string }>;
}

const RestaurantPage = async ({ params }: RestaurantPageProps) => {
    const { slug } = await params;
    const restaurant = await getRestaurantBySlug(slug);
    if (!restaurant) {
        return notFound();
    }
    return <div className="flex h-screen flex-col items-center justify-center px-6 pt-24">
        <div className="flex flex-col items-center gap-2">
            <Image src={restaurant.avatarImageUrl} alt={restaurant.name} width={82} height={82} />
            <h2 className="font-semibold">
                {restaurant.name}
            </h2>
        </div>
        <div className="pt-24 text-center spacy-y-2">
            <h3 className="text-2xl font-semibold">
                Seja bem vindo!
            </h3>
            <p className="opacity-55">
                Escolha como prefere aproveitar a refeição. Estamos a oferecer praticidade e sabor em cada detalhe!
            </p>
        </div>
        <div className="pt-14 grid grid-cols-2 gap-4">
            <ConsumptionMethodOption
                buttonText="Para comer aqui"
                imageAlt="Comer aqui"
                imageUrl="/dine-in.png"
                option="DINE_IN"
                slug={slug}
            />
            <ConsumptionMethodOption
                buttonText="Para levar"
                imageAlt="Para levar"
                imageUrl="/take-away.png"
                option="TAKEAWAY"
                slug={slug}
            />
        </div>
    </div>;
}

// Server component - renderizados no servidor
// Podem ser async
// Podem chamar recursos do back-end (banco de dados)
// Não pode usar hook's
// Não pode ter interatividade

export default RestaurantPage;