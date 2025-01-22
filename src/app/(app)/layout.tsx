import Headline from "@/components/layout/headline"
import Navbar from "@/components/layout/navbar"
import { PropsWithChildren } from "react"

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <main className="min-h-screen">
      <Headline />
      <Navbar />
      {children}
    </main>
  )
}

export default Layout
