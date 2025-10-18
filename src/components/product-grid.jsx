"use client";


import ProductCard from "./product-card";
import { useLanguage } from "@/context/language-context";


export default function ProductGrid({ products }) {
  const { language } = useLanguage();

  const content = {
    bn: {
      noProducts: "কোনো পণ্য পাওয়া যায়নি",
      noProductsSub: "আপনার ফিল্টার মানদণ্ডের সাথে মিলে এমন কোনো পণ্য নেই।",
    },
    en: {
      noProducts: "No products found",
      noProductsSub: "There are no products that match your filter criteria.",
    }
  }

  return (
    <div>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold mb-2">{content[language].noProducts}</h2>
          <p className="text-muted-foreground">{content[language].noProductsSub}</p>
        </div>
      )}
    </div>
  );
}
