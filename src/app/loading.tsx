import Image from 'next/image'

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Image src="/loader.gif" alt="Nike" width={300} height={150} />
    </div>
  )
}

export default Loading
