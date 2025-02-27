import { Product } from "@prisma/client";
import { notFound } from "next/navigation";

import { getProductById } from "@/data/get-product-by-id";

import ProductDetails from "../../components/product";
import ProductHeader from "./components/header";

interface ProductPageProps {
    searchParams: {item: string};
}


const ProductPage  = async ({ searchParams }: ProductPageProps) => {
    const {item} = searchParams;

    if (!item){
        return notFound();
    }

    const productSelected : Product = await getProductById(item);



    return (
        <div>
            <ProductHeader product={productSelected}/>
            <ProductDetails product={productSelected}/>
        </div>
    );
}

export default ProductPage;