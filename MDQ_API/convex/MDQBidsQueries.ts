import { query, internalQuery } from './_generated/server';
import { v } from 'convex/values';



export const getAllItems = query({
  handler: async (ctx) => {
    return await ctx.db.query('items')
        .withIndex('name')
        .collect();    
  }    
});

export const getItems = query({
  handler: async (ctx) => {
    return await ctx.db.query('items')
        .withIndex('name')
        .take(5)   
  }    
});

export const getItemById = query({
  handler: async (ctx, args: any) => {
    return await ctx.db
      .query('items')
      .filter((q) => q.eq(q.field('_id'), args.id))
      .collect()
  },
});






