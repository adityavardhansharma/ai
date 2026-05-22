import 'server-only';

import type { SearchProvider } from '@/lib/utils';


interface LoadConfiguredToolsParams {
  activeToolNames: string[];
  dataStream: any;
  searchProvider: SearchProvider | undefined;
  contextFiles: Array<{ url: string; contentType: string; name?: string }>;
}

export async function loadConfiguredTools({
  activeToolNames,
  dataStream,
  searchProvider,
  contextFiles,
}: LoadConfiguredToolsParams): Promise<Record<string, any>> {
  const tools: Record<string, any> = {};
  const WEB_ONLY_TOOL_ALLOWLIST = new Set(['web_search', 'file_query_search']);
  const uniqueToolNames = [...new Set(activeToolNames)].filter((toolName) => WEB_ONLY_TOOL_ALLOWLIST.has(toolName));

  await Promise.all(
    uniqueToolNames.map(async (toolName) => {
      switch (toolName) {
        case 'web_search': {
          const { webSearchTool } = await import('@/lib/tools/web-search');
          tools.web_search = webSearchTool(dataStream, searchProvider);
          return;
        }
        case 'file_query_search': {
          if (contextFiles.length === 0) return;
          const { createFileQuerySearchTool } = await import('@/lib/tools/file-query-search');
          tools.file_query_search = createFileQuerySearchTool(contextFiles, dataStream);
          return;
        }
        default:
          return;
      }
    }),
  );

  return tools;
}
