import 'server-only';
import { auth as clerkAuth, currentUser } from '@clerk/nextjs/server';

type SessionUser = {
  id: string;
  email?: string | null;
  name?: string | null;
};

type Session = {
  user: SessionUser;
} | null;

async function getSession(): Promise<Session> {
  const { userId } = await clerkAuth();
  if (!userId) return null;

  const user = await currentUser();
  return {
    user: {
      id: userId,
      email: user?.primaryEmailAddress?.emailAddress ?? null,
      name: user?.fullName ?? null,
    },
  };
}

export const auth = {
  api: {
    getSession,
  },
};

// Temporary billing stubs while migrating away from Better Auth billing plugins.
export const polarClient = null;
export const dodoPayments = null;
