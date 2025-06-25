import Image from 'next/image'

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-[#fafafa]">
      <Image
        src="/loader.gif"
        alt="Nike"
        priority
        width="300"
        height="150"
        unoptimized
        style={{ height: "auto" }}
      />
    </div>
  )
}

export default Loading
