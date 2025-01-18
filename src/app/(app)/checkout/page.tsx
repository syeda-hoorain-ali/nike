import { PackageIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

const page = () => {
  return (
    <main className={`${inter.className} max-w-screen-lg mx-auto my-12 px-4 md:px-8 lg:px-20`}>
      <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-20">

        <div>
          <h2 className="text-xl font-semibold mb-4">How would you like to get your order?</h2>
          <p className="text-[#757575] text-md">Customs regulation for India require a copy of the recipient&apos;s KYC. The address on the KYC needs to match the shipping address. Our courier will contact you via SMS/email to obtain a copy of your KYC. The KYC will be stored securely and used solely for the purpose of clearing customs (including sharing it with customs officials) for all orders and returns. If your KYC does not match your shipping address, please click the link for more information. <Link href='/contact-us' className="underline underline-offset-4">Learn More</Link></p>

          <div className="border-foreground border-2 rounded-xl py-7 px-5 my-8 flex gap-4 items-center">
            <PackageIcon /> <span>Deliver It</span>
          </div>

          <form className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold mb-4">Enter you name and address:</h2>

            <Input className="p-4 h-14 rounded" placeholder="First Name" />
            <Input className="p-4 h-14 rounded" placeholder="Last Name" />
            <div className="flex flex-col">
              <Input className="p-4 h-14 rounded" placeholder="Address Line 1" />
              <p className="text-[#757575] text-xs ml-4 mt-1">We do not ship to P.O. boxes</p>
            </div>
            <Input className="p-4 h-14 rounded" placeholder="Address Line 2" />
            <Input className="p-4 h-14 rounded" placeholder="Address Line 3" />

            <div className="flex gap-4">
              <Input className="p-4 h-14 rounded" placeholder="Postal Code" />
              <Input className="p-4 h-14 rounded" placeholder="Locality" />
            </div>

            <div className="flex gap-4">
              <Select>
                <SelectTrigger className="w-full h-14 rounded">
                  <SelectValue placeholder="State/Territory" className="text-muted-foreground" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sindh">Sindh</SelectItem>
                  <SelectItem value="panjab">Panjab</SelectItem>
                  <SelectItem value="baluchistan">Bluchistan</SelectItem>
                  <SelectItem value="khyber-pakhtunkhwa">Khyber Pakhtunkhwa</SelectItem>
                  <SelectItem value="gilgit-bltistan">Gilgit-Baltistan</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-full h-14 rounded">
                  <SelectValue placeholder="Country" className="text-muted-foreground" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pakistan">Pakistan</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-4 items-center">
              <Checkbox id="profile-address" />
              <Label htmlFor="profile-address">Save this address to my profile</Label>
            </div>

            <div className="flex gap-4 items-center">
              <Checkbox id="preferred-address" />
              <Label htmlFor="preferred-address">Make this my preferred address</Label>
            </div>

            <h2 className="text-xl font-semibold mt-8 mb-4">What&apos;s your contact information?</h2>
            <div className="flex flex-col">
              <Input className="p-4 h-14 rounded" placeholder="Email" />
              <p className="text-[#757575] text-xs ml-4 mt-1">A confirmation email will be sent after checkout.</p>
            </div>

            <div className="flex flex-col">
              <Input className="p-4 h-14 rounded" placeholder="Phone Number" />
              <p className="text-[#757575] text-xs ml-4 mt-1">A carrier might contact you to confirm delivery.</p>
            </div>


            <h2 className="text-xl font-semibold mt-8 mb-4">What&apos;s your PAN?</h2>
            <div className="flex flex-col">
              <Input className="p-4 h-14 rounded" placeholder="PAN" />
              <p className="text-[#757575] text-xs ml-4 mt-1">Enter your PAN to enable payment with UPI, Net Banking or local card methods.</p>
            </div>

            <div className="flex gap-4 items-center">
              <Checkbox id="pan" />
              <Label htmlFor="pan" className="text-xs text-[#757575]">Save PAN details to Nike Profile</Label>
            </div>

            <div className="flex gap-4 items-center mt-12">
              <Checkbox id="privacy-policy" />
              <Label htmlFor="privacy-policy" className="text-xs text-[#757575]">
                I have read and consent to eShopWorld processing my information in accordance with the {' '}
                <Link href='/contact-us' className="underline underline-offset-2">Privacy Statement</Link>{' '}and{' '}
                <Link href='/contact-us' className="underline underline-offset-2">Cookie Policy</Link>.
                eShopWorld is a trusted Nike partner.
              </Label>
            </div>

            <Button disabled className="h-16 mt-8 mb-6">Countinue</Button>
          </form>

          <div>
            <Separator className="my-4" />
            <h4 className="text-xl font-semibold mb-8">Delivery</h4>
            <Separator className="my-4" />
            <h4 className="text-xl font-semibold mb-8 text-[#757575]">Shipping</h4>
            <Separator className="my-4" />
            <h4 className="text-xl font-semibold mb-8 text-[#757575]">Billing</h4>
            <Separator className="my-4" />
            <h4 className="text-xl font-semibold mb-8 text-[#757575]">Payment</h4>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Order summary</h2>

          <div className="flex flex-col gap-4">
            <div className="flex justify-between text-[#8d8d8d]">
              <span>Subtotal</span>
              <span>₹ 20 890.00</span>
            </div>

            <div className="flex justify-between text-[#8d8d8d]">
              <span>Delivery/Shipping</span>
              <span>Free</span>
            </div>

            <Separator />

            <div className="flex justify-between">
              <span>Total</span>
              <span>₹ 20 890.00</span>
            </div>
            <Separator />
          </div>

          <p className="text-[9px] my-2">(The total reflects the price of your order, including all duties and taxes)</p>

          <h3 className="font-bold my-4">Arrives Mon, 27 Mar - Wed, 12 Apr</h3>

          <div className="card flex gap-2 mb-2">
            <Image src="/images/product/nike-dri-fit-adv-techknit-ultra.png" alt="" height={208} width={208} />
            <div className="flex flex-col">
              <p className="text-sm">Nike Dri-FIT ADV TechKnit Ultra Men&apos;s Short-Sleeve Running Top</p>
              <span className="text-sm text-[#8d8d8d]">Qty 1</span>
              <span className="text-sm text-[#8d8d8d]">Size L</span>
              <span className="text-sm text-[#8d8d8d]">₹ 3 895.00</span>
            </div>
          </div>

          <div className="card flex gap-2">
            <Image src="/images/product/nike-air-max-97-se.png" alt="" height={208} width={208} />
            <div className="flex flex-col">
              <p className="text-sm">Nike Air Max 97 SE Men&apos;s Shoes</p>
              <span className="text-sm text-[#8d8d8d]">Qty 1</span>
              <span className="text-sm text-[#8d8d8d]">Size UK 8</span>
              <span className="text-sm text-[#8d8d8d]">₹ 16 995.00</span>
            </div>
          </div>

        </div>

      </div>
    </main>
  )
}

export default page
