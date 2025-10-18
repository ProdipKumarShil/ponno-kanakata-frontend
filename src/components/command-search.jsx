"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import {
  LayoutGrid,
  Search,
  ShoppingBag,
} from "lucide-react"

import { useProduct } from "@/context/product-context"
import { useCategory } from "@/context/category-context"
import { useLanguage } from "@/context/language-context"
import { Button } from "@/components/ui/button"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  Command,
} from "@/components/ui/command"
import CategoryIcon from "./category-icon"
import { toBengaliNumber } from "@/lib/utils"

export function CommandSearch() {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const { language } = useLanguage()
  const { products, loading: productsLoading } = useProduct()
  const { flatCategories, loading: categoriesLoading } = useCategory()


  React.useEffect(() => {
    const down = (e) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return
        }

        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const runCommand = React.useCallback((command) => {
    setOpen(false)
    command()
  }, [])

  const content = {
    bn: {
      searchPlaceholder: "এখানে আপনার পণ্য খুঁজুন...",
      noResults: "কোনো ফলাফল পাওয়া যায়নি",
      suggestions: "সাজেশন",
      categories: "ক্যাটাগরি",
      products: "পণ্য",
      loading: "লোড হচ্ছে...",
    },
    en: {
      searchPlaceholder: "Search for products...",
      noResults: "No results found.",
      suggestions: "Suggestions",
      categories: "Categories",
      products: "Products",
      loading: "Loading...",
    },
  }
  
  const customFilter = (value, search) => {
    const searchTerms = search.toLowerCase().split(' ').filter(Boolean);
    const valueText = value.toLowerCase();
    return searchTerms.every(term => valueText.includes(term)) ? 1 : 0;
  }

  return (
    <>
      <Button
        variant="ghost"
        className="h-10 w-10 p-0"
        onClick={() => setOpen(true)}
        aria-label="Search"
      >
        <Search className="h-5 w-5" />
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command filter={customFilter} className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
            <CommandInput placeholder={content[language].searchPlaceholder} />
            <CommandList>
            <CommandEmpty>{productsLoading || categoriesLoading ? content[language].loading : content[language].noResults}</CommandEmpty>
            {!categoriesLoading && (
                <CommandGroup heading={content[language].categories}>
                {flatCategories.map((category) => (
                    <CommandItem
                    key={category.slug}
                    value={`${category.name} ${category.name_bn}`}
                    onSelect={() => {
                        runCommand(() => router.push(`/products?category=${category.slug}`))
                    }}
                    >
                    <CategoryIcon slug={category.slug} className="mr-2 h-4 w-4" />
                    <span>{language === "bn" ? category.name_bn : category.name}</span>
                    </CommandItem>
                ))}
                </CommandGroup>
            )}
            <CommandSeparator />
            {!productsLoading && (
                <CommandGroup heading={content[language].products}>
                {products.map((product) => (
                    <CommandItem
                    key={product.id}
                    value={`${product.name} ${product.name_bn} ${product.category?.name} ${product.category?.name_bn} ${product.brand} ${product.slug} ${product.description} ${product.description_bn}`}
                    onSelect={() => {
                        runCommand(() => router.push(`/products/${product.slug}`))
                    }}
                    >
                    <div className="mr-2 h-6 w-6 rounded-full overflow-hidden flex-shrink-0">
                        <Image 
                            src={product.images[0]} 
                            alt={product.name}
                            width={24}
                            height={24}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <span>{language === "bn" ? product.name_bn : product.name}</span>
                    <span className="ml-auto text-xs text-muted-foreground">
                        ৳{language === 'bn' ? toBengaliNumber(product.price) : product.price}
                    </span>
                    </CommandItem>
                ))}
                </CommandGroup>
            )}
            </CommandList>
        </Command>
      </CommandDialog>
    </>
  )
}
