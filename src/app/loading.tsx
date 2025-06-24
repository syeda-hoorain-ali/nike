import Image from 'next/image'

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-[#fafafa]">
      <Image src="/loader.gif" alt="Nike" width={300} height={150} unoptimized />
    </div>
  )
}

export default Loading
