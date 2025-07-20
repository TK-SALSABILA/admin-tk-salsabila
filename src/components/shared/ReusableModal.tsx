import React, { useState, ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { X } from "lucide-react";

interface ReusableModalProps {
  title: string;
  children: ReactNode;
  trigger?: ReactNode;
  description?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

// Reusable Modal Component
const ReusableModal: React.FC<ReusableModalProps> = ({
  title,
  children,
  trigger,
  open,
  onOpenChange,
  className = "",
  description,
  ...props
}) => {
  const [internalOpen, setInternalOpen] = useState<boolean>(false);

  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;
  const setIsOpen = isControlled ? onOpenChange : setInternalOpen;

  const handleOpenChange = (newOpen: boolean) => {
    if (setIsOpen) {
      setIsOpen(newOpen);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange} {...props}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}

      <DialogContent
        showCloseButton={false}
        className={`max-w-4xl w-full ${className}`}
      >
        <DialogHeader className="flex flex-row justify-between space-y-0">
          <div className="">
            <DialogTitle className="text-lg font-semibold text-gray-900">
              {title}
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-500">
              {description}
            </DialogDescription>
          </div>
          <button
            onClick={() => handleOpenChange(false)}
            className="rounded-sm opacity-70 max-h-max ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
            type="button"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        </DialogHeader>

        <div className="">{children}</div>
      </DialogContent>
    </Dialog>
  );
};
export default ReusableModal;
