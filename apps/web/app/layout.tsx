import type { Metadata } from 'next';
import { NextTamaguiProvider } from '@mezon-tutors/app/provider/NextTamaguiProvider';

export const metadata: Metadata = {
  title: 'Mezon tutors',
  icons: '/favicon.ico',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body style={{ margin: 0, backgroundColor: '#f9fafb' }}>
        <style
          dangerouslySetInnerHTML={{
            __html: `
          ::-webkit-scrollbar {
            display: none;
          }
          * {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `,
          }}
        />
        <NextTamaguiProvider>
          <main
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              backgroundColor: 'black',
            }}
          >
            {children}
          </main>
        </NextTamaguiProvider>
      </body>
    </html>
  );
}
