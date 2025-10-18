"use client";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

import { Star, X } from "lucide-react";
import { useLanguage } from "@/context/language-context";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { SheetDescription, SheetHeader, SheetTitle } from "./ui/sheet";


export default function ProductFilters({ filters, setFilters, filterOptions, categories, resetFilters }) {
  const { language } = useLanguage();

  const content = {
    bn: {
      filters: "ফিল্টার",
      category: "ক্যাটাগরি",
      all: "সকল",
      price: "মূল্য",
      brand: "ব্র্যান্ড",
      rating: "রেটিং",
      andUp: "এবং উপরে",
      clearAll: "সব মুছুন"
    },
    en: {
      filters: "Filters",
      category: "Category",
      all: "All",
      price: "Price",
      brand: "Brand",
      rating: "Rating",
      andUp: "& up",
      clearAll: "Clear All"
    }
  }
  
  const handleBrandChange = (brand) => {
    setFilters((prev) => ({
      ...prev,
      brands: prev.brands.includes(brand)
        ? prev.brands.filter((b) => b !== brand)
        : [...prev.brands, brand],
    }));
  };

  const handlePriceChange = (value) => {
    setFilters((prev) => ({ ...prev, price: value }));
  };

  const handleRatingChange = (value) => {
    setFilters((prev) => ({ ...prev, rating: Number(value) }));
  };
  
  const handleCategoryChange = (value) => {
    setFilters((prev) => ({ ...prev, category: value }));
  }

  return (
    <>
       <SheetHeader className="px-4 pt-4 pb-3 border-b flex-row items-center justify-between">
            <SheetTitle>{content[language].filters}</SheetTitle>
            <Button variant="ghost" size="sm" onClick={resetFilters} className="text-sm font-medium -mr-2">
                <X className="mr-1 h-4 w-4" />
                {content[language].clearAll}
            </Button>
        </SheetHeader>
        <ScrollArea className="flex-grow">
            <Accordion type="multiple" defaultValue={["category", "price", "brands", "rating"]} className="w-full">
            <AccordionItem value="category" className="border-b">
                <AccordionTrigger className="font-semibold px-4 py-3 text-base">{content[language].category}</AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                <RadioGroup value={filters.category} onValueChange={handleCategoryChange} className="space-y-2">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="all" id="cat-all-sheet" />
                        <Label htmlFor="cat-all-sheet" className="font-normal">{content[language].all}</Label>
                    </div>
                    {categories.map((cat) => (
                    <div key={cat.id} className="flex items-center space-x-2">
                        <RadioGroupItem value={cat.slug} id={`cat-sheet-${cat.id}`} />
                        <Label htmlFor={`cat-sheet-${cat.id}`} className="font-normal">{language === 'bn' ? cat.name_bn : cat.name}</Label>
                    </div>
                    ))}
                </RadioGroup>
                </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="price" className="border-b">
                <AccordionTrigger className="font-semibold px-4 py-3 text-base">{content[language].price}</AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                <div className="p-2">
                    <Slider
                    min={0}
                    max={filterOptions.maxPrice}
                    step={100}
                    value={filters.price}
                    onValueChange={handlePriceChange}
                    />
                    <div className="flex justify-between text-sm text-muted-foreground mt-2">
                    <span>৳{filters.price[0]}</span>
                    <span>৳{filters.price[1]}</span>
                    </div>
                </div>
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="brands" className="border-b">
                <AccordionTrigger className="font-semibold px-4 py-3 text-base">{content[language].brand}</AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                    <ScrollArea className="h-48">
                        <div className="space-y-2 pr-4">
                            {filterOptions.brands.map((brand) => (
                            <div key={brand} className="flex items-center space-x-2">
                                <Checkbox
                                id={`brand-sheet-${brand}`}
                                checked={filters.brands.includes(brand)}
                                onCheckedChange={() => handleBrandChange(brand)}
                                />
                                <Label htmlFor={`brand-sheet-${brand}`} className="font-normal">{brand}</Label>
                            </div>
                            ))}
                        </div>
                </ScrollArea>
                </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="rating" className="border-b-0">
                <AccordionTrigger className="font-semibold px-4 py-3 text-base">{content[language].rating}</AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                    <RadioGroup value={String(filters.rating)} onValueChange={handleRatingChange} className="space-y-2">
                        {[4, 3, 2, 1].map(r => (
                            <div key={r} className="flex items-center space-x-2">
                                <RadioGroupItem value={String(r)} id={`rating-sheet-${r}`} />
                                <Label htmlFor={`rating-sheet-${r}`} className="flex items-center font-normal">
                                    <span className="flex items-center mr-2">
                                        {[...Array(r)].map((_, i) => <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />)}
                                        {[...Array(5-r)].map((_, i) => <Star key={i+r} className="h-4 w-4 text-gray-300" />)}
                                    </span>
                                    <span>{r} {language === 'bn' ? 'এবং উপরে' : '& up'}</span>
                                </Label>
                            </div>
                        ))}
                         <div className="flex items-center space-x-2">
                            <RadioGroupItem value="0" id="rating-sheet-0" />
                            <Label htmlFor="rating-sheet-0" className="flex items-center font-normal">
                                Any Rating
                            </Label>
                        </div>
                    </RadioGroup>
                </AccordionContent>
            </AccordionItem>
            </Accordion>
        </ScrollArea>
    </>
  );
}
