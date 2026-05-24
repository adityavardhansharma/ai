'use client';

import { useAuth, useUser } from '@clerk/nextjs';

const notAvailable = async () => ({ data: null, error: { message: 'Legacy billing client removed after Clerk migration' } });

export const legacyBillingClient: any = {
  dodopayments: {
    checkoutSession: notAvailable,
    customer: {
      portal: async () => null,
      subscriptions: { list: async () => ({ data: [], error: null }) },
    },
  },
};

export const authClient: any = {
  getLastUsedLoginMethod: () => ({ data: null }),
  customer: {
    portal: async () => null,
    orders: { list: async () => ({ data: [], error: null }) },
  },
};

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
  window.location.href = '/';
};
