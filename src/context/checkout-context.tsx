"use client";

import { exchangeRate } from "@/lib/data";
import { addressSchema } from "@/schema/addressSchema";
import { CheckoutApiResponse } from "@/types/apiResponse";
import { ICartProduct } from "@/types/data";
import { Rates } from "@/types/shipengine";
import axios from "axios";
import {
  createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useEffect, useState
} from "react";
import { useShoppingCart } from "use-shopping-cart";
import { z } from "zod";

type FormStates = 'address' | 'rates' | 'payment'
type Address = z.infer<typeof addressSchema>

interface Rate {
  rateId: string;
  carrierId: string;
  shippingAmount: {
    currency: "usd" | "cad" | "aud" | "gbp" | "eur" | "nzd";
    amount: number;
  };
  deliveryDays: number | null;
  estimatedDeliveryDate: string | null;
  carrierDeliveryDays: string | null;
  carrierCode: string;
}

interface ICheckoutContext {
  rates: Rates;
  setRates: Dispatch<SetStateAction<Rates>>;

  address: Address | null
  setAddress: Dispatch<SetStateAction<Address | null>>;

  selectedRate: Rate | null
  setSelectedRate: Dispatch<SetStateAction<Rate | null>>;

  accordionValue: FormStates
  setAccordionValue: Dispatch<SetStateAction<FormStates>>;

  shippingAmount: number;
  totalAmount: number;
  checkout: () => Promise<string | undefined>
}

export const CheckoutContext = createContext<ICheckoutContext | null>(null);
export const useCheckout = () => useContext(CheckoutContext)!

export const CheckoutProvider = ({ children }: PropsWithChildren) => {

  const [rates, setRates] = useState<Rates>(null)
  const [address, setAddress] = useState<Address | null>(null)
  const [selectedRate, setSelectedRate] = useState<Rate | null>(null)
  const [accordionValue, setAccordionValue] = useState<FormStates>('address')
  const [shippingAmount, setShippingAmount] = useState<number>(0)
  const [totalAmount, setTotalAmount] = useState<number>(0)

  const { currency, cartDetails, totalPrice } = useShoppingCart()
  const cartProducts = Object.values(cartDetails ?? {}) as ICartProduct[]


  useEffect(() => {
    const fetch = async () => {
      const shippingAmount = selectedRate?.shippingAmount.amount || 0;
      const shippingCurrency = selectedRate?.shippingAmount.currency || currency!;

      const convertedShippingAmount = await exchangeRate(shippingCurrency, currency!, shippingAmount);
      setShippingAmount(convertedShippingAmount || 0)
      setTotalAmount(shippingAmount + (totalPrice || 0))
    };

    if (selectedRate && currency) {
      fetch();
    }
  }, [selectedRate, currency, totalPrice]);

  const checkout = async () => {
    console.log("selectedRate: ", selectedRate)
    try {
      const data = {
        address,
        rateId: selectedRate?.rateId || '',
        totalAmount,
        shippingRate: shippingAmount,
        carrierCode: selectedRate?.carrierCode || '',
        products: cartProducts.map(item => ({
          id: item.product_data?.product_id,
          quantity: item.quantity
        }))
      }

      const response = await axios.post<CheckoutApiResponse>('/api/checkout', data)
      return response.data.label

    } catch (error) {
      console.error(error)
    }
  }


  return <CheckoutContext.Provider value={{
    rates, setRates,
    address, setAddress,
    selectedRate, setSelectedRate,
    accordionValue, setAccordionValue,
    shippingAmount, totalAmount, checkout
  }}>
    {children}
  </CheckoutContext.Provider>
}

