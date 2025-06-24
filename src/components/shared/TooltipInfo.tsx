import React from 'react'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { Info } from 'lucide-react';

const TooltipInfo = ({text}:{text:string}) => {
  return (
    <Tooltip>
      <TooltipTrigger>
        <Info className="w-4 h-4 text-muted-foreground" />
      </TooltipTrigger>
      <TooltipContent>
        <p>{text}</p>
      </TooltipContent>
    </Tooltip>
  );
}

export default TooltipInfo
