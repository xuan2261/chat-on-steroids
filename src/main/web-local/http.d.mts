import type http from 'node:http';
export interface WebLocalOwnerView {
  projects: Array<{ name: string }>;
}
export interface WebLocalService {
  server: http.Server;
  issueActivation(): string;
  revokeActivation(path: string): void;
  stop(): Promise<void>;
}
export function createWebLocalServer(options: {
  read(): Promise<WebLocalOwnerView>;
  now?: () => number;
  readDeadlineMs?: number;
  drainMs?: number;
}): WebLocalService;
