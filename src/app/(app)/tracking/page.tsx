import TrackingPage from "@/components/tracking-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Track Your Order",
  description: "Enter your tracking number to see the status of your order.",
}

export default function Page() {
  return <TrackingPage />;
}
