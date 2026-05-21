'use client';

import { useAuth, useUser } from '@clerk/nextjs';

export const signIn = () => {
  window.location.href = '/sign-in';
};

export const signUp = () => {
  window.location.href = '/sign-up';
};

export const useSession = () => {
  const { isSignedIn, isLoaded } = useAuth();
  const { user } = useUser();

  return {
    data: isSignedIn
      ? {
          user: {
            id: user?.id,
            email: user?.primaryEmailAddress?.emailAddress,
            name: user?.fullName,
          },
        }
      : null,
    isPending: !isLoaded,
  };
};

export const signOut = async () => {
  const { signOut } = await import('@clerk/nextjs');
  await signOut();
};
