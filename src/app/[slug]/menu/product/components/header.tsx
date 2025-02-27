"use client"
import { Product } from "@prisma/client";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

interface ProductProps {
    product: Pick<Product, 'name' | 'imageUrl'>
}

const ProductHeader = ({ product }: ProductProps) => {
    const router = useRouter();
    const handleBackClick = () => router.back();
    return (
        <div className="relative h-[320px] w-full">
            <Button
                variant="secondary"
                size="icon"
                className="absolute top-4 left-4 rounded-full z-50"
                onClick={handleBackClick}>
                <ChevronLeftIcon />
            </Button>
            <Image
                src={product.imageUrl}
                alt="Imagem"
                fill
                className="object-cover"
            />
            <Button
                variant="secondary"
                size="icon"
                className="absolute top-4 right-4 rounded-full z-50">
                <ScrollTextIcon />
            </Button>
        </div>
    );
}

export default ProductHeader;