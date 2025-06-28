import React, { useState, ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/alert";
import { X } from "lucide-react";

// Types untuk button
interface ModalButton {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
}

// Props untuk ReusableModal
interface ReusableModalProps {
  title: string;
  children: ReactNode;
  trigger?: ReactNode;
  buttons?: ModalButton[];
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

// Reusable Modal Component
const ReusableModal: React.FC<ReusableModalProps> = ({
  title,
  children,
  trigger,
  buttons = [],
  open,
  onOpenChange,
  className = "",
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

      <DialogContent className={`max-w-2xl ${className}`}>
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <DialogTitle className="text-lg font-semibold text-gray-900">
            {title}
          </DialogTitle>
          <button
            onClick={() => handleOpenChange(false)}
            className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
            type="button"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        </DialogHeader>

        <div className="py-4">{children}</div>

        {buttons && buttons.length > 0 && (
          <DialogFooter className="flex justify-end gap-2 pt-4">
            {buttons.map((button, index) => (
              <button
                key={index}
                onClick={button.onClick}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  button.variant === "primary"
                    ? "bg-orange-500 text-white hover:bg-orange-600"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300"
                }`}
                disabled={button.disabled}
                type="button"
              >
                {button.label}
              </button>
            ))}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};
