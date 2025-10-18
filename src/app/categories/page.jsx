import { getCategories } from '@/lib/data.js';
import CategoriesClientPage from './client-page';

export default async function CategoriesPage() {
  const categories = await getCategories();
  
  return <CategoriesClientPage categories={categories} />;
}
