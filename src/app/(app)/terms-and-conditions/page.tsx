import { Logo } from "@/components/icons"
import Link from "next/link"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "By accessing and using Nike's website, mobile application, and services, you accept and agree to be bound by the terms and provision of this agreement.",
}

const TermsAndConditionsPage = () => {
  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/" className="inline-block mb-6">
          <Logo />
        </Link>
        <h1 className="text-3xl font-bold mb-4">Terms and Conditions</h1>
        <p className="text-sm text-[#8d8d8d]">Last updated: December 2024</p>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-4">Acceptance of Terms</h2>
          <p className="text-[#757575] leading-relaxed">
            By accessing and using Nike&apos;s website, mobile application, and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Use License</h2>
          <p className="text-[#757575] leading-relaxed mb-4">
            Permission is granted to temporarily download one copy of the materials on Nike&apos;s website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
          </p>
          <ul className="list-disc list-inside space-y-2 text-[#757575]">
            <li>modify or copy the materials</li>
            <li>use the materials for any commercial purpose or for any public display (commercial or non-commercial)</li>
            <li>attempt to decompile or reverse engineer any software contained on Nike&apos;s website</li>
            <li>remove any copyright or other proprietary notations from the materials</li>
          </ul>
          <p className="text-[#757575] leading-relaxed mt-4">
            This license shall automatically terminate if you violate any of these restrictions and may be terminated by Nike at any time.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Product Information and Pricing</h2>
          <p className="text-[#757575] leading-relaxed mb-4">
            We strive to provide accurate product descriptions and pricing information. However:
          </p>
          <ul className="list-disc list-inside space-y-2 text-[#757575]">
            <li>Product colors may vary slightly from those shown on your monitor</li>
            <li>We reserve the right to correct any errors, inaccuracies, or omissions</li>
            <li>Prices are subject to change without notice</li>
            <li>All prices are listed in USD unless otherwise specified</li>
            <li>Product availability is subject to stock levels</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Orders and Payment</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Order Acceptance</h3>
              <p className="text-[#757575] leading-relaxed">
                All orders are subject to acceptance and availability. We reserve the right to refuse or cancel any order for any reason, including suspected fraudulent activity.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Payment Terms</h3>
              <p className="text-[#757575] leading-relaxed">
                Payment must be received before products are shipped. We accept various payment methods as displayed at checkout. All transactions are processed securely.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Shipping and Delivery</h2>
          <p className="text-[#757575] leading-relaxed mb-4">
            Shipping and delivery terms include:
          </p>
          <ul className="list-disc list-inside space-y-2 text-[#757575]">
            <li>Delivery times are estimates and not guaranteed</li>
            <li>Risk of loss passes to you upon delivery to the carrier</li>
            <li>International orders may be subject to customs duties and taxes</li>
            <li>We are not responsible for delays caused by customs or shipping carriers</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Returns and Exchanges</h2>
          <p className="text-[#757575] leading-relaxed mb-4">
            Our return policy allows for:
          </p>
          <ul className="list-disc list-inside space-y-2 text-[#757575]">
            <li>Returns within 60 days of purchase with original receipt</li>
            <li>Items must be in original condition with tags attached</li>
            <li>Personalized or customized items cannot be returned</li>
            <li>Return shipping costs may apply</li>
            <li>Refunds will be processed to the original payment method</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">User Accounts</h2>
          <p className="text-[#757575] leading-relaxed mb-4">
            When creating an account, you agree to:
          </p>
          <ul className="list-disc list-inside space-y-2 text-[#757575]">
            <li>Provide accurate and complete information</li>
            <li>Maintain the security of your password and account</li>
            <li>Accept responsibility for all activities under your account</li>
            <li>Notify us immediately of any unauthorized use</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Intellectual Property</h2>
          <p className="text-[#757575] leading-relaxed">
            All content on this website, including but not limited to text, graphics, logos, images, and software, is the property of Nike, Inc. and is protected by copyright, trademark, and other intellectual property laws. The Nike name and logo are registered trademarks of Nike, Inc.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Prohibited Uses</h2>
          <p className="text-[#757575] leading-relaxed mb-4">
            You may not use our service:
          </p>
          <ul className="list-disc list-inside space-y-2 text-[#757575]">
            <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
            <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
            <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
            <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
            <li>To submit false or misleading information</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Disclaimers</h2>
          <p className="text-[#757575] leading-relaxed">
            The information on this website is provided on an &apos;as is&apos; basis. To the fullest extent permitted by law, Nike excludes all representations, warranties, conditions and terms whether express or implied, statutory or otherwise. Nike does not warrant that the website will be constantly available or available at all.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Limitation of Liability</h2>
          <p className="text-[#757575] leading-relaxed">
            In no event shall Nike, Inc., nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, punitive, consequential, or similar damages arising out of your use of this website or products purchased through this website.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Governing Law</h2>
          <p className="text-[#757575] leading-relaxed">
            These terms and conditions are governed by and construed in accordance with the laws of Oregon, United States, and you irrevocably submit to the exclusive jurisdiction of the courts in that state or location.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Changes to Terms</h2>
          <p className="text-[#757575] leading-relaxed">
            We reserve the right to update or modify these terms and conditions at any time without prior notice. Your continued use of our website following any changes constitutes acceptance of those changes.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
          <p className="text-[#757575] leading-relaxed mb-4">
            If you have any questions about these Terms and Conditions, please contact us:
          </p>
          <div className="text-[#757575]">
            <p>Nike, Inc.</p>
            <p>Legal Department</p>
            <p>One Bowerman Drive</p>
            <p>Beaverton, OR 97005</p>
            <p className="mt-2">
              Email: <Link href="/contact-us" className="underline hover:text-black transition">Contact Support</Link>
            </p>
          </div>
        </section>
      </div>

      <div className="mt-12 pt-8 border-t border-gray-200">
        <div className="flex gap-4 justify-center">
          <Link href="/contact-us">
            <button className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition">
              Contact Us
            </button>
          </Link>
          <Link href="/">
            <button className="px-6 py-2 border border-black rounded hover:bg-gray-100 transition">
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    </main>
  )
}

export default TermsAndConditionsPage
