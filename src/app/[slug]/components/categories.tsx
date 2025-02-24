"use client";

import { MenuCategory, Prisma } from "@prisma/client";
import { ClockIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface RestaurantCategoriesProps {
    restaurant: Prisma.RestaurantGetPayload<{
        include: {
            menuCategories: {
                include: {
                    products: true
                }
            }
        }
    }>;
}

type MenuCategoriesWithProducts = Prisma.MenuCategoryGetPayload<{
    include: {
        products: true
    };
}>

const RestaurantCategories = ({ restaurant }: RestaurantCategoriesProps) => {
    const [selectedCategory, setSelectedCategory] = useState<MenuCategoriesWithProducts>(restaurant.menuCategories[0])
    const handleCategoryClick = (category:MenuCategoriesWithProducts) => {
        setSelectedCategory(category)
    }
    const getCategoryButtonVariant = (category:MenuCategoriesWithProducts) => {
        return (selectedCategory.id === category.id ? "default":"secondary");
    }

    return (
        <div className="relative z-50 nt-[-1.5rem] rounded-t-3xl border bg-white p-5">
            <div className="p-5">
                <div className="flex items-center gap-3">
                    <Image src={restaurant.avatarImageUrl} alt={restaurant.name} height={45} width={45} />
                    <div className="font-semibold text-lg">
                        <h2>{restaurant.name}</h2>
                        <p className="text-xs opacity-55">{restaurant.description}</p>
                    </div>
                </div>
                <div className="flex items-center gap-1 text-xs text-green-500 nt-3">
                    <ClockIcon size={12} />
                    <p>Aberto</p>
                </div>
            </div>
            <ScrollArea className="w-full">
                <div className="flex w-max space-x-4 p-4 pt-0">
                    {restaurant.menuCategories.map(category => (
                        <Button
                            onClick={() => handleCategoryClick(category)}
                            key={category.id}
                            variant={getCategoryButtonVariant(category)}
                            size="sm"
                            className="rounded-full">
                            {category.name}
                        </Button>
                    ))}
                </div>
                <ScrollBar orientation="horizontal"/>
            </ScrollArea>
        </div>
    );
}

export default RestaurantCategories;