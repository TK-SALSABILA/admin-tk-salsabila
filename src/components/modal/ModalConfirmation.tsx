import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ReactNode, useState } from "react";

interface ConfirmModalProps {
  // Trigger element
  trigger: ReactNode;

  // Modal content
  title?: string;
  description?: string;

  // Button texts
  cancelText?: string;
  confirmText?: string;

  // Button variants & colors
  confirmVariant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";

  // Actions
  onConfirm: () => Promise<void> | void;
  onCancel?: () => void;

  // Control modal dari luar (optional)
  open?: boolean;
  onOpenChange?: (open: boolean) => void;

  // Loading state
  disabled?: boolean;
}

const ConfirmModal = ({
  trigger,
  title = "Apakah Anda yakin?",
  description = "Tindakan ini tidak dapat dibatalkan.",
  cancelText = "Batal",
  confirmText = "Lanjutkan",
  confirmVariant = "default",
  onConfirm,
  onCancel,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
  disabled = false,
}: ConfirmModalProps) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Use controlled or internal state
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setOpen = controlledOnOpenChange || setInternalOpen;

  const handleConfirm = async () => {
    try {
      setIsLoading(true);
      await onConfirm();
      setOpen(false);
    } catch (error) {
      console.error("Confirm action failed:", error);
      // Don't close modal on error, let user try again
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    onCancel?.();
    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild disabled={disabled}>
        {trigger}
      </AlertDialogTrigger>
      <AlertDialogContent className="dark:bg-neutral-900">
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={handleConfirm}
            // variant={confirmVariant}
            disabled={isLoading}
          >
            {isLoading ? "Memproses..." : confirmText}
          </AlertDialogAction>
          <AlertDialogCancel onClick={handleCancel} disabled={isLoading}>
            {cancelText}
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmModal;
