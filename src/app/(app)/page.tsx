import ProductCard from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import Image from "next/image"
import Link from "next/link"

const page = () => {
  return (<>

    <div className="w-full py-2 bg-muted hidden lg:flex flex-col items-center">
      <strong>Hello Nike App</strong>
      <span className="text-sm">
        Download the app to access everything Nike.
        <Link className="font-semibold underline" href=''>Get Your Great</Link>
      </span>
    </div>

    <main className="max-w-screen-xl mx-auto">
      <Image src="/images/hero-image.png" alt="" height={700} width={1280} />

      <div className="mt-12 flex flex-col gap-4 items-center">
        <span className="font-semibold">First Look</span>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold uppercase">Nike air max pulse</h2>
        <p className="max-w-xl px-3 text-center">Extreme comfort. Hyper durable. Max volume. Introducing the Air Max Pulse —designed to push you past your limits and help you go to the max.</p>

        <div className="flex gap-4">
          <Button className="px-6 h-10 capitalize">Notify me</Button>
          <Button className="px-6 h-10 capitalize">Shop air max</Button>
        </div>
      </div>
    </main>

    <section className="max-w-screen-xl mx-auto my-20">
      <Carousel opts={{ loop: true, align: 'center' }}>
        <div className="flex justify-between items-center">
          <h3 className="text-xl md:text-2xl font-semibold my-4 px-4 md:px-8 lg:px-0 ">Best of Air Max</h3>

          <div className="flex items-center gap-4">
            <span className="hidden md:inline text-md font-semibold">Shop</span>

            <div className="flex gap-4 w-28 relative items-center">
              <CarouselPrevious className="size-8 lg:size-12 bg-[#e5e5e5] static translate-y-0" />
              <CarouselNext className="size-8 lg:size-12 bg-[#e5e5e5] static translate-y-0" />
            </div>

          </div>
        </div>

        <CarouselContent>
          <CarouselItem className="md:basis-1/2 lg:basis-1/3">
            <ProductCard size="lg" image="/images/product/nike-air-max-plus.png" name="Nike air max plus" category="Women's shoes" price={13995} />
          </CarouselItem>

          <CarouselItem className="md:basis-1/2 lg:basis-1/3">
            <ProductCard size="lg" image="/images/product/nike-air-max-plus.png" name="Nike air max plus" category="Men's shoes" price={13995} />
          </CarouselItem>

          <CarouselItem className="md:basis-1/2 lg:basis-1/3">
            <ProductCard size="lg" image="/images/product/nike-air-max-97-se.png" name="Nike air max 97 SE" category="Men's shoes" price={16995} />
          </CarouselItem>

          <CarouselItem className="md:basis-1/2 lg:basis-1/3">
            <ProductCard size="lg" image="/images/product/nike-air-max-systm.png" name="Nike air max SYSTM" category="Women's shoes" price={16995} />
          </CarouselItem>

        </CarouselContent>

      </Carousel>

    </section>

    <section className="max-w-screen-xl mx-auto">
      <h3 className="text-2xl font-semibold my-4 px-4 md:px-8 lg:px-0">Featured</h3>
      <Image src="/images/featured-image.png" alt="" height={700} width={1280} />

      <div className="mt-12 flex flex-col gap-4 items-center">
        <h2 className="text-3xl md:text-5xl lg:text-6xl text-center font-bold uppercase">Step into what feels good</h2>
        <p className="max-w-xl px-3 text-center">Cause everyone should know the feeling of running in that perfect pair.</p>
        <Button className="px-6 h-10 capitalize">Find your shoe</Button>
      </div>
    </section>

    <section className="max-w-screen-xl mx-auto my-20">
      <h3 className="text-2xl font-semibold my-4 px-4 md:px-8 lg:px-0">Gear Up</h3>

      <div className="grid grid-rows-2 md:grid-rows-1 md:grid-cols-2 gap-4 overflow-x-hidden">

        <Carousel opts={{ loop: true, align: 'start' }}>
          <div className="w-screen md:w-full mb-4 ml-4 flex justify-between lg:justify-end items-center gap-4">
            <span className="text-md font-semibold">Shop Men&apos;s</span>

            <div className="flex gap-4 w-28 relative items-center">
              <CarouselPrevious className="size-8 lg:size-12 bg-[#e5e5e5] static translate-y-0" />
              <CarouselNext className="size-8 lg:size-12 bg-[#e5e5e5] static translate-y-0" />
            </div>
          </div>

          <CarouselContent>
            <CarouselItem className="lg:basis-1/2">
              <ProductCard size="sm" image="/images/product/nike-dri-fit-adv-techknit-ultra.png" name="Nike Dri-FIT ADV TechKnit Ultra" category="Men's Short-Sleeve Running Top" price={3895} />
            </CarouselItem>

            <CarouselItem className="lg:basis-1/2">
              <ProductCard size="sm" image="/images/product/nike-dri-fit-challenger.png" name="Nike Dri-FIT Challenger" category="Men's 18cm (approx.) 2-in-1 Versatile Shorts" price={13995} />
            </CarouselItem>

            <CarouselItem className="lg:basis-1/2">
              <ProductCard size="sm" image="/images/product/nike-air-max-97-se.png" name="Nike air max 97 SE" category="Men's shoes" price={2495} />
            </CarouselItem>

          </CarouselContent>
        </Carousel>

        <Carousel opts={{ loop: true, align: 'start' }}>
          <div className="w-screen md:w-full mb-4 ml-4 flex justify-between lg:justify-end items-center gap-4">
            <span className="text-md font-semibold">Shop Women&apos;s</span>

            <div className="flex gap-4 w-28 relative items-center">
              <CarouselPrevious className="size-8 lg:size-12 bg-[#e5e5e5] static translate-y-0" />
              <CarouselNext className="size-8 lg:size-12 bg-[#e5e5e5] static translate-y-0" />
            </div>
          </div>

          <CarouselContent>
            <CarouselItem className="lg:basis-1/2">
              <ProductCard size="sm" image="/images/product/nike-dri-fit-adv-techknit-ultra.png" name="Nike Dri-FIT ADV TechKnit Ultra" category="Men's Short-Sleeve Running Top" price={3895} />
            </CarouselItem>

            <CarouselItem className="lg:basis-1/2">
              <ProductCard size="sm" image="/images/product/nike-dri-fit-challenger.png" name="Nike Dri-FIT Challenger" category="Men's 18cm (approx.) 2-in-1 Versatile Shorts" price={13995} />
            </CarouselItem>

            <CarouselItem className="lg:basis-1/2">
              <ProductCard size="sm" image="/images/product/nike-air-max-97-se.png" name="Nike air max 97 SE" category="Men's shoes" price={2495} />
            </CarouselItem>

          </CarouselContent>
        </Carousel>

      </div>
    </section>

    <section className="max-w-screen-xl mx-auto">
      <h3 className="text-2xl font-semibold my-4 px-4 md:px-8 lg:px-0">Don&apos;t Miss</h3>
      <Image src="/images/section-2.png" alt="" height={700} width={1280} />

      <div className="mt-12 flex flex-col gap-4 items-center">
        <h2 className="text-3xl lg:text-6xl font-bold uppercase">Flight essentials</h2>
        <p className="max-w-xl px-3 text-center">Your built-to-last, all-week wears—but with style only Jordan Brand can deliver.</p>
        <Button className="px-6 h-10 capitalize">Shop</Button>
      </div>
    </section>

    <section className="max-w-screen-xl mx-auto my-20 px-4 md:px-8 lg:px-0">
      <h3 className="text-2xl font-semibold my-4">The Essentials</h3>

      <div className="grid grid-rows-3 md:grid-rows-1 md:grid-cols-3 gap-2">

        <div className="card relative">
          <Image src="/images/mens.png" alt="Men's" width={440} height={540} />
          <span className="absolute left-8 bottom-8 px-4 py-2 text-md font-semibold bg-white rounded-full shadow">Men&apos;s</span>
        </div>

        <div className="card relative">
          <Image src="/images/womens.png" alt="Women's" width={440} height={540} />
          <span className="absolute left-8 bottom-8 px-4 py-2 text-md font-semibold bg-white rounded-full shadow">Women&apos;s</span>
        </div>

        <div className="card relative">
          <Image src="/images/kids.png" alt="Kid's" width={440} height={540} />
          <span className="absolute left-8 bottom-8 px-4 py-2 text-md font-semibold bg-white rounded-full shadow">Kids&apos;s</span>
        </div>

      </div>
    </section>

    <section className="max-w-screen-lg mx-auto my-20 flex flex-wrap justify-between gap-y-6 px-4 md:px-8 lg:px-0 ">
    
    <div className="w-32 md:w-44">
      <strong className="text-md font-semibold mb-8 block">Icons</strong>
      <ul className="flex flex-col gap-4 capitalize text-[#757575] font-meduim">
        <li><Link className="hover:text-black transition-all" href=''>Air force 1</Link></li>
        <li><Link className="hover:text-black transition-all" href=''>Huarache</Link></li>
        <li><Link className="hover:text-black transition-all" href=''>Air max 90</Link></li>
        <li><Link className="hover:text-black transition-all" href=''>Air max 95</Link></li>
      </ul>
    </div>

    <div className="w-32 md:w-44">
      <strong className="text-md font-semibold mb-8 block">Shoes</strong>
      <ul className="flex flex-col gap-4 capitalize text-[#757575] font-meduim">
        <li><Link className="hover:text-black transition-all" href=''>All shoes</Link></li>
        <li><Link className="hover:text-black transition-all" href=''>Custom shoes</Link></li>
        <li><Link className="hover:text-black transition-all" href=''>Jordan shoes</Link></li>
        <li><Link className="hover:text-black transition-all" href=''>Running shoes</Link></li>
      </ul>
    </div>

    <div className="w-32 md:w-44">
      <strong className="text-md font-semibold mb-8 block">Clothing</strong>
      <ul className="flex flex-col gap-4 capitalize text-[#757575] font-meduim">
        <li><Link className="hover:text-black transition-all" href=''>All clothing</Link></li>
        <li><Link className="hover:text-black transition-all" href=''>Modest wear</Link></li>
        <li><Link className="hover:text-black transition-all" href=''>Hoodies & pullovers</Link></li>
        <li><Link className="hover:text-black transition-all" href=''>Shirts & tops</Link></li>
      </ul>
    </div>

    <div className="w-32 md:w-44">
      <strong className="text-md font-semibold mb-8 block">Kids</strong>
      <ul className="flex flex-col gap-4 capitalize text-[#757575] font-meduim">
        <li><Link className="hover:text-black transition-all" href=''>Infant & toddler</Link></li>
        <li><Link className="hover:text-black transition-all" href=''>Kid&apos;s shoes</Link></li>
        <li><Link className="hover:text-black transition-all" href=''>Kid&apos;s jordan shoes</Link></li>
        <li><Link className="hover:text-black transition-all" href=''>Kid&apos;s basketball shoes</Link></li>
      </ul>
    </div>
    
    </section>
  </>)
}

export default page
