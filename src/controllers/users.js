import {
	hashPassword,
	getSignedToken,
	comparePasswords,
	verifyToken
} from '../services/userService';
import Users from '../models/Users';
import APIError from '../utils';

export async function registerUser(req, res) {
	const hashedPass = await hashPassword(req.body.password);

	try {
		const count = await Users.countDocuments({});
		if (count > 0) {
			return res.status(401).send('Registration not allowed');
		}
	} catch (error) {
		const err = new APIError({
			error,
			message: 'Error getting users count',
			type: 'MongoError'
		});
		return res.status(err.code).json(err);
	}

	try {
		const user = await Users.create({
			username: req.body.username,
			password: hashedPass
		});
		const token = await getSignedToken(user._id);
		return res.json({ auth: true, token });
	} catch (error) {
		const err = new APIError({
			error,
			message: 'Error creating new user',
			type: 'MongoError'
		});
		return res.status(err.code).json(err);
	}
}

export async function loginUser(req, res) {
	try {
		const user = await Users.findOne({ username: req.body.username });
		if (!user) {
			const err = new APIError({
				error: {},
				message: 'Invalid username or password',
				type: 'ClientError',
				code: 401
			});
			return res.status(err.code).json(err);
		}
		try {
			const validPass = await comparePasswords(req.body.password, user.password);
			if (!validPass) {
				const err = new APIError({
					error: {},
					message: 'Invalid username or password',
					type: 'ClientError',
					code: 401
				});
				return res.status(err.code).json(err);
			}
			const token = await getSignedToken(user._id);
			res.json({ auth: true, token});
		} catch (error) {
			const err = new APIError({
				error,
				message: 'Error comparing passwords',
				type: 'BcryptError'
			});
			return res.status(err.code).json(err);
		}
	} catch (error) {
		const err = new APIError({
			error,
			message: 'Error logging in user'
		});
		return res.status(err.code).json(err);
	}
}

export async function verifyAuth(req, res, next) {
	try {
		const token = req.headers['x-access-token'];
		if (!token) {
			const err = new APIError({
				error: { auth: false, message: 'No token provided' },
				message: 'No token provided',
				type: 'TokenError',
				code: 401
			});
			return res.status(err.code).json(err);
		}
		try {
			await verifyToken(token);
			return next();
		} catch (error) {
			const err = new APIError({
				error,
				messsage: 'Error verifying token'
			});
			return res.status(err.code).json(err);
		}
	} catch (error) {
		const err = new APIError({
			error,
			message: 'Error verifying auth'
		});
		return res.status(err.code).json(err);
	}
}
