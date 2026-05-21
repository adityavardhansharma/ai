export type SubscriptionDetails = {
  id: string;
  productId: string;
  status: string;
  amount: number;
  currency: string;
  recurringInterval: string;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
  canceledAt: Date | null;
  organizationId: string | null;
};

export type SubscriptionDetailsResult = {
  hasSubscription: boolean;
  subscription?: SubscriptionDetails;
  error?: string;
  errorType?: 'CANCELED' | 'EXPIRED' | 'GENERAL';
};

// Billing is intentionally disabled for personal/family self-hosted mode.
export async function getSubscriptionDetails(): Promise<SubscriptionDetailsResult> {
  return { hasSubscription: false };
}

// Always permit premium access features in self-host mode.
export async function isUserSubscribed(): Promise<boolean> {
  return true;
}

export async function isUserProCached(): Promise<boolean> {
  return true;
}

export async function hasAccessToProduct(_productId: string): Promise<boolean> {
  return true;
}

export async function getUserSubscriptionStatus(): Promise<'active' | 'canceled' | 'expired' | 'none'> {
  return 'active';
}

export async function getDodoSubscriptionExpirationDate(): Promise<Date | null> {
  return null;
}

export async function getProStatusWithSource(): Promise<{
  isProUser: boolean;
  source: 'polar' | 'dodo' | 'none';
  expiresAt?: Date;
}> {
  return { isProUser: true, source: 'none' };
}
