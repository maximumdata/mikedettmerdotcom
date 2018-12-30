import { newPostService, postValidator } from '../services/newPostService';
import Posts from '../models/Posts';
import APIError from '../utils';

export async function getAllPublishedPosts(req, res) {
	const posts = await Posts.find({ hidden: false }, (err) => {
		if (err) {
			const error = new APIError({
				error: err,
				message: 'Error getting all published posts',
				type: 'MongoError'
			});
			res.status(error.code).json(error);
		}
	}).sort('-createdAt');

	res.json(posts);
}

export async function createNewPost(req, res) {
	try {
		const newPost = await newPostService(req.body);
		await newPost.save();
		res.json(newPost);
	} catch (error) {
		res.status(500).json(error);
	}
}

export async function getSinglePost(req, res) {
	if (req.post) {
		res.json(req.post);
	} else {
		res.sendStatus(404);
	}
}

export async function updatePost(req, res) {
	const { body: post } = req;
	try {
		post.isValid = await postValidator(post);
		const updatedPost = await Posts.findByIdAndUpdate(req.post._id, post, { new: true });
		res.json(updatedPost);
	} catch (error) {
		res.status(500).json(error);
	}
}

export async function deletePost(req, res) {
	try {
		await Posts.deleteOne({ _id: req.post._id }, (err) => {
			if (err) {
				const error = new APIError({
					error: err,
					message: `Error deleting post with _id of ${req.post._id}`,
					type: 'MongoError'
				});
				throw error;
			}
		});
		res.status(200).send();
	} catch (error) {
		res.status(304).json(error);
	}
}

export async function addPostToReq(req, res, next) {
	try {
		const postById = await Posts.findById(req.params.id, (err) => {
			if (err) {
				const error = new APIError({
					error: err,
					message: `Error finding post with _id of ${req.params.id}`,
					type: 'MongoError'
				});
				throw error;
			}
		});

		if (postById) {
			req.post = postById;
			next();
		} else {
			const error = new APIError({
				message: `No post with the _id ${req.params.id} found`,
				type: 'ClientError',
				code: 404
			});
			res.status(error.code).json(error);
		}
	} catch (error) {
		res.status(500).json(error);
	}
}

export async function getPostsByPage(req, res) {
	try {
		let { page } = req.query;
		if (!page || global.isNaN(Number(page))) {
			page = 1;
		} else {
			page = Number(page);
		}
		const posts = await Posts.paginate({}, {
			page,
			limit: 5,
			sort: {
				createdAt: -1
			},
			customLabels: {
				docs: 'posts'
			}
		});
		res.json(posts);
	} catch (error) {
		const err = new APIError({
			error,
			message: 'Error getting paginated results',
			type: 'PaginationError',
			code: 500
		});
		res.status(err.code).json(err);
	}
}
