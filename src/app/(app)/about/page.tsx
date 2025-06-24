import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export const metadata: Metadata = {
  title: "About Us",
  description: "Our mission is to bring inspiration and innovation to every athlete in the world.",
}

const AboutPage = () => {
  return (
    <main className="max-w-screen-xl mx-auto">
      {/* Hero Section */}
      <section className="py-12 px-4 md:px-8 lg:px-0">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold uppercase mb-6">About Nike</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-600">
            Our mission is to bring inspiration and innovation to every athlete in the world. 
            If you have a body, you are an athlete.
          </p>
        </div>
        
        <div className="relative h-[400px] md:h-[600px] mb-12">
          <Image 
            src="/images/hero-image.png" 
            alt="Nike Brand Story" 
            fill
            className="object-cover rounded-lg"
          />
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-12 px-4 md:px-8 lg:px-0">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Founded in 1964 as Blue Ribbon Sports, Nike has grown from a small distributor 
              to the world&apos;s largest supplier of athletic shoes and apparel. Our journey began 
              with a handshake between Bill Bowerman and Phil Knight, driven by a shared passion 
              for running and a belief that athletic footwear could be improved.
            </p>
            <p className="text-gray-600 mb-6">
              Today, Nike continues to innovate and inspire athletes worldwide with cutting-edge 
              technology, sustainable practices, and a commitment to pushing the boundaries of 
              human potential.
            </p>
            <Button className="px-8 py-3">
              <Link href="/products">Shop Now</Link>
            </Button>
          </div>
          <div className="relative h-[400px]">
            <Image 
              src="/images/featured-image.png" 
              alt="Nike Innovation" 
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-12 px-4 md:px-8 lg:px-0 bg-gray-50 rounded-lg my-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Values</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-black rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-white font-bold text-xl">I</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Innovation</h3>
            <p className="text-gray-600">
              We push the boundaries of what&apos;s possible, constantly evolving our products 
              and processes to serve athletes better.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-black rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Sustainability</h3>
            <p className="text-gray-600">
              We&apos;re committed to creating a better future for sport and the planet through 
              sustainable design and manufacturing.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-black rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-white font-bold text-xl">D</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Diversity</h3>
            <p className="text-gray-600">
              We believe sport has the power to unite people and break down barriers, 
              celebrating diversity in all its forms.
            </p>
          </div>
        </div>
      </section>

      {/* Innovation Section */}
      <section className="py-12 px-4 md:px-8 lg:px-0">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-[400px] order-2 md:order-1">
            <Image 
              src="/images/section-2.png" 
              alt="Nike Technology" 
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Innovation Lab</h2>
            <p className="text-gray-600 mb-4">
              At Nike, innovation isn&apos;t just a buzzword—it&apos;s our driving force. Our team of 
              designers, engineers, and scientists work tirelessly to create products that 
              enhance athletic performance and comfort.
            </p>
            <p className="text-gray-600 mb-6">
              From Air cushioning to Flyknit technology, every innovation starts with understanding 
              what athletes need to perform at their best. We test, iterate, and perfect until 
              we create something truly revolutionary.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-black rounded-full"></span>
                <span>Air Max Technology</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-black rounded-full"></span>
                <span>Flyknit Construction</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-black rounded-full"></span>
                <span>React Foam</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-black rounded-full"></span>
                <span>ZoomX Technology</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 md:px-8 lg:px-0 text-center bg-black text-white rounded-lg my-12">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 uppercase">Just Do It</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Join millions of athletes worldwide who trust Nike to help them achieve their goals. 
          Whether you&apos;re just starting out or pushing for a personal best, we&apos;re here to support your journey.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="secondary" className="px-8 py-3">
            <Link href="/products">Explore Products</Link>
          </Button>
          <Button variant="outline" className="px-8 py-3 text-black border-white hover:bg-white">
            <Link href="/contact-us">Get in Touch</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}

export default AboutPage
