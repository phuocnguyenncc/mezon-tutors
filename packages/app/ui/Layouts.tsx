import { YStack, styled, GetProps } from 'tamagui';

/**
 * Screen is the outermost container for every page.
 * It ensures the page fills the available space.
 */
export const Screen = styled(YStack, {
  name: 'Screen',
  flex: 1,
  backgroundColor: '$background',
  position: 'relative',
});

/**
 * Container is the standard content wrapper that ensures:
 * 1. Content is centered on large screens (web).
 * 2. Width is constrained for optimal readability.
 * 3. Consistent horizontal padding.
 */
export const Container = styled(YStack, {
  name: 'Container',
  width: '100%',
  marginHorizontal: 'auto',
  flex: 1,

  variants: {
    // Standard paddings based on design tokens
    padded: {
      true: {
        paddingHorizontal: '$5',
      },
    },
    // Useful for screens that need to center content vertically (like Auth)
    centered: {
      true: {
        justifyContent: 'center',
        alignItems: 'center',
      },
    },
  } as const,

  defaultVariants: {
    padded: true,
  },
});

export type ScreenProps = GetProps<typeof Screen>;
export type ContainerProps = GetProps<typeof Container>;
