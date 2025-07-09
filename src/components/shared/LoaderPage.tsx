import Image from 'next/image'
import React from 'react'

const LoaderPage = () => {
  return (
    <div>
      <Image src="/loader.gift" alt="loader" width={100} height={100} />
    </div>
  )
}

export default LoaderPage
