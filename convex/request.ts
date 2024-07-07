import { ConvexError, v } from "convex/values";
import { mutation } from "./_generated/server";
import { getUserByClerkId } from "./_utils";

export const create = mutation({
    args: {
        email: v.string(),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new ConvexError("Unathorized");
        }

        if (identity.email === args.email) {
            throw new ConvexError("Can't send request to yourself");
        }

        const currentUser = await getUserByClerkId({ ctx, clerk_id: identity.subject })

        if (!currentUser) {
            throw new ConvexError("User not found");
        }

        const receiver = await ctx.db
            .query("users")
            .withIndex("by_email", query => query.eq("email", args.email))
            .unique()

        if (!receiver) {
            throw new ConvexError("User could not be found");
        }

        const requestAlreadySent = await ctx.db
            .query("requests")
            .withIndex("by_receiver_sender", query => query.eq("receiver", receiver._id)
                .eq("sender", currentUser._id))
                .unique()

        if (requestAlreadySent) {
            throw new ConvexError("Request already sent");
        }

        const requestAlreadyRecieved = await ctx.db
            .query("requests")
            .withIndex("by_receiver_sender", query => query.eq("receiver", currentUser._id)
                .eq("sender", receiver._id))
                .unique()

        if (requestAlreadyRecieved) {
            throw new ConvexError("This user already sent you a request");
        }

        const request = await ctx.db.insert("requests", {
            sender: currentUser._id,
            receiver: receiver._id,
        })

        return request
    }
})