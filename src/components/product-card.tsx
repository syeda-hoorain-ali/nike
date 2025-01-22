import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  id: string;
  image: string;
  name: string;
  price: number;
  category: string;
  size: 'sm' | 'lg';
}

const ProductCard = ({ id, image, name, price, category, size }: ProductCardProps) => {

  const px = size === 'sm' ? 300 : 441;

  return (
    <div style={{ width: px }} className="max-w-full px-4">
      <Link href={`/product/${id}`} className="relative block w-full aspect-square">
        <Image className="rounded" src={image} alt={name} fill />
      </Link>

      <div className={cn("flex justify-between mt-5", size === 'sm' ? 'pr-2' : 'pr-4')}>
        <div className="flex flex-col">
          <Link href={`/product/${id}`} className="hover:underline">
            <h4 className="font-semibold text-md capitalize">{name}</h4>
          </Link>
          <span className="text-[#757575] capitalize">{category}</span>
        </div>

        <span className="font-semibold text-md min-w-16">₹ {price}</span>
      </div>
    </div>
  )
}

export default ProductCard
