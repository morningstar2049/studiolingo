'use client';

import { SignInButton, SignUpButton } from '@clerk/nextjs';
import { Button as MuiButton } from '@mui/material';

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
 * Uses the same modal pattern as the working buy-course page:
 * <SignInButton mode="modal" forceRedirectUrl> wrapping an MUI Button.
 * Earlier attempts wrapped a plain <button> and Clerk's cloneElement
 * onClick wiring silently failed; MUI Button forwards the cloned
 * onClick correctly which is why buy-course works.
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

        <SignInButton mode="modal" forceRedirectUrl={'/chat'}>
          <MuiButton
            variant="contained"
            fullWidth
            sx={{
              background: `linear-gradient(135deg, ${C.green} 0%, ${C.greenDark} 100%)`,
              color: C.white,
              fontWeight: 600,
              fontSize: '14.5px',
              borderRadius: '12px',
              padding: '10px 14px',
              textTransform: 'none',
              boxShadow: '0 3px 10px rgba(47,158,77,0.35)',
              marginBottom: '10px',
              '&:hover': {
                background: `linear-gradient(135deg, ${C.greenDark} 0%, ${C.greenDark} 100%)`,
                boxShadow: '0 4px 14px rgba(47,158,77,0.45)',
              },
            }}
          >
            Sign in
          </MuiButton>
        </SignInButton>

        <SignUpButton mode="modal" forceRedirectUrl={'/chat'}>
          <MuiButton
            variant="outlined"
            fullWidth
            sx={{
              borderColor: C.border,
              borderWidth: '1.5px',
              color: C.textPrimary,
              fontWeight: 600,
              fontSize: '14.5px',
              borderRadius: '12px',
              padding: '10px 14px',
              textTransform: 'none',
              background: C.white,
              '&:hover': {
                borderColor: C.green,
                borderWidth: '1.5px',
                background: C.white,
              },
            }}
          >
            Create account
          </MuiButton>
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
