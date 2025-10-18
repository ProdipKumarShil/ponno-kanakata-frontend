"use client";

import { useState, useMemo, useEffect, useCallback } from 'react';

import ProductFilters from './product-filters';
import ProductGrid from './product-grid';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { Filter } from 'lucide-react';
import { useLanguage } from '@/context/language-context';


export default function ProductListing({ products, filterOptions, categories, initialCategory, initialSearch }) {
  const getInitialFilters = useCallback(() => ({
    category: initialCategory,
    brands: [],
    price: [0, filterOptions.maxPrice],
    rating: 0,
    colors: [],
    sizes: [],
    search: initialSearch,
  }), [initialCategory, filterOptions.maxPrice, initialSearch]);

  const [filters, setFilters] = useState(getInitialFilters);
  const { language } = useLanguage();

  const content = {
    bn: {
      filters: "ফিল্টার",
    },
    en: {
      filters: "Filters",
    }
  };

  useEffect(() => {
    setFilters(f => ({ ...f, category: initialCategory, search: initialSearch }));
  }, [initialCategory, initialSearch]);


  const resetFilters = useCallback(() => {
    setFilters(getInitialFilters());
  }, [getInitialFilters]);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      if (filters.category !== 'all' && product.category.slug !== filters.category) return false;
      if (filters.brands.length > 0 && !filters.brands.includes(product.brand)) return false;
      if (product.price < filters.price[0] || product.price > filters.price[1]) return false;
      if (product.rating < filters.rating) return false;
      if (filters.colors.length > 0 && !product.colors?.some(c => filters.colors.includes(c))) return false;
      if (filters.sizes.length > 0 && !product.sizes?.some(s => filters.sizes.includes(s))) return false;
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        const nameEn = product.name.toLowerCase();
        const nameBn = product.name_bn.toLowerCase();
        const descriptionEn = product.description.toLowerCase();
        const descriptionBn = product.description_bn.toLowerCase();
        if (!nameEn.includes(searchTerm) && !nameBn.includes(searchTerm) && !descriptionEn.includes(searchTerm) && !descriptionBn.includes(searchTerm)) {
            return false;
        }
      }
      
      return true;
    });
  }, [products, filters]);

  return (
    <div>
       <div className="flex justify-end mb-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                {content[language].filters}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[320px] sm:w-[400px] p-0 flex flex-col">
                 <ProductFilters
                    filters={filters}
                    setFilters={setFilters}
                    filterOptions={filterOptions}
                    categories={categories}
                    resetFilters={resetFilters}
                />
            </SheetContent>
          </Sheet>
        </div>
      <ProductGrid products={filteredProducts} />
    </div>
  );
}
