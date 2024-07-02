import { v } from "convex/values";
import { internalMutation, internalQuery, query } from "./_generated/server";

export const create = internalMutation({
    args: {
        username: v.string(),
        image_url: v.string(),
        clerk_id: v.string(),
        email: v.string(),
    },
    handler: async (ctx, args) => {
        await ctx.db.insert("users", args);
    }
})

export const get = internalQuery({
    args: {
        clerk_id: v.string(),
    },
    async handler(ctx, args) {
        return ctx.db
            .query("users")
            .withIndex("by_clerk_id", query => query.eq("clerk_id", args.clerk_id))
            .unique()
    }
})