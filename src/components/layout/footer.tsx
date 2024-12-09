import Link from "next/link"
import { FacebookIcon, InstagramIcon, LocationIcon, TwitterIcon, YoutubeIcon } from "../icons"

const Footer = () => {

  const year = new Date().getFullYear()

  return (
    <footer className="w-full pt-20 bg-[#111111]">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2">

        <div className="flex flex-wrap lg:flex-nowrap px-4 gap-y-6">

          <ul className="min-w-60 flex flex-col gap-4 text-xs text-white uppercase">
            <li><Link className="transition-all hover:underline" href='#'>Find a store</Link></li>
            <li><Link className="transition-all hover:underline" href='#'>Become a member</Link></li>
            <li><Link className="transition-all hover:underline" href='#'>Sign up for email</Link></li>
            <li><Link className="transition-all hover:underline" href='#'>Send us feedback</Link></li>
            <li><Link className="transition-all hover:underline" href='#'>Student discounts</Link></li>
          </ul>

          <ul className="w-36 md:min-w-60 flex flex-col gap-4 text-xs capitalize text-[#7e7e7e]">
            <li><Link className="transition-all text-white uppercase hover:underline" href='#'>Get help</Link></li>
            <li><Link className="transition-all hover:text-white" href='#'>Order status</Link></li>
            <li><Link className="transition-all hover:text-white" href='#'>Delivery</Link></li>
            <li><Link className="transition-all hover:text-white" href='#'>Returns</Link></li>
            <li><Link className="transition-all hover:text-white" href='#'>Payment Options</Link></li>
            <li><Link className="transition-all hover:text-white" href='#'>Contact us on nike.com inquiries</Link></li>
            <li><Link className="transition-all hover:text-white" href='#'>Contact us on all other inquiries</Link></li>
          </ul>

          <ul className="w-36 md:min-w-60 pl-6 md:pl-0 flex flex-col gap-4 text-xs capitalize text-[#7e7e7e]">
            <li><Link className="transition-all text-white uppercase hover:underline" href='#'>About nike</Link></li>
            <li><Link className="transition-all hover:text-white" href='#'>News</Link></li>
            <li><Link className="transition-all hover:text-white" href='#'>Careers</Link></li>
            <li><Link className="transition-all hover:text-white" href='#'>Investors</Link></li>
            <li><Link className="transition-all hover:text-white" href='#'>Sustainability</Link></li>
          </ul>

        </div>

        <div className="my-8 lg:my-0 flex gap-4 justify-center lg:justify-end items-start">
          <Link className="transition-all hover:text-white" href='https://www.twitter.com/'><TwitterIcon /></Link>
          <Link className="transition-all hover:text-white" href='https://www.facebook.com/'><FacebookIcon /></Link>
          <Link className="transition-all hover:text-white" href='https://www.youtube.com/'><YoutubeIcon /></Link>
          <Link className="transition-all hover:text-white" href='https://www.instagram.com/'><InstagramIcon /></Link>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto pt-10 py-5 px-2 md:px-4 flex gap-4 flex-col-reverse md:flex-row justify-between">

        <div className="flex gap-4 items-center">
          <LocationIcon />
          <span className="text-sm text-white">Pakistan</span>
          <p className="text-[#7e7e7e] text-xs">&copy; {year} Nike, Inc. All Rights Reserved</p>
        </div>

        <ul className="flex flex-wrap gap-x-4 gap-y-2 text-[#7e7e7e] text-sm">
          <li><Link className="transition hover:text-white" href='/contact-us'>Guides</Link></li>
          <li><Link className="transition hover:text-white" href='/contact-us'>Terms of Sale</Link></li>
          <li><Link className="transition hover:text-white" href='/contact-us'>Terms of Use</Link></li>
          <li><Link className="transition hover:text-white" href='/contact-us'>Nike Privacy Policy</Link></li>
        </ul>

      </div>

    </footer>
  )
}

export default Footer
