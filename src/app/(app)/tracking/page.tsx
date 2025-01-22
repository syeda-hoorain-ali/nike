import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Page = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1 className="text-xl font-bold">Tracking your order</h1>
      <p>Enter your tracking number below to follow your order's journey and get the latest updates on its delivery status</p>
      <div>
        <Input type="text" placeholder="Tracking Number" />
        <Button>Track</Button>
      </div>
    </div>
  );
};

export default Page;