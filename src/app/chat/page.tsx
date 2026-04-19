import type { Metadata } from 'next';
import ChatInterface from '@/components/Chat/ChatInterface';

export const metadata: Metadata = {
  title: 'English Practice Chat | Studio Lingo',
  description:
    'Practice your English with an AI native speaker. Chat, speak, and improve — powered by Studio Lingo.',
};

export default function ChatPage() {
  return <ChatInterface />;
}
