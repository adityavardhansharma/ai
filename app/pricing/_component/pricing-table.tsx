'use client';

import Link from 'next/link';

export default function PricingTable(_props: any) {
  return (
    <div className="mx-auto max-w-3xl p-6">
      <h1 className="text-3xl font-semibold">Pricing Removed</h1>
      <p className="mt-4 text-muted-foreground">
        Billing, subscriptions, and plan upgrades have been removed from this deployment.
      </p>
      <div className="mt-6">
        <Link href="/" className="underline">Return home</Link>
      </div>
    </div>
  );
}
