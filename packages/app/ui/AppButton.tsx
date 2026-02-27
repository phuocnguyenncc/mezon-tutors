import { Button as BaseButton, styled } from 'tamagui';

/**
 * Button is the standard button component for the entire app.
 * It enforces a pill shape, standard height, and removes hover opacity on web.
 */
export const AppButton = styled(BaseButton, {
  name: 'Button',
  borderRadius: '$appPill',
  height: 48,
  borderWidth: 1,
  borderColor: 'transparent',

  // Customizing default button look
  fontWeight: '500',
  fontSize: 14,
  letterSpacing: -0.32,

  // Hover and Press states
  pressStyle: {
    opacity: 0.8,
  },

  // Explicitly remove hover effect on web
  hoverStyle: {
    backgroundColor: 'unset',
    borderColor: 'unset',
    opacity: 1,
  },

  variants: {
    variant: {
      primary: {
        backgroundColor: '$appPrimary',
        color: 'white',
        borderColor: '$appPrimary',
        hoverStyle: {
          backgroundColor: '$appPrimary',
          borderColor: '$appPrimary',
        },
      },
      secondary: {
        backgroundColor: 'white',
        color: '$appText',
        borderColor: '$appBorderSubtle',
        hoverStyle: {
          backgroundColor: 'white',
          borderColor: '$appBorderSubtle',
        },
      },
      outline: {
        backgroundColor: 'transparent',
        color: 'white',
        borderColor: 'white',
        hoverStyle: {
          backgroundColor: 'transparent',
          borderColor: 'white',
        },
      },
      ghost: {
        backgroundColor: 'transparent',
        color: '$appText',
        borderColor: 'transparent',
        hoverStyle: {
          backgroundColor: '$appBackground',
          borderColor: 'transparent',
        },
      },
    },
  } as const,

  defaultVariants: {
    variant: 'ghost',
  },
});
