'use client';

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
 * Sign-in gate shown on /chat for logged-out visitors.
 *
 * Uses plain <a> links to the existing /sign-in and /sign-up Clerk pages
 * with redirect_url=/chat so the user lands back on /chat after auth.
 * The Clerk modal pattern (SignInButton mode="modal" / useClerk) was
 * silently failing in this codebase — plain navigation is the most
 * reliable fallback. Visually still the green "Option A" card.
 */
export default function ChatSignInGate() {
  const signInUrl = `/sign-in?redirect_url=${encodeURIComponent('/chat')}`;
  const signUpUrl = `/sign-up?redirect_url=${encodeURIComponent('/chat')}`;

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

        <a
          href={signInUrl}
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
            textDecoration: 'none',
            boxSizing: 'border-box',
          }}
        >
          Sign in
        </a>

        <a
          href={signUpUrl}
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
            textDecoration: 'none',
            boxSizing: 'border-box',
          }}
        >
          Create account
        </a>

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
