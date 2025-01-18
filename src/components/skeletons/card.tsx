import { Skeleton } from "@/components/ui/skeleton"

const CardSkeleton = () => {
  return (
    <div className="max-w-[20.7rem]">
      <Skeleton className="size-[330px]" />

      <div className="flex flex-col gap-1 mt-4">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-[calc(100%-1rem)]" />
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-4 w-16" />
      </div>

      <Skeleton className="h-6 w-32 my-4" />
    </div>
  )
}

export default CardSkeleton
