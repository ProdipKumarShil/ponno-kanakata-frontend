import { products } from '@/data/products';


/**
 * In the future, this function would fetch products from a database
 * like Firebase Firestore. For now, it returns dummy data from a local file.
 */
export function getAllProducts() {
  // Simulate an API call
  return products;
}

/**
 * In the future, this would fetch a single product from the database.
 */
export function getProductBySlug(slug) {
  return products.find(p => p.slug === slug);
}
