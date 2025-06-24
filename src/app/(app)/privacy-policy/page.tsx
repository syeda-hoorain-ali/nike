import { Logo } from "@/components/icons"
import Link from "next/link"
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy",
    description: "This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, mobile application, or use our services.",
}

const PrivacyPolicyPage = () => {
  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/" className="inline-block mb-6">
          <Logo />
        </Link>
        <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-sm text-[#8d8d8d]">Last updated: December 2024</p>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-4">Introduction</h2>
          <p className="text-[#757575] leading-relaxed">
            Nike, Inc. and our family of companies (collectively, &quot;Nike&quot;) respect your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, mobile application, or use our services.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Information We Collect</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Personal Information</h3>
              <p className="text-[#757575] leading-relaxed">
                We may collect personal information such as your name, email address, phone number, shipping address, payment information, and other details you provide when creating an account or making a purchase.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Usage Information</h3>
              <p className="text-[#757575] leading-relaxed">
                We automatically collect information about how you interact with our services, including your IP address, browser type, pages visited, and time spent on our site.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">How We Use Your Information</h2>
          <ul className="list-disc list-inside space-y-2 text-[#757575]">
            <li>Process and fulfill your orders</li>
            <li>Provide customer support and respond to inquiries</li>
            <li>Send promotional emails and marketing communications (with your consent)</li>
            <li>Improve our products and services</li>
            <li>Prevent fraud and enhance security</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Information Sharing</h2>
          <p className="text-[#757575] leading-relaxed mb-4">
            We may share your information with:
          </p>
          <ul className="list-disc list-inside space-y-2 text-[#757575]">
            <li>Service providers who help us operate our business</li>
            <li>Payment processors for transaction processing</li>
            <li>Shipping companies for order fulfillment</li>
            <li>Law enforcement when required by law</li>
            <li>Business partners with your explicit consent</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">eShopWorld Partnership</h2>
          <p className="text-[#757575] leading-relaxed">
            Nike partners with eShopWorld for international orders. When you place an international order, your information may be shared with eShopWorld to facilitate shipping, customs clearance, and customer service. eShopWorld is a trusted Nike partner committed to protecting your privacy.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Cookie Policy</h2>
          <p className="text-[#757575] leading-relaxed mb-4">
            We use cookies and similar technologies to enhance your browsing experience. Cookies help us:
          </p>
          <ul className="list-disc list-inside space-y-2 text-[#757575]">
            <li>Remember your preferences and settings</li>
            <li>Analyze website traffic and usage patterns</li>
            <li>Provide personalized content and advertisements</li>
            <li>Improve website functionality and performance</li>
          </ul>
          <p className="text-[#757575] leading-relaxed mt-4">
            You can control cookie settings through your browser preferences, though disabling cookies may affect website functionality.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Data Security</h2>
          <p className="text-[#757575] leading-relaxed">
            We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Your Rights</h2>
          <p className="text-[#757575] leading-relaxed mb-4">
            Depending on your location, you may have certain rights regarding your personal information:
          </p>
          <ul className="list-disc list-inside space-y-2 text-[#757575]">
            <li>Access and review your personal information</li>
            <li>Correct inaccurate information</li>
            <li>Delete your personal information</li>
            <li>Withdraw consent for marketing communications</li>
            <li>Data portability</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Children&apos;s Privacy</h2>
          <p className="text-[#757575] leading-relaxed">
            Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Changes to This Policy</h2>
          <p className="text-[#757575] leading-relaxed">
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
          <p className="text-[#757575] leading-relaxed mb-4">
            If you have any questions about this Privacy Policy or our privacy practices, please contact us:
          </p>
          <div className="text-[#757575]">
            <p>Nike, Inc.</p>
            <p>Privacy Office</p>
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

export default PrivacyPolicyPage
