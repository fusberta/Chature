import { QueryCtx, MutationCtx } from "./_generated/server";

export const getUserByClerkId = async ({
    ctx, clerk_id
} : {
    ctx: QueryCtx | MutationCtx,
    clerk_id: string
}) => {
    return await ctx.db
        .query("users")
        .withIndex("by_clerk_id", query => query.eq("clerk_id", clerk_id))
        .unique()
}