'use client';

import { YStack } from 'tamagui';

/**
 * Layout for the main navigation group (Home, Friends, etc.)
 * This is where the Bottom Tab Bar lives.
 */
export default function MainGroupLayout({ children }: { children: React.ReactNode }) {
  return (
    <YStack
      flex={1}
      position="relative"
    >
      <YStack flex={1}>{children}</YStack>
    </YStack>
  );
}
