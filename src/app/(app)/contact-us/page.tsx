import { Dislike, Like, SearchIcon } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import Link from "next/link"
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us",
    description: "Get help with your Nike orders, or find out how to contact us.",
}

const page = () => {
  return (
    <main className="max-w-screen-xl mx-auto my-12">

      <div className="mx-4 flex flex-col gap-4 items-center mb-12">
        <h2 className="text-3xl font-semibold uppercase">Get help</h2>

        <div className="relative w-full">
          <Input placeholder="What can we help you with" className="h-12 w-full max-w-[28rem]" />
          <Button variant="ghost" size="icon" className="absolute top-1.5 right-2"><SearchIcon /></Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] lg:grid-rows-1 gap-12">

        <div className="px-4 md:px-8 lg:px-0">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold uppercase mb-8">What payment options can i use on nike orders?</h2>

          <p className="my-4">We want to make buying your favourite Nike shoes and gear online fast and easy, and we accept the following payment options:</p>

          <div className="pl-8">
            <p className="my-4">Visa, Mastercard, Diners Club, Discover, American Express, Visa Electron, Maestro</p>
            <p className="my-4">If you enter your PAN information at checkout, you&apos;ll be able to pay for your order with PayTM or a local credit or debit card.</p>
            <p className="my-4">Apple Pay</p>
          </div>

          <div>
            <p className="my-4"><Link className="font-semibold hover:underline" href='/auth/join-us'>Nike Members</Link> {' '} can store multiple debit or credit cards in their profile for faster checkout. If you&apos;re not already a Member, {' '}<Link className="font-semibold hover:underline" href='/auth/join-us'>join us</Link> {' '} today.</p>

            <div className="flex gap-4">
              <Link href='/auth/join-us'><Button className="uppercase">Join us</Button></Link>
              <Link href='/products'><Button className="uppercase">Shop nike</Button></Link>
            </div>
          </div>

          <h3 className="text-xl font-semibold my-4">FAQs</h3>

          <div className="my-4">
            <strong className="font-semibold">Does my card need international purchases enabled?</strong>
            <p>Yes, we recommend asking your bank to enable international purchases on your card. You will be notified at checkout if international purchases need to be enabled.</p>
          </div>

          <p className="my-4">Please note, some banks may charge <Link href='#' className="font-semibold hover:underline">a small transaction fee</Link> for international orders.</p>

          <div className="my-4">
            <strong className="font-semibold">Can I pay for my order with multiple methods?</strong>
            <p>No, payment for Nike orders can&apos;t be split between multiple payment methods.</p>
          </div>

          <div className="my-4">
            <strong className="font-semibold">What payment method is accepted for SNKRS orders?</strong>
            <p>You can use any accepted credit card to pay for your SNKRS order.</p>
          </div>

          <div className="my-4">
            <strong className="font-semibold">Why don&apos;t I see Apple Pay as an option?</strong>
            <p>To see Apple Pay as an option in the Nike App or on Nike.com, you&apos;ll need to use a compatible Apple device running the latest OS, be signed in to your iCloud account and have a supported card in your Wallet. Additionally, you&apos;ll need to use Safari to use Apple Pay on Nike.com.</p>
          </div>

          <div className="my-4">
            <span className="text-md">Was this answer helpful?</span>
            <div className="flex gap-4 my-2">
              <Button variant="ghost" size="icon"><Like /></Button>
              <Button variant="ghost" size="icon"><Dislike /></Button>
            </div>
          </div>

          <div className="my-4">
            <span className="uppercase text-[#757575] font-semibold">Related</span>

            <div className="pl-6 flex flex-col gap-4 my-4">
              <Link className="uppercase font-semibold hover:underline" href='#'>What are nike delivery options?</Link>
              <Link className="uppercase font-semibold hover:underline" href='#'>How do i get free delivary on nike orders?</Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8 items-center">
          <h2 className="text-3xl font-semibold uppercase">Contact</h2>

          <div className="flex flex-col gap-6 items-center px-6">
            <Image src="/images/mobile.png" alt="" height={64} width={64} />

            <div className="flex flex-col items-center">
              <span className="font-semibold">000 800 919 0566</span>
              <p className="text-center">Products & Orders: 24 hours a day, 7 days a week<br />
                Company Info & Enquiries: 07:30 - 16:30, Monday - Friday</p>
            </div>
          </div>

          <div className="flex flex-col gap-6 items-center px-6">
            <Image src="/images/message.png" alt="" height={64} width={64} />

            <div className="flex flex-col items-center">
              <span className="font-semibold">24 hours a day</span>
              <p className="text-center">7 days a week</p>
            </div>
          </div>

          <div className="flex flex-col gap-6 items-center px-6">
            <Image src="/images/mail.png" alt="" height={64} width={64} />

            <div className="flex flex-col items-center">
              <span className="font-semibold">We&apos;ll reply within</span>
              <p className="text-center">five business days</p>
            </div>
          </div>

          <div className="flex flex-col gap-6 items-center px-6">
            <Image src="/images/nike-finder.png" alt="" height={64} width={64} />

            <div className="flex flex-col items-center">
              <span className="font-semibold">STORE LOCATOR</span>
              <p className="text-center">Find Nike retail stores near you</p>
            </div>
          </div>

        </div>


      </div>


    </main>
  )
}

export default page
