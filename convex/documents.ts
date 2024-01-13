import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const create = mutation({
	args: {
		title: v.string(),
		parentDocument: v.optional(v.id('documents')),
	},
	handler: async (ctx, args) => {
		const indentity = await ctx.auth.getUserIdentity();

		if (!indentity) {
			throw new Error('Not Authenticated');
		}

		const userId = indentity.subject;
		const document = await ctx.db.insert('documents', {
			title: args.title,
			parentDocument: args.parentDocument,
			userId,
			isArchived: false,
			isPublished: false,
		});
		return document;
	},
});

export const get = query({
	handler: async (ctx) => {
		const indentity = await ctx.auth.getUserIdentity();
		if (!indentity) {
			throw new Error('Not Authenticated!');
		}

		const documents = await ctx.db.query('documents').collect();
		return documents;
	},
});
