import Headline from "@/components/layout/headline"
import Navbar from "@/components/layout/navbar"
import { PropsWithChildren } from "react"

const Layout = ({ children }: PropsWithChildren) => {
  return (<>
    <Headline />
    <Navbar />
    {children}
  </>)
}

export default Layout
