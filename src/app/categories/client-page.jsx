"use client";

import Link from 'next/link';
import Header from '@/components/header';
import Footer from '@/components/footer';
import CategoryIcon from '@/components/category-icon';
import { useLanguage } from '@/context/language-context';
import { Card } from '@/components/ui/card';
import { ArrowRight, ChevronDown, ShoppingBag, Footprints, Leaf, Sprout, Shirt } from 'lucide-react';
import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Image from 'next/image';

const iconMap = {
    'clothing': ShoppingBag,
    'shoes': Footprints,
    'chuijhal': Leaf,
    'chuijhal-sapling': Sprout,
    't-shirts': Shirt,
    'shirts': Shirt,
    'sweatshirts': Shirt,
    'hoodies': Shirt,
    'winter-jackets': Shirt,
    'jackets': Shirt,
    'coats': Shirt,
    'sweaters': Shirt,
};

export default function CategoriesClientPage({ categories }) {
  const { language } = useLanguage();

  const content = {
    bn: {
      title: "সকল ক্যাটাগরি",
      subtitle: "আপনার পছন্দের ক্যাটাগরি থেকে কেনাকাটা করুন।",
      explore: "আরও দেখুন"
    },
    en: {
      title: "All Categories",
      subtitle: "Shop from your favorite categories.",
      explore: "Explore"
    }
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const subContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const subItemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
    }
  };


  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <section className="py-12 lg:py-16 bg-primary/5">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold font-headline text-foreground">{content[language].title}</h1>
            <p className="mt-2 text-lg text-muted-foreground">{content[language].subtitle}</p>
          </div>
        </section>

        <motion.section 
            id="categories" 
            className="py-16 lg:py-24 bg-background"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
          <div className="container mx-auto px-4 max-w-5xl">
            <Accordion type="multiple" className="w-full space-y-4">
              {categories.map((category) => (
                <motion.div key={category.id} variants={itemVariants}>
                    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <AccordionItem value={category.slug} className="border-none">
                        <AccordionTrigger className="p-6 hover:no-underline hover:bg-secondary/50 text-left">
                           <div className="flex items-center gap-4">
                               <div className="w-16 h-16 flex-shrink-0 flex items-center justify-center rounded-lg bg-primary/10">
                                   <CategoryIcon slug={category.slug} className="w-8 h-8 text-primary" />
                               </div>
                               <div>
                                   <h3 className="text-2xl font-headline text-foreground">
                                       {language === 'bn' ? category.name_bn : category.name}
                                   </h3>
                                   <p className="text-muted-foreground">{language === 'en' ? category.name_bn : category.name}</p>
                               </div>
                           </div>
                        </AccordionTrigger>
                        <AccordionContent className="p-6 pt-0">
                           <div className="pl-20">
                             <Accordion type="multiple" className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                {category.subcategories?.map(sub => {
                                    const IconComponent = iconMap[sub.slug];
                                    return (
                                        <div key={sub.id}>
                                            {sub.subcategories && sub.subcategories.length > 0 ? (
                                                <AccordionItem value={sub.slug} className="border-none">
                                                    <AccordionTrigger className="font-semibold text-lg hover:text-primary transition-colors flex items-center gap-2 group p-0 hover:no-underline">
                                                         {IconComponent && <IconComponent className="h-5 w-5 text-primary/80" />}
                                                         <span>{language === 'bn' ? sub.name_bn : sub.name}</span>
                                                    </AccordionTrigger>
                                                    <AccordionContent className="pt-2">
                                                        <motion.div 
                                                            className="pl-4 mt-2 grid grid-cols-1 gap-x-4 gap-y-2 border-l border-border"
                                                            variants={subContainerVariants}
                                                            initial="hidden"
                                                            animate="visible"
                                                        >
                                                            {sub.subcategories.map((subsub, index) => (
                                                                <motion.div key={subsub.id} variants={subItemVariants}>
                                                                    <Link href={`/products?category=${subsub.slug}`} className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors py-0.5">
                                                                        <Image 
                                                                            src={`https://picsum.photos/seed/${100 + index}/48/48`}
                                                                            alt={subsub.name}
                                                                            width={24}
                                                                            height={24}
                                                                            className="rounded-full object-cover"
                                                                            data-ai-hint={`${subsub.slug.replace('-', ' ')}`}
                                                                        />
                                                                        <span>{language === 'bn' ? subsub.name_bn : subsub.name}</span>
                                                                    </Link>
                                                                </motion.div>
                                                            ))}
                                                        </motion.div>
                                                    </AccordionContent>
                                                </AccordionItem>
                                            ) : (
                                                <Link href={`/products?category=${sub.slug}`} className="font-semibold text-lg hover:text-primary transition-colors flex items-center gap-2 group">
                                                    {IconComponent && <IconComponent className="h-5 w-5 text-primary/80" />}
                                                    <span>{language === 'bn' ? sub.name_bn : sub.name}</span>
                                                    <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity group-hover:translate-x-1"/>
                                                </Link>
                                            )}
                                        </div>
                                    )
                                })}
                            </Accordion>
                           </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Card>
                </motion.div>
              ))}
            </Accordion>
          </div>
        </motion.section>
      </main>
      <Footer />
    </div>
  );
}
