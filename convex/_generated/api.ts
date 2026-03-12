/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import { anyApi } from "convex/server";
import type { FunctionReference } from "convex/server";

// Typed API references for each module
type API = {
  tasks: {
    list: FunctionReference<"query", "public", Record<string, never>, any>;
    create: FunctionReference<"mutation", "public", { title: string; description: string; status: "queued" | "in_progress" | "done" }, any>;
    update: FunctionReference<"mutation", "public", { id: any; title?: string; description?: string; status?: "queued" | "in_progress" | "done" }, any>;
  };
  activityLog: {
    list: FunctionReference<"query", "public", Record<string, never>, any>;
    log: FunctionReference<"mutation", "public", { type: string; message: string; metadata?: any }, any>;
  };
  projects: {
    list: FunctionReference<"query", "public", Record<string, never>, any>;
    create: FunctionReference<"mutation", "public", { name: string; description: string; status: string; repoUrl?: string }, any>;
    update: FunctionReference<"mutation", "public", { id: any; name?: string; description?: string; status?: string; repoUrl?: string }, any>;
  };
  messages: {
    list: FunctionReference<"query", "public", Record<string, never>, any>;
    send: FunctionReference<"mutation", "public", { direction: "inbound" | "outbound"; content: string }, any>;
  };
};

export const api: API = anyApi as any;
export const internal = anyApi as any;
