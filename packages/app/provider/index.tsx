import { useColorScheme } from 'react-native';
import {
  TamaguiProvider,
  type TamaguiProviderProps,
  ToastProvider,
  isWeb,
} from '@mezon-tutors/app/ui';
import { ToastViewport } from './ToastViewport';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { config } from '../config';

export function Provider({
  children,
  defaultTheme = 'dark',
  ...rest
}: Omit<TamaguiProviderProps, 'config'> & { defaultTheme?: string }) {
  const colorScheme = useColorScheme();
  const theme = defaultTheme || (colorScheme === 'dark' ? 'dark' : 'light');
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <TamaguiProvider
        config={config}
        defaultTheme={theme}
        {...rest}
      >
        <ToastProvider
          swipeDirection="horizontal"
          duration={6000}
          native={isWeb ? [] : ['mobile']}
        >
          <ToastViewport />
        </ToastProvider>
      </TamaguiProvider>
    </QueryClientProvider>
  );
}
