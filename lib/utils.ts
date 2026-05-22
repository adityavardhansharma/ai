// /lib/utils.ts
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import {
  GlobalSearchIcon,
} from '@hugeicons/core-free-icons';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function normalizeError(err: unknown): string {
  const msg = err instanceof Error ? err.message : String(err ?? '');
  if (/websocket|ws connection|connection (closed|failed|lost)|1006|1011|1012/i.test(msg))
    return 'Connection lost. Please check your internet and try again.';
  if (/oauth|authoriz|token|forbidden|403/i.test(msg))
    return 'Authorization failed. The app may have rejected the request.';
  if (/timeout|timed? ?out/i.test(msg)) return 'This took too long. Please try again.';
  if (/network|fetch failed|ECONNREFUSED|ENOTFOUND/i.test(msg))
    return 'Could not connect. Please check your internet and try again.';
  return 'Something went wrong. Please try again.';
}

export type SearchGroupId = 'web';

// Search provider information for dynamic descriptions
export const searchProviderInfo = {
  exa: 'Exa, one of the best web search APIs for AI',
  firecrawl: 'Firecrawl',
} as const;

export type SearchProvider = keyof typeof searchProviderInfo;

// Function to get dynamic web search description based on selected provider
export function getWebSearchDescription(provider: SearchProvider = 'exa'): string {
  const providerName = searchProviderInfo[provider];
  return `Search across the entire internet powered by ${providerName}`;
}

// Function to get search groups with dynamic descriptions
export function getSearchGroups(searchProvider: SearchProvider = 'exa') {
  return [
    {
      id: 'web' as const,
      name: 'Web',
      description: getWebSearchDescription(searchProvider),
      icon: GlobalSearchIcon,
      show: true,
    },
  ] as const;
}

// Keep the static searchGroups for backward compatibility
export const searchGroups = getSearchGroups();

export type SearchGroup = (typeof searchGroups)[number];
