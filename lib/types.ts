import { z } from 'zod';
import type { webSearchTool, createFileQuerySearchTool } from '@/lib/tools';

import type { InferUITool, UIMessage } from 'ai';
import type { SpecDataPart } from '@json-render/core';

export type DataPart = { type: 'append-message'; message: string };
export type DataQueryCompletionPart = {
  type: 'data-query_completion';
  data: {
    query: string;
    index: number;
    total: number;
    status: 'started' | 'completed' | 'error';
    resultsCount: number;
    imagesCount: number;
  };
};

export type DataExtremeSearchPart = {
  type: 'data-extreme_search';
  data:
    | {
        kind: 'plan';
        status: { title: string };
        plan?: Array<{ title: string; todos: string[] }>;
      }
    | {
        kind: 'query';
        queryId: string;
        query: string;
        index: number;
        total: number;
        status: 'started' | 'reading_content' | 'completed' | 'error';
      }
    | {
        kind: 'source';
        queryId: string;
        source: { title: string; url: string; favicon?: string };
      }
    | {
        kind: 'content';
        queryId: string;
        content: { title: string; url: string; text: string; favicon?: string };
      }
    | {
        kind: 'thinking';
        thinkingId: string;
        thought: string;
        nextStep?: string;
      }
    | {
        kind: 'code';
        codeId: string;
        title: string;
        code: string;
        status: 'running' | 'completed' | 'error';
        result?: string;
        charts?: any[];
      }
    | {
        kind: 'x_search';
        xSearchId: string;
        query: string;
        index: number;
        total: number;
        startDate: string;
        endDate: string;
        handles?: string[];
        status: 'started' | 'completed' | 'error';
        result?: {
          content: string;
          citations: any[];
          sources: Array<{ text: string; link: string; title?: string }>;
          dateRange: string;
          handles: string[];
        };
      }
    | {
        kind: 'file_query';
        fileQueryId: string;
        query: string;
        index: number;
        total: number;
        status: 'started' | 'completed' | 'error';
        results?: Array<{
          fileName: string;
          content: string;
          score: number;
        }>;
      }
    | {
        kind: 'browse_page';
        browseId: string;
        urls: string[];
        index: number;
        total: number;
        status: 'started' | 'browsing' | 'completed' | 'error';
        results?: Array<{
          url: string;
          title: string;
          content: string;
          favicon?: string;
          error?: string;
        }>;
      }
    | {
        kind: 'done';
        summary: string;
      };
};

export const messageMetadataSchema = z.object({
  createdAt: z.string(),
  model: z.string(),
  multiAgentMode: z.boolean().optional(),
  completionTime: z.number().nullable(),
  inputTokens: z.number().nullable(),
  outputTokens: z.number().nullable(),
  totalTokens: z.number().nullable(),
});

export type MessageMetadata = z.infer<typeof messageMetadataSchema>;

type webSearch = InferUITool<ReturnType<typeof webSearchTool>>;
type fileQuerySearchTool = InferUITool<ReturnType<typeof createFileQuerySearchTool>>;

export type ChatTools = {
  web_search: webSearch;
  file_query_search: fileQuerySearchTool;
};

export type AgentStreamEvent =
  | { type: 'text_delta'; text: string }
  | { type: 'tool_call'; toolName: string; input: Record<string, unknown> }
  | { type: 'finish'; usage: { inputTokens: number; outputTokens: number } };

export type DataBuildSearchPart = {
  type: 'data-build_search';
  data:
    | {
        kind: 'exec';
        execId: string;
        command: string;
        status: 'running' | 'completed' | 'error';
        stdout?: string;
        stderr?: string;
        exitCode?: number;
      }
    | {
        kind: 'write';
        writeId: string;
        path: string;
        contentPreview: string;
        status: 'completed';
      }
    | {
        kind: 'read';
        readId: string;
        path: string;
        content: string;
        status: 'completed';
      }
    | {
        kind: 'list';
        listId: string;
        path: string;
        files: Array<{ name: string; isDir: boolean; size?: number }>;
        status: 'completed';
      }
    | {
        kind: 'download';
        downloadId: string;
        path: string;
        url: string;
        filename: string;
        status: 'completed';
      }
    | {
        kind: 'preview';
        previewId: string;
        port: number;
        url: string;
        status: 'completed';
        token?: string;
        username?: string;
        password?: string;
      }
    | {
        kind: 'agent';
        agentId: string;
        prompt: string;
        status: 'running' | 'streaming' | 'completed' | 'error';
        event?: AgentStreamEvent;
        result?: string;
        cost?: { inputTokens: number; outputTokens: number; totalUsd?: number; computeMs?: number };
      }
    | {
        kind: 'code';
        codeId: string;
        code: string;
        lang: string;
        status: 'running' | 'completed' | 'error';
        result?: string;
        exitCode?: number;
      }
    | {
        kind: 'search_query';
        searchId: string;
        queryId: string;
        query: string;
        index: number;
        total: number;
        status: 'started' | 'reading_content' | 'completed' | 'error';
        actionTitle?: string;
      }
    | {
        kind: 'search_source';
        searchId: string;
        queryId: string;
        source: { title: string; url: string; favicon?: string };
      }
    | {
        kind: 'search_content';
        searchId: string;
        queryId: string;
        content: { title: string; url: string; text: string; favicon?: string };
      };
};

export type DataPredictionResultsPart = {
  type: 'data-prediction_results';
  data: {
    query: string;
    markets: Array<{
      id: string;
      title: string;
      description: string;
      url: string;
      source: 'Polymarket' | 'Kalshi';
      category: string | null;
      totalVolume: number;
      totalLiquidity?: number;
      totalOpenInterest?: number;
      endDate: string | null;
      markets: Array<{
        id: string;
        title: string;
        outcomes: Array<{
          name: string;
          probability: number;
          price: number;
        }>;
        volume: number;
        volume24h: number;
        liquidity?: number;
        openInterest?: number;
        endDate: string;
        active: boolean;
        closed: boolean;
      }>;
      relevanceScore: number;
    }>;
    totalResults: number;
    sources: {
      web: number;
      proprietary: number;
    };
  };
};

export type CustomUIDataTypes = {
  appendMessage: string;
  id: string;
  'message-annotations': any;
  query_completion: {
    query: string;
    index: number;
    total: number;
    status: 'started' | 'completed' | 'error';
    resultsCount: number;
    imagesCount: number;
  };
  auto_routed_model: { model: string; route: string };
  extreme_search: DataExtremeSearchPart['data'];
  prediction_results: DataPredictionResultsPart['data'];
  chat_title: { title: string };
  spec: SpecDataPart;
  mcp_elicitation: {
    elicitationId: string;
    serverName: string;
    message: string;
    mode: 'form' | 'url';
    requestedSchema?: unknown;
    url?: string;
  };
  mcp_elicitation_done: { elicitationId: string };
  build_search: DataBuildSearchPart['data'];
};

export type ChatMessage = UIMessage<MessageMetadata, CustomUIDataTypes, ChatTools>;

export interface Attachment {
  name: string;
  url: string;
  contentType?: string;
  mediaType?: string;
}
