import { query, mutation } from "./_generated/server";

export const list = query(async (ctx) => {
  return await ctx.db.query("actions").order("desc").take(100);
});

export const add = mutation(async (ctx, { type, details }) => {
  const timestamp = Date.now();
  await ctx.db.insert("actions", { timestamp, type, details });
});
