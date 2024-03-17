/**
 * By default, Remix will handle hydrating your app on the client for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.client
 */

import { RemixBrowser } from '@remix-run/react';
import { ReactNode, startTransition } from 'react';
import { hydrateRoot } from 'react-dom/client';

import createEmotionCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';

interface ClientCacheProviderProps {
  children: ReactNode;
}

function ClientCacheProvider({ children }: ClientCacheProviderProps) {
  const emotionCache = createEmotionCache({ key: 'css' });

  return <CacheProvider value={emotionCache}>{children}</CacheProvider>;
}

startTransition(() => {
  hydrateRoot(
    document,
    <ClientCacheProvider>
      <RemixBrowser />
    </ClientCacheProvider>
  );
});
