import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("activityLog")
      .withIndex("by_createdAt")
      .order("desc")
      .take(50);
  },
});

export const log = mutation({
  args: {
    type: v.string(),
    message: v.string(),
    metadata: v.optional(v.any()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("activityLog", {
      type: args.type,
      message: args.message,
      metadata: args.metadata,
      createdAt: Date.now(),
    });
  },
});
