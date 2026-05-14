'use client';

import { useAuth } from '@clerk/nextjs';
import ChatInterface from '@/components/Chat/ChatInterface';
import ChatSignInGate from '@/components/Chat/ChatSignInGate';

// Client component using useAuth() — same pattern as buy-course/page.tsx,
// where the SignInButton modal is confirmed to work. The earlier
// SignedIn/SignedOut wrapper approach in a server component prevented the
// Clerk modal from initialising inside the gate's nested client component.
export default function ChatPage() {
  const { isSignedIn, isLoaded } = useAuth();

  // Render nothing until Clerk has determined the auth state — prevents
  // the gate from briefly flashing for already-signed-in users.
  if (!isLoaded) return null;

  if (!isSignedIn) return <ChatSignInGate />;

  return <ChatInterface />;
}
