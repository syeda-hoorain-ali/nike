import TrackingSamplePage from "@/components/tracking-sample-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Track Your Order (Sample)",
  description: "Enter your tracking number to see the status of your order.",
}

export default function Page() {
  return <TrackingSamplePage />;
}
