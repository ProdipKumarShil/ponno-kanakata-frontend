import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getProducts, getCategories, getFeaturedProducts, getTopRankedProducts, getNewestProducts, getTopDealsProducts } from '@/lib/data.js';
import Header from '@/components/header';
import Footer from '@/components/footer';
import ProductCard from '@/components/product-card';
import { ArrowRight, Award, Sparkles, Star, Tag } from 'lucide-react';
import CategoryIcon from '@/components/category-icon';
import PromoCarousel from '@/components/promo-carousel';

export default async function Home() {
  const products = await getProducts();
  const categories = await getCategories();

  const featuredProducts = getFeaturedProducts(products);
  const topRankedProducts = getTopRankedProducts(products);
  const newArrivals = getNewestProducts(products);
  const topDeals = getTopDealsProducts(products);
  
  // Using a sample language for server component, context will override on client
  const language = 'en';

  const content = {
    bn: {
      popularCategories: "জনপ্রিয় ক্যাটাগরি",
      featuredProducts: "বিশেষ পণ্য",
      viewAll: "সকল পণ্য দেখুন",
      topRanking: "টপ রেংকিং",
      newArrivals: "নতুন কালেকশন",
      topDeals: "সেরা ডিল",
      mostPopular: "সবচেয়ে জনপ্রিয়",
    },
    en: {
      popularCategories: "Popular Categories",
      featuredProducts: "Featured Products",
      viewAll: "View All Products",
      topRanking: "Top Ranking",
      newArrivals: "New Arrivals",
      topDeals: "Top Deals",
      mostPopular: "Most Popular",
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <section
          className="bg-primary/5"
        >
          <div className="container mx-auto px-4 py-12 md:py-16">
            <PromoCarousel />
          </div>
        </section>

        <section id="categories" className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 font-headline text-foreground">
              {content[language].popularCategories}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-4xl mx-auto justify-center">
              {categories.slice(0, 4).map((category) => (
                <Link
                  href={`/products?category=${category.slug}`}
                  key={category.id}
                  className="group"
                >
                  <div className="text-center p-4 rounded-lg transition-all duration-300 hover:bg-accent/10 hover:shadow-lg hover:-translate-y-1">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-primary/10 group-hover:bg-accent/20 transition-colors flex items-center justify-center">
                      <CategoryIcon slug={category.slug} className="w-12 h-12 text-primary group-hover:text-accent-foreground" />
                    </div>
                    <h3 className="font-semibold text-lg text-foreground font-headline">
                      {language === 'bn' ? category.name_bn : category.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{language === 'en' ? category.name_bn : category.name}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section
          id="featured-products"
          className="py-16 lg:py-24 bg-primary/5"
        >
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 font-headline text-foreground">
             {content[language].featuredProducts}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="text-center mt-12">
              <Link href="/products">
                <Button variant="outline" className="font-headline group">
                  {content[language].viewAll}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section
          id="most-popular"
          className="py-16 lg:py-24 bg-background"
        >
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 font-headline text-foreground flex items-center justify-center gap-3">
              <Star className="w-8 h-8 text-primary" />
              {content[language].mostPopular}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
              {topRankedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
        
        <section
          id="top-ranking"
          className="py-16 lg:py-24 bg-primary/5"
        >
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 font-headline text-foreground flex items-center justify-center gap-3">
              <Award className="w-8 h-8 text-primary" />
             {content[language].topRanking}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
              {topRankedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        <section
          id="new-arrivals"
          className="py-16 lg:py-24 bg-background"
        >
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 font-headline text-foreground flex items-center justify-center gap-3">
              <Sparkles className="w-8 h-8 text-primary" />
             {content[language].newArrivals}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
              {newArrivals.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
        
        <section
          id="top-deals"
          className="py-16 lg:py-24 bg-primary/5"
        >
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 font-headline text-foreground flex items-center justify-center gap-3">
              <Tag className="w-8 h-8 text-primary" />
              {content[language].topDeals}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
              {topDeals.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
