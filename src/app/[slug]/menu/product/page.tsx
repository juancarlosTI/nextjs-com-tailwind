import { Product, Restaurant } from "@prisma/client";
import { notFound } from "next/navigation";

import { getProductById } from "@/data/get-product-by-id";
import { getRestaurantBySlug } from "@/data/get-restaurant-by-slug";

import ProductDetails from "../../components/product";
import ProductHeader from "./components/header";


interface ProductPageProps {
    productItem: {item: string;};
    params: { slug: string }
}


const ProductPage  = async ({ productItem, params }: ProductPageProps) => {
    const {item} = await productItem;
    const {slug} = await params;

    console.log("Slug,", slug)

    if (!item || !slug){
        return notFound();
    }

    const productSelected : Product = await getProductById(item);

    // Carregar a imagem do restaurante na pagina de produto    
    const restaurantId : Restaurant | null = await getRestaurantBySlug(slug);


    return (
        <div>
            <ProductHeader product={productSelected}/>
            <ProductDetails product={productSelected} restaurant={restaurantId} params={{slug}}/>
        </div>
    );
}

export default ProductPage;