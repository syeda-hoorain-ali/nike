import { Skeleton } from "@/components/ui/skeleton"

const ProductPageSkeleton = () => {
  return (
    <main className="max-w-screen-xl mx-auto my-12 px-4 md:px-8 lg:px-12">
      <div className="grid gap-20 grid-cols-1 lg:grid-rows-1 lg:grid-cols-2">
        <Skeleton className="size-[550px]" />

        <div>
          <Skeleton className="h-8 md:h-9 lg:h-11 max-w-96 w-full" />
          <Skeleton className="h-8 md:h-9 lg:h-11 w-1/2 mt-1" />

          <div className="w-full flex flex-col gap-1 mt-4">
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-1/2 h-4" />
          </div>

          <Skeleton className="h-7 lg:h-9 w-40 my-6" />
          <Skeleton className="h-7 lg:h-9 w-40 my-6" />
        </div>
      </div>
    </main>
  )
}

export default ProductPageSkeleton
