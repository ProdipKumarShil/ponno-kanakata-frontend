import { getProductBySlug, getProducts } from '@/lib/data.js';
import { notFound } from 'next/navigation';
import ProductDetailClientPage from './client-page';



export default async function ProductDetailPage({ params }) {
    const products = await getProducts();
    const product = getProductBySlug(params.slug, products);

    if (!product) {
        notFound();
    }
    
    return <ProductDetailClientPage product={product} />;
}
