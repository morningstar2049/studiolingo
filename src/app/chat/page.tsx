import type { Metadata, Viewport } from 'next';
import { SignedIn, SignedOut } from '@clerk/nextjs';
import ChatInterface from '@/components/Chat/ChatInterface';
import ChatSignInGate from '@/components/Chat/ChatSignInGate';

export const metadata: Metadata = {
  // Kept short on purpose: iOS "Add to Home Screen" pre-fills the app name
  // from the page <title>, so this is what students see as the default name.
  title: 'Lingo Chat',
  description:
    'Practice your English with an AI native speaker. Chat, speak, and improve — powered by Studio Lingo.',
  // PWA: lets the chat install as a standalone "Lingo Chat" app.
  // Manifest (Android/Chrome) + Apple touch icon & title (iOS Safari/Chrome).
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    title: 'Lingo Chat',
    statusBarStyle: 'default',
  },
  icons: {
    icon: '/icons/icon-192.png',
    apple: '/icons/apple-touch-icon.png',
  },
  // Classic iOS standalone signal (older iPhones key off this exact name).
  other: {
    'apple-mobile-web-app-capable': 'yes',
  },
};

export const viewport: Viewport = {
  themeColor: '#293142',
};

export default function ChatPage() {
  return (
    <>
      <SignedIn>
        <ChatInterface />
      </SignedIn>
      <SignedOut>
        <ChatSignInGate />
      </SignedOut>
    </>
  );
}
