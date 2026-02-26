import { defaultConfig } from '@tamagui/config/v4';
import { createTamagui } from 'tamagui';
import { bodyFont, headingFont } from './fonts';
import { animations } from './animations';

const shorthands = {
  ai: 'alignItems',
  jc: 'justifyContent',
  f: 'flex',
  w: 'width',
  h: 'height',
  p: 'padding',
  px: 'paddingHorizontal',
  py: 'paddingVertical',
  pt: 'paddingTop',
  pb: 'paddingBottom',
  pl: 'paddingLeft',
  pr: 'paddingRight',
  m: 'margin',
  mx: 'marginHorizontal',
  my: 'marginVertical',
  mt: 'marginTop',
  mb: 'marginBottom',
  ml: 'marginLeft',
  mr: 'marginRight',
  bg: 'backgroundColor',
  bc: 'backgroundColor',
  zi: 'zIndex',
  br: 'borderRadius',
  bw: 'borderWidth',
  bs: 'borderStyle',
  ov: 'overflow',
} as const;

export const config = createTamagui({
  ...defaultConfig,
  shorthands,
  animations,
  fonts: {
    body: bodyFont,
    heading: headingFont,
  },
  // Extend tokens with global brand design tokens.
  tokens: {
    ...defaultConfig.tokens,
    color: {
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      ...(defaultConfig.tokens as any).color,
      // Global page background (≈ Tailwind gray-50)
      appBackground: '#f9fafb',
      // Primary brand color (#4d49fc)
      appPrimary: '#4d49fc',
      // Secondary brand accent
      appSecondary: '#6366f1',
      // Primary text color used in designs (#272a3c)
      appText: '#272a3c',
      // Subtle gray border for inputs and secondary buttons
      appBorderSubtle: 'rgba(39,42,60,0.08)',
      // Strong border / outline
      appBorderEmphasis: '#4d49fc',
      // Success states
      appSuccess: '#13e17a',
      appSuccessBackground: '#f0fdf4',
      // Neutral subtle backgrounds
      appPillBackground: '#f3f4f5',
      // Selection states
      appSelectedBackground: '#F1F1FF',
      appUnselectedBackground: '#F4F5F7',
      // Transparent helpers
      appWhiteSubtle: 'rgba(255,255,255,0.7)',
      appShadow: 'rgba(0,0,0,0.06)',
      appIconSubtle: 'rgba(39,42,60,0.5)',
    },
    radius: {
      ...defaultConfig.tokens.radius,
      appCard: 24,
      appPill: 999,
    },
  },
  media: {
    xs: { maxWidth: 660 },
    sm: { maxWidth: 800 },
    md: { maxWidth: 1020 },
    lg: { maxWidth: 1280 },
    xl: { maxWidth: 1420 },
    xxl: { maxWidth: 1600 },
    gtXs: { minWidth: 660 + 1 },
    gtSm: { minWidth: 800 + 1 },
    gtMd: { minWidth: 1020 + 1 },
    gtLg: { minWidth: 1280 + 1 },
    short: { maxHeight: 820 },
    tall: { minHeight: 820 },
    hoverNone: { hover: 'none' },
    pointerCoarse: { pointer: 'coarse' },
  },
  settings: {
    ...defaultConfig.settings,
    onlyAllowShorthands: false,
  },
});
