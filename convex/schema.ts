import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  tasks: defineTable({
    title: v.string(),
    description: v.string(),
    status: v.union(
      v.literal("queued"),
      v.literal("in_progress"),
      v.literal("done")
    ),
    createdAt: v.number(),
    updatedAt: v.number(),
  }),

  activityLog: defineTable({
    type: v.string(),
    message: v.string(),
    metadata: v.optional(v.any()),
    createdAt: v.number(),
  }).index("by_createdAt", ["createdAt"]),

  projects: defineTable({
    name: v.string(),
    description: v.string(),
    status: v.string(),
    repoUrl: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  }),

  sessions: defineTable({
    startedAt: v.number(),
    endedAt: v.optional(v.number()),
    summary: v.optional(v.string()),
  }).index("by_startedAt", ["startedAt"]),

  messages: defineTable({
    direction: v.union(v.literal("inbound"), v.literal("outbound")),
    content: v.string(),
    createdAt: v.number(),
  }).index("by_createdAt", ["createdAt"]),
});
