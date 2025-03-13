"use client"
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

const OrdersHeader = () => {
    const router = useRouter();
    const handleBackClick = () => router.back();
    return (
        <div className="relative w-full">
            <Button
                variant="secondary"
                size="icon"
                className="absolute top-4 left-4 rounded-full z-50"
                onClick={handleBackClick}>
                <ChevronLeftIcon />
            </Button>
            <Button
                variant="secondary"
                size="icon"
                className="absolute top-4 right-4 rounded-full z-50">
                <ScrollTextIcon />
            </Button>
        </div>
    );
}

export default OrdersHeader;