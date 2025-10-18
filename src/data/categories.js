
export const categories = [
  { 
    id: "fashion", 
    name: 'Fashion', 
    name_bn: 'ফ্যাশন', 
    slug: 'fashion',
    icon: 'Shirt',
    subcategories: [
        {
            id: "clothing",
            name: 'Clothing',
            name_bn: 'জামা কাপড়',
            slug: 'clothing',
            icon: 'ShoppingBag',
            subcategories: [
                { id: "t-shirts", name: 'T-Shirts', name_bn: 'টি-শার্ট', slug: 't-shirts', icon: 'Shirt' },
                { id: "shirts", name: 'Shirts', name_bn: 'শার্ট', slug: 'shirts', icon: 'Shirt' },
                { id: "sweatshirts", name: 'Sweatshirts', name_bn: 'সোয়েটশার্ট', slug: 'sweatshirts', icon: 'Shirt' },
                { id: "hoodies", name: 'Hoodies', name_bn: 'হুডি', slug: 'hoodies', icon: 'Shirt' },
                { id: "winter-jackets", name: 'Winter Jackets', name_bn: 'উইন্টার জ্যাকেট', slug: 'winter-jackets', icon: 'Shirt' },
                { id: "jackets", name: 'Jackets', name_bn: 'জ্যাকেট', slug: 'jackets', icon: 'Shirt' },
                { id: "coats", name: 'Coats', name_bn: 'কোট', slug: 'coats', icon: 'Shirt' },
                { id: "sweaters", name: 'Sweaters', name_bn: 'সোয়েটার', slug: 'sweaters', icon: 'Shirt' },
            ]
        },
        {
            id: "shoes",
            name: 'Shoes',
            name_bn: 'জুতা',
            slug: 'shoes',
            icon: 'Footprints'
        }
    ]
  },
  { 
    id: "organic", 
    name: 'Organic', 
    name_bn: 'অরগানিক', 
    slug: 'organic',
    icon: 'Leaf',
    subcategories: [
        { id: "chuijhal-spice", name: 'Chuijhal', name_bn: 'চুইঝাল', slug: 'chuijhal', icon: 'Leaf' },
        { id: "chuijhal-plant", name: 'Chuijhal Sapling', name_bn: 'চুইঝাল চারা', slug: 'chuijhal-sapling', icon: 'Sprout' }
    ]
  },
];
