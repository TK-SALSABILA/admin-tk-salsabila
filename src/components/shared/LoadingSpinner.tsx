import { Loader } from 'lucide-react'
import React from 'react'

const LoadingSpinner = () => {
  return (
    <div className='flex items-center justify-center'>
      <Loader className='animate-spin h-[20px] w-[20px] text-yellow-400'/>
    </div>
  )
}

export default LoadingSpinner
