"use client"

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { addressSchema } from "@/schema/addressSchema"
import { useShoppingCart } from "use-shopping-cart";
import { useCheckout } from "@/context/checkout-context";
import { ICountry, IPlace } from "@/types/data";
import { getAddress, getCities, getCountries, getRates } from "@/lib/data";
import { Loader2Icon } from "lucide-react";


const AddressForm = () => {

  type FormType = z.infer<typeof addressSchema>

  const { cartDetails } = useShoppingCart()
  const { setRates, setAddress, setAccordionValue } = useCheckout()

  const [suggestions, setSuggestions] = useState<IPlace[]>([]);
  const [countries, setCountries] = useState<ICountry[]>([])
  const [cities, setCities] = useState<string[]>([])
  const [countryCode, setCountryCode] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchCountries = async () => {
      const countries = await getCountries()
      setCountries(countries)
    }
    fetchCountries()
  }, [])

  useEffect(() => {
    const country = countries.find(item => item.code.toLowerCase() == countryCode);
    if (!country) return;

    const fetchCities = async () => {
      const cities = await getCities(country.name)
      setCities(cities)
    }
    fetchCities()
  }, [countryCode, countries])


  const form = useForm<FormType>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      // firstName: "",
      // lastName: "",
      // email: "",
      // phone: "",
      // pan: "",
      // addressLine1: "",
      // addressLine2: "",
      // postalCode: "",
      // country: "",
      // state: "",
      // city: ""
      firstName: "Afroz",
      lastName: "Kanwal",
      email: "jagjets133@gmail.com",
      phone: "03118942051",
      pan: "1234567890",
      addressLine1: "Plot 917 gharibabad liaquataabad karachi pakistan",
      postalCode: "74600",
      country: "pk",
      state: "sindh",
      city: "karachi",
      privacyPolicy: true,
    },
  })


  const handleAddressChange = async (query: string) => {
    const address = await getAddress(query)
    setSuggestions(address);
  };

  const handleAddressSelect = (e: FormEvent<HTMLInputElement>) => {
    const place = suggestions.find(place => place.display_name === e.currentTarget.value);
    if (!place) return

    setCountryCode(place.address.country_code)
    form.setValue("addressLine1", place.display_name);
    form.setValue("city", place.address.city || place.address.town || place.address.village || '');
    form.setValue("state", place.address.state);
    form.setValue("country", place.address.country_code);
    form.setValue("postalCode", place.address.postcode);
  };

  const onSubmit = async (data: FormType) => {
    setIsLoading(true)

    const products = Object.values(cartDetails ?? {}).map(item => ({
      name: item.name,
      quantity: item.quantity,
      price: item.price
    }))

    const rates = await getRates({
      address: { ...data, addressLine1: data.addressLine1.slice(0, 50) },
      products
    })
    
    if (rates.length > 0) setRates(rates)

    setAddress(data)
    setAccordionValue('rates')
    setIsLoading(false)
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

        <h2 className="text-xl font-semibold mb-4">Enter you name and address:</h2>
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input {...field} className="p-4 h-14 rounded" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input {...field} className="p-4 h-14 rounded" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="addressLine1"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address Line 1</FormLabel>
              <FormControl>
                <Input {...field}
                  list="address-suggestions"
                  className="p-4 h-14 rounded"
                  onChange={e => { field.onChange(e); handleAddressChange(e.target.value) }}
                  onInput={handleAddressSelect}
                />
              </FormControl>

              <datalist id="address-suggestions">
                {suggestions.map(({ display_name }, i) => (
                  <option key={i} value={display_name}>{display_name}</option>
                ))}
              </datalist>
              <FormDescription>We do not ship to P.O. boxes</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="addressLine2"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address Line 2</FormLabel>
              <FormControl>
                <Input {...field} className="p-4 h-14 rounded" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="postalCode"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Postal Code</FormLabel>
                <FormControl>
                  <Input {...field} className="p-4 h-14 rounded" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>State</FormLabel>
                <FormControl>
                  <Input {...field} className="p-4 h-14 rounded" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Country</FormLabel>
                <Select
                  value={field.value}
                  defaultValue={field.value}
                  onValueChange={v => { field.onChange(v); setCountryCode(v) }}>
                  <FormControl>
                    <SelectTrigger className="w-full h-14 rounded">
                      <SelectValue className="text-muted-foreground" />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    {countries.map(country => (
                      <SelectItem key={country.code} value={country.code.toLowerCase()}>
                        {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>City/Town</FormLabel>
                <Select value={field.value} defaultValue={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger className="w-full h-14 rounded">
                      <SelectValue className="text-muted-foreground" />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    {cities.map(city => (
                      <SelectItem key={city} value={city.toLowerCase()}>{city}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>


        <h2 className="text-xl font-semibold mt-8 mb-4">What&apos;s your contact information?</h2>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} className="p-4 h-14 rounded" type="email" />
              </FormControl>
              <FormDescription>A confirmation email will be sent after checkout.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input {...field} className="p-4 h-14 rounded" type="tel" />
              </FormControl>
              <FormDescription>A carrier might contact you to confirm delivery.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <h2 className="text-xl font-semibold mt-8 mb-4">What&apos;s your PAN?</h2>

        <FormField
          control={form.control}
          name="pan"
          render={({ field }) => (
            <FormItem>
              <FormLabel>PAN</FormLabel>
              <FormControl>
                <Input {...field} className="p-4 h-14 rounded" />
              </FormControl>
              <FormDescription>Enter your PAN to enable payment with UPI, Net Banking or local card methods.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="privacyPolicy"
          render={({ field }) => (
            <FormItem>
              <div className="flex gap-4 items-center mt-2">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel className="text-xs text-[#757575]">
                  I have read and consent to eShopWorld processing my information in accordance with the {' '}
                  <Link href='/privacy-policy' className="underline underline-offset-2">Privacy Statement</Link>{' '}and{' '}
                  <Link href='/privacy-policy' className="underline underline-offset-2">Cookie Policy</Link>.
                  eShopWorld is a trusted Nike partner.
                </FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="mt-8" disabled={isLoading}>
          {isLoading ?
            <Loader2Icon className="animate-spin" stroke="#fff" />
            : null}
          Continue
        </Button>
      </form>
    </Form>
  )
}

export default AddressForm;
