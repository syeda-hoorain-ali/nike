import { cn } from "@/lib/utils";
import Image from "next/image";

interface ProductCardProps {
  image: string;
  name: string;
  price: number;
  category: string;
  size: 'sm' | 'lg';
}

const ProductCard = ({ image, name, price, category, size }: ProductCardProps) => {

  const px = size === 'sm' ? 300 : 441;

  return (
    <div style={{ width: px }} className="max-w-full px-4">
      <div className="relative w-full aspect-square">
        <Image className="rounded" src={image} alt={name} fill />
      </div>

      <div className={cn("flex justify-between mt-5", size === 'sm' ? 'pr-2' : 'pr-4')}>
        <div className="flex flex-col">
          <h4 className="font-semibold text-md capitalize">{name}</h4>
          <span className="text-[#757575] capitalize">{category}</span>
        </div>

        <span className="font-semibold text-md min-w-16">₹ {price}</span>
      </div>
    </div>
  )
}

export default ProductCard
