"use client";

import { useShoppingCart } from "use-shopping-cart";
import { CartIcon } from "./icons"
import { Button } from "./ui/button"
import { IProduct } from "@/types/data";
import { Product } from "use-shopping-cart/core";

interface AddToCartButtonProps {
  product: IProduct;
}

export const AddToCartButton = ({ product }: AddToCartButtonProps) => {

  const { addItem } = useShoppingCart();

  const cartProduct: Product = {
    id: product.id.toString(),
    name: product.name,
    description: product.category,
    image: product.image,
    price: product.price,
    currency: 'INR',
    sku: product.id.toString(),
    product_data: {
      colors: product.colors,
      size: product.size,
    },
  }

  return (
    <Button
      size="lg"
      onClick={() => addItem(cartProduct)}>
      <CartIcon /> Add To Cart
    </Button>
  )
}
