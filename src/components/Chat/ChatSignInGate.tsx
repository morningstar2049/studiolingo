'use client';

import { SignInButton, SignUpButton } from '@clerk/nextjs';

// Brand tokens lifted from ChatInterface for visual consistency.
const C = {
  green: '#2f9e4d',
  greenDark: '#267a3d',
  white: '#ffffff',
  textPrimary: '#293142',
  textMuted: '#6b7280',
  border: 'rgba(41,49,66,0.1)',
} as const;

/**
 * Sign-in gate shown on /chat for logged-out visitors (Option A from the
 * preview). The chat API is independently protected by middleware, so this
 * is the visible UX layer — middleware is the security layer.
 *
 * Uses Clerk's SignInButton / SignUpButton in "modal" mode so visitors stay
 * on /chat the whole time and slide back into the chat setup screen as soon
 * as they authenticate.
 */
export default function ChatSignInGate() {
  return (
    <div
      style={{
        minHeight: 'calc(100dvh - 80px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 16px',
        background: 'linear-gradient(180deg,#f9fafb 0%,#ffffff 100%)',
        fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 360,
          background: C.white,
          borderRadius: 16,
          boxShadow:
            '0 8px 30px rgba(41,49,66,0.08), 0 0 0 1px rgba(41,49,66,0.05)',
          padding: '32px 24px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            width: 60,
            height: 60,
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${C.green}, ${C.greenDark})`,
            color: C.white,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 28,
            margin: '0 auto 16px',
            boxShadow: '0 4px 14px rgba(47,158,77,0.35)',
          }}
        >
          💬
        </div>
        <h2
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: C.textPrimary,
            margin: '0 0 8px',
            letterSpacing: '-0.01em',
          }}
        >
          Sign in to start chatting
        </h2>
        <p
          style={{
            fontSize: 13.5,
            color: C.textMuted,
            lineHeight: 1.5,
            margin: '0 0 22px',
          }}
        >
          Practice English with Alex. You&apos;ll need an account so we can
          track your daily progress.
        </p>

        {/* forceRedirectUrl is required for Clerk's modal mode in v6 — the
            same pattern the buy-course page uses. Without it the modal
            silently fails to open. */}
        <SignInButton mode="modal" forceRedirectUrl="/chat">
          <button
            type="button"
            style={{
              display: 'block',
              width: '100%',
              border: 'none',
              borderRadius: 12,
              padding: '12px 14px',
              fontSize: 14.5,
              fontWeight: 600,
              cursor: 'pointer',
              marginBottom: 10,
              background: `linear-gradient(135deg, ${C.green}, ${C.greenDark})`,
              color: C.white,
              boxShadow: '0 3px 10px rgba(47,158,77,0.35)',
              fontFamily: 'inherit',
              transition: 'transform 0.1s, box-shadow 0.15s',
            }}
          >
            Sign in
          </button>
        </SignInButton>

        <SignUpButton mode="modal" forceRedirectUrl="/chat">
          <button
            type="button"
            style={{
              display: 'block',
              width: '100%',
              borderRadius: 12,
              padding: '12px 14px',
              fontSize: 14.5,
              fontWeight: 600,
              cursor: 'pointer',
              background: C.white,
              color: C.textPrimary,
              border: `1.5px solid ${C.border}`,
              fontFamily: 'inherit',
              transition: 'border-color 0.15s',
            }}
          >
            Create account
          </button>
        </SignUpButton>

        <p
          style={{
            fontSize: 11.5,
            color: C.textMuted,
            margin: '16px 0 0',
          }}
        >
          15 free messages every 24 hours
        </p>
      </div>
    </div>
  );
}
