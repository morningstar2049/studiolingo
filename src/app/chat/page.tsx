import type { Metadata } from 'next';
import { SignedIn, SignedOut } from '@clerk/nextjs';
import ChatInterface from '@/components/Chat/ChatInterface';
import ChatSignInGate from '@/components/Chat/ChatSignInGate';

export const metadata: Metadata = {
  title: 'English Practice Chat | Studio Lingo',
  description:
    'Practice your English with an AI native speaker. Chat, speak, and improve — powered by Studio Lingo.',
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
