import type { AddressInfo } from 'node:net';
import { createWebLocalServer, type WebLocalService } from './http.mjs';
import { listProjects } from '../projects.js';

let current: WebLocalService | null = null;
let opening: Promise<WebLocalService> | null = null;
let handingOff = false;
let shuttingDown = false;

/** CoS's existing owners provide the only data exposed in this first slice. */
async function readLocalView() {
  const projects = await listProjects();
  return {
    projects: projects.filter(project => !project.ungrouped).slice(0, 200).map(project => ({ name: project.name }))
  };
}

async function startOnce(): Promise<WebLocalService> {
  if (shuttingDown) throw new Error('local_web_shutting_down');
  const service = createWebLocalServer({ read: readLocalView });
  try {
    await new Promise<void>((resolve, reject) => {
      service.server.once('error', reject);
      service.server.listen(0, '127.0.0.1', () => {
        service.server.off('error', reject);
        resolve();
      });
    });
    if (shuttingDown) {
      await service.stop();
      throw new Error('local_web_shutting_down');
    }
    current = service;
    return service;
  } catch (error) {
    await service.stop().catch(() => undefined);
    throw error;
  }
}

/** A native, owner-checked Desktop gesture alone opens one browser activation. */
export async function openWebLocal(openExternal: (url: string) => Promise<unknown>): Promise<boolean> {
  if (shuttingDown) throw new Error('local_web_shutting_down');
  if (handingOff) throw new Error('local_web_busy');
  handingOff = true;
  try {
    if (!current) {
      if (!opening) opening = startOnce().finally(() => { opening = null; });
      await opening;
    }
    const service = current;
    if (!service || shuttingDown) throw new Error('local_web_unavailable');
    const address = service.server.address() as AddressInfo | null;
    if (!address || address.address !== '127.0.0.1') throw new Error('local_web_wrong_listener');
    const activation = service.issueActivation();
    try {
      await openExternal('http://127.0.0.1:' + address.port + activation);
    } catch (error) {
      service.revokeActivation(activation);
      throw error;
    }
    if (shuttingDown || service !== current) throw new Error('local_web_shutting_down');
    return true;
  } finally {
    handingOff = false;
  }
}

/** Terminal admission fence: app shutdown revokes all tickets and cookies. */
export async function shutdownWebLocal(): Promise<void> {
  shuttingDown = true;
  if (opening) await opening.catch(() => undefined);
  const service = current;
  current = null;
  if (service) await service.stop();
}
