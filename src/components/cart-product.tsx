import React from 'react'
import { Button } from './ui/button'
import { HeartIcon, TrashIcon } from './icons'
import Image from 'next/image'

interface CartProductProps {
  image: string;
  name: string;
  category: string;
  colors: string
  price: number;
  size: string;
  quantity: number;
}

const CartProduct = ({ image, name, category, colors, price, size, quantity }: CartProductProps) => {
  return (
    <div className="flex justify-between pt-4 pb-8 border-b border-[#e5e5e5]">
      <div className="flex gap-8">
        <Image src={image} alt={name} height={150} width={150} />

        <div className="flex flex-col gap-1">
          <h5 className="font-semibold">{name}</h5>
          <p className="text-[#757575]">{category}</p>
          <p className="text-[#757575]">{colors}</p>

          <div className="flex gap-6">
            <span className="text-[#757575]">Size {size}</span>
            <span className="text-[#757575]">Quantity {quantity}</span>
          </div>

          <div className="mt-4 flex h-5">
            <Button variant="ghost" size="icon"><HeartIcon /></Button>
            <Button variant="ghost" size="icon"><TrashIcon /></Button>
          </div>

        </div>
      </div>

      <span>MRP: ₹ {price}.00</span>
    </div>
  )
}

export default CartProduct
