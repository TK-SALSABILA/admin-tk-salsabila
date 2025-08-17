import { Loader } from 'lucide-react'
import React from 'react'

const LoadingSpinner = () => {
  return (
    <div className='flex items-center justify-center'>
      <Loader className='animate-spin h-[30px] w-[30px] text-yellow-400'/>
    </div>
  )
}

export default LoadingSpinner
