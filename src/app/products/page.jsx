import { getProducts, getFilterOptions, getAllCategories } from '@/lib/data.js';
import ProductListing from '@/components/product-listing';
import Header from '@/components/header';
import Footer from '@/components/footer';

export default async function ProductsPage({ searchParams }) {
  const allProducts = await getProducts();
  
  const category = typeof searchParams.category === 'string' ? searchParams.category : 'all';
  const search = typeof searchParams.search === 'string' ? searchParams.search : '';
  const filterOptions = getFilterOptions(allProducts);
  const categories = await getAllCategories();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
            <ProductListing
                products={allProducts}
                filterOptions={filterOptions}
                categories={categories}
                initialCategory={category}
                initialSearch={search}
            />
        </div>
      </main>
      <Footer />
    </div>
  );
}
