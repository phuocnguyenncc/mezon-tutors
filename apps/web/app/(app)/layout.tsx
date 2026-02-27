'use client';

import { YStack } from 'tamagui';

/**
 * Root protected layout.
 * Ensures AuthGuard is applied to all screens in (app).
 */
export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <YStack
      flex={1}
      height="100vh"
      maxHeight="100vh"
      position="relative"
      backgroundColor="$background"
      overflow="hidden"
    >
      {/* Content area */}
      <YStack
        flex={1}
        width="100%"
        height="100%"
        overflow="hidden"
      >
        {children}
      </YStack>
    </YStack>
  );
}
