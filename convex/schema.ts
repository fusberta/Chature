import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
    users: defineTable({
        username: v.string(),
        image_url: v.string(),
        clerk_id: v.string(),
        email: v.string(),
    })
        .index("by_email", ["email"])
        .index("by_clerk_id", ["clerk_id"]),
    requests: defineTable({
        sender: v.id('users'),
        receiver: v.id('users'),
    })
        .index("by_receiver", ["receiver"])
        .index("by_receiver_sender", ["receiver", "sender"]),
})