import { query, internalQuery } from './_generated/server';
import { v } from 'convex/values';

/*export const getAllPosts = query({
  handler: async (ctx, args) => {
    const posts = new Array();
    const results = new Array()
    posts.push(args['posts']);

    for(let entry of posts) {  
      results.push(await ctx.db.query('posts')
        .withIndex('by_embeddings')
        .filter((q) => q.eq(q.field('embeddings'), entry['_id']))
        .collect()
      )
    }

    return results;
    
  },
});*/

