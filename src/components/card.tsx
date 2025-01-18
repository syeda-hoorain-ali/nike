import { IProduct } from "@/types/data";
import Image from "next/image";
import Link from "next/link";

const Card = ({ id, name, image, price, colors, category, label }: IProduct) => {
  return (
    <div className="max-w-[20.7rem]">
      <Link href={`/product/${id}`}>
        <Image src={image} alt={name} height={330} width={330} />
      </Link>

      <div className="flex flex-col mt-4 text-md capitalize">
        <span className="text-[#9e3500] font-semibold">{label}</span>
        <Link href={`/product/${id}`} className="font-semibold hover:underline">{name}</Link>
        <span className="text-[#757575]">{category.name}</span>
        <span className="text-[#757575]">{colors.length} {colors.length === 1 ? ' Color' : ' Colors'}</span>
      </div>

      <span className="text-md font-semibold my-4 block">MRP : ₹ {price}.00</span>
    </div>
  )
}

export default Card
