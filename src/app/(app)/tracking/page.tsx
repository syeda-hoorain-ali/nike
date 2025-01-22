import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Page = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 my-20 px-8 max-w-lg mx-auto">
      <h1 className="text-3xl font-bold">Track your order</h1>
      <p className="text-center">Enter your tracking number below to follow your order&apos;s journey and get the latest updates on its delivery status</p>
      <div className="flex gap-4">
        <Input type="text" placeholder="Tracking Number" />
        <Button className="h-9 px-6 rounded-md">Track</Button>
      </div>
    </div>
  );
};

export default Page;