import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({


    items: defineTable({
        topicID: v.string(),
        name: v.string(),
        description: v.string(),
        price_amount: v.number(),
        item_images: v.array(v.string()),
        location: v.string(),
        bid_opens: v.string(),
        bid_closes: v.string()
    })
    .index('name', ['name'])
    .index('topicID', ['topicID']),

  
});