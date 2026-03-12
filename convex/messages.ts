import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("messages")
      .withIndex("by_createdAt")
      .order("desc")
      .take(100);
  },
});

export const send = mutation({
  args: {
    direction: v.union(v.literal("inbound"), v.literal("outbound")),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("messages", {
      direction: args.direction,
      content: args.content,
      createdAt: Date.now(),
    });
  },
});
