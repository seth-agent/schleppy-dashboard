/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Generated utilities for implementing server-side Convex query and mutation functions.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import {
  queryGeneric,
  mutationGeneric,
  actionGeneric,
  internalQueryGeneric,
  internalMutationGeneric,
  internalActionGeneric,
  GenericQueryCtx,
  GenericMutationCtx,
  GenericActionCtx,
} from "convex/server";
import type { DataModel } from "./dataModel.js";

export const query: typeof queryGeneric = queryGeneric;
export const mutation: typeof mutationGeneric = mutationGeneric;
export const action: typeof actionGeneric = actionGeneric;
export const internalQuery: typeof internalQueryGeneric = internalQueryGeneric;
export const internalMutation: typeof internalMutationGeneric = internalMutationGeneric;
export const internalAction: typeof internalActionGeneric = internalActionGeneric;

export type QueryCtx = GenericQueryCtx<DataModel>;
export type MutationCtx = GenericMutationCtx<DataModel>;
export type ActionCtx = GenericActionCtx<DataModel>;
