import CartPage from "@/components/cart-page";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Cart",
    description: "Review the items in your shopping cart.",
}

export default function Page() {
    return <CartPage />;
}
