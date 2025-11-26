import type { ApiPageLink } from "./api";
import type { ApiMeta } from "./api";

export interface Product {
    id: number;
    name: string;
    slug: string;
    description: string;
    price: string;
    stock: number;
    sku: string;
    image: string;
    image_url: string;
    category_id: number;
    category: {
        id: number;
        name: string;
        slug: string;
        description: string;
    };
    created_at: string;
    updated_at: string;
}


export type ProductsResponse = {
    status: number
    status_code: string
    message: string
    data: { data: Product[]; links: ApiPageLink; meta: ApiMeta }
}
