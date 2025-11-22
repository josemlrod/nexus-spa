import { v } from "convex/values";

import { mutation, query } from "./_generated/server";
import { tryCatch } from "../src/lib/utils"

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("items").collect();
  },
});

export const createItem = mutation({
  args: { text: v.string(), },
  handler: async (ctx, args) => {
    const { text } = args;
    const time = new Date(Date.now()).getTime();

    const {
      data,
      error,
    } = await tryCatch(
      ctx.db.insert("items", {
        text,
        createdAt: time,
        updatedAt: time,
      })
    );

    if (data) {
      return {
        ok: true,
        data,
      }
    } else {
      return {
        ok: false,
        data: error,
      }
    }
  },
})
