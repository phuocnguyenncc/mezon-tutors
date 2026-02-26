import { Dialog, XStack, AppButton } from '@mezon-tutors/app/ui';

export interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  confirmLabel: string;
  cancelLabel?: string;
  onConfirm: () => void | Promise<void>;
  /** When true, confirm button uses destructive (red) style */
  destructive?: boolean;
  /** When true, confirm button is disabled and shows loading */
  isLoading?: boolean;
}

/**
 * Reusable confirmation dialog for destructive or important actions.
 */
export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel,
  cancelLabel = 'Cancel',
  onConfirm,
  destructive = false,
  isLoading = false,
}: ConfirmDialogProps) {
  const handleConfirm = async () => {
    await onConfirm();
    onOpenChange(false);
  };

  return (
    <Dialog
      modal
      open={open}
      onOpenChange={onOpenChange}
    >
      <Dialog.Portal>
        <Dialog.Overlay
          key="overlay"
          animation="quick"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
          backgroundColor="black"
        />
        <Dialog.Content
          key="content"
          animation="quick"
          enterStyle={{ scale: 0.95, opacity: 0 }}
          exitStyle={{ scale: 0.95, opacity: 0 }}
          elevate
          borderRadius={16}
          padding="$4"
          maxWidth={360}
          backgroundColor="white"
        >
          <Dialog.Title
            fontSize={18}
            fontWeight="600"
            color="#121926"
          >
            {title}
          </Dialog.Title>
          <Dialog.Description
            fontSize={14}
            color="#697386"
            marginTop="$2"
            lineHeight={20}
          >
            {description}
          </Dialog.Description>
          <XStack
            gap="$3"
            marginTop="$4"
            justifyContent="flex-end"
          >
            <Dialog.Close asChild>
              <AppButton
                variant="secondary"
                onPress={() => onOpenChange(false)}
                disabled={isLoading}
              >
                {cancelLabel}
              </AppButton>
            </Dialog.Close>
            <AppButton
              variant="primary"
              backgroundColor={destructive ? '$red10' : undefined}
              borderColor={destructive ? '$red10' : undefined}
              hoverStyle={{
                backgroundColor: destructive ? '$red10' : '$appPrimary',
                borderColor: destructive ? '$red10' : '$appPrimary',
              }}
              pressStyle={{
                backgroundColor: destructive ? '$red10' : '$appPrimary',
                borderColor: destructive ? '$red10' : '$appPrimary',
              }}
              onPress={handleConfirm}
              disabled={isLoading}
            >
              {isLoading ? '…' : confirmLabel}
            </AppButton>
          </XStack>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
}
