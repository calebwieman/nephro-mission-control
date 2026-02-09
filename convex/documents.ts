import { query, mutation } from "./_generated/server";

export const search = query(async (ctx, { query }) => {
  return await ctx.db.query("documents")
    .withSearchIndex("search_content", (q) => q.search("content", query))
    .collect();
});

export const add = mutation(async (ctx, { content, path }) => {
  await ctx.db.insert("documents", { content, path });
});
