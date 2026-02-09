import { query, mutation } from "./_generated/server";

export const list = query(async (ctx) => {
  return await ctx.db.query("tasks").collect();
});

export const add = mutation(async (ctx, { title, description, date }) => {
  await ctx.db.insert("tasks", { title, description, date });
});
