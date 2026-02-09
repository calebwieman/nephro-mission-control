import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  actions: defineTable({
    timestamp: v.number(),
    type: v.string(),
    details: v.string(),
  }).index("by_timestamp", ["timestamp"]),
  tasks: defineTable({
    title: v.string(),
    description: v.string(),
    date: v.number(),
  }).index("by_date", ["date"]),
  documents: defineTable({
    content: v.string(),
    path: v.string(),
  }).searchIndex("search_content", {
    searchField: "content",
  }),
});
