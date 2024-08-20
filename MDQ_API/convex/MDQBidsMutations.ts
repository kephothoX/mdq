import { mutation, internalMutation } from "./_generated/server";
import { v } from 'convex/values';


export const newItem = mutation({
  handler: async(ctx, args: any) => {
    
    return await ctx.db.insert('items',  args);
  }
});





export const updateItem = mutation({
  args: { 
    id: v.id('items'), 
    topicID: v.string(),
    name: v.string(),
    description: v.string(),
    price_amount: v.number(),
    item_images: v.array(v.string()),
    location: v.string(),
  },

  handler: async (ctx, args) => {
    const id: any  = args;
    
    return await ctx.db.patch(id, {
      name: args.name,
      topicID: args.topicID,
      description: args.description,
      price_amount: args.price_amount,
      item_images: args.item_images,
      location: args.location,
    });
    
  },
});

