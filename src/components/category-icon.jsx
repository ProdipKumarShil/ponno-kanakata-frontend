import { Smartphone, Shirt, Tv, UtensilsCrossed, LucideProps, Leaf, ShoppingBag, Footprints, Sprout } from 'lucide-react';

const iconMap = {
  electronics: Smartphone,
  fashion: Shirt,
  'home-appliances': Tv,
  groceries: UtensilsCrossed,
  organic: Leaf,
  clothing: ShoppingBag,
  shoes: Footprints,
  chuijhal: Leaf,
  'chuijhal-sapling': Sprout,
  't-shirts': Shirt,
  shirts: Shirt,
  sweatshirts: Shirt,
  hoodies: Shirt,
  'winter-jackets': Shirt,
  jackets: Shirt,
  coats: Shirt,
  sweaters: Shirt,
};



export default function CategoryIcon({ slug, ...props }) {
  const Icon = iconMap[slug];
  if (!Icon) return null;
  return <Icon {...props} />;
}
