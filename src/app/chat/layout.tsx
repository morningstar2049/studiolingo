import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'English Practice Chat | Studio Lingo',
  description:
    'Practice your English with an AI native speaker. Chat, speak, and improve — powered by Studio Lingo.',
};

// Metadata-only layout so chat/page.tsx can be a 'use client' component
// (matching the buy-course auth pattern with useAuth()). No visual wrapper.
export default function ChatLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
