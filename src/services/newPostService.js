import slug from 'limax';
import Posts from '../models/Posts';
import APIError from '../utils';

export async function postValidator(post) {
	const errMsgs = [];
	if (!post.title) {
		errMsgs.push('Title is missing');
	}
	if (!post.body) {
		errMsgs.push('Body is missing');
	}
	if (errMsgs.length) {
		const err = new APIError({
			message: `Missing required field(s) on new post: ${errMsgs.join(', ')}`,
			type: 'ValidationError',
			code: 400
		});
		throw err;
	}
	return true;
}

async function getSlug(title) {
	const newSlug = slug(title);
	try {
		const posts = await Posts.find({ slug: newSlug }, (err) => {
			if (err) {
				const error = new APIError({
					error: err,
					message: 'Error checking for existing slugs',
					type: 'MongoError'
				});
				throw error;
			}
		});

		if (posts.length) {
			const error = new APIError({
				message: `Existing slug: the slug ${newSlug} already exists`,
				type: 'ClientError',
				code: 409
			});
			throw error;
		}

		return newSlug;
	} catch (error) {
		throw error;
	}
}

export async function newPostService(post) {
	try {
		post.isValid = await postValidator(post);
	} catch (error) {
		throw error;
	}

	try {
		post.slug = await getSlug(post.title);
	} catch (error) {
		throw error;
	}

	return new Posts(post);
}
