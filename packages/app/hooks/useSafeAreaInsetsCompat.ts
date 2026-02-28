import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Native version - uses real safe area insets
export function useSafeAreaInsetsCompat() {
  return useSafeAreaInsets();
}
