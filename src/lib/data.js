import { products as staticProducts } from '@/data/products';
import { categories as staticCategories } from '@/data/categories';

// This data fetching now relies on local files to avoid Firestore connection issues.

export async function getProducts() {
    return staticProducts;
}

export async function getCategories() {
    return staticCategories;
}

export function getFeaturedProducts(productList) {
  return productList.slice(0, 4);
}

export function getTopRankedProducts(productList) {
  return [...productList].sort((a, b) => b.rating - a.rating).slice(0, 4);
}

export function getNewestProducts(productList) {
    return [...productList].sort((a, b) => {
        // Fallback sorting if createdAt is not available
        const dateA = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
        const dateB = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
        return dateB - dateA;
    }).slice(0, 4);
}

export function getTopDealsProducts(productList) {
    return productList.filter(p => p.originalPrice && p.originalPrice > p.price).slice(0, 4);
}

export function getProductBySlug(slug, productList) {
  return productList.find(p => p.slug === slug);
}

export function getFilterOptions(productList) {
  const brands = [...new Set(productList.map(p => p.brand))].sort();
  const colors = [...new Set(productList.flatMap(p => p.colors || []))].sort();
  const sizes = [...new Set(productList.flatMap(p => p.sizes || []))].sort();
  const maxPrice = Math.max(...productList.map(p => p.price || 0), 0);
  return { brands, colors, sizes, maxPrice };
}

export async function getAllCategories() {
    // This function can be simplified if nesting is not required in the filter component.
    // For now, let's flatten the static categories.
    const all = [];
    const flatten = (cats) => {
        cats.forEach(c => {
            const { subcategories, ...rest } = c;
            all.push(rest);
            if (subcategories) {
                flatten(subcategories);
            }
        });
    };
    flatten(staticCategories);
    return all;
}
