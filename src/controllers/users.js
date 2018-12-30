import userService from '../services/userService';
import Users from '../models/Users';
import APIError from '../utils';

export async function registerUser(req, res) {
	const hashedPass = await userService.hashPassword(req.body.password);

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
		res.status(err.code).json(err);
	}

	try {
		const user = await Users.create({
			username: req.body.username,
			password: hashedPass
		});
		const token = await userService.getSignedToken(user._id);
		res.json({ auth: true, token });
	} catch (error) {
		const err = new APIError({
			error,
			message: 'Error creating new user',
			type: 'MongoError'
		});
		res.status(err.code).json(err);
	}
}

export async function getUserIdFromToken(req, res, next) {
	const token = req.headers['x-access-token'];

	if(!token) {
		const err = new APIError({
			error: { auth: false, message: 'No token provided' },
			message: 'No token provided',
			type: 'TokenError',
			code: 401
		});
		return res.status(err.code).json(err);
	}

	try {
		const decoded = await userService.verifyToken(token);
		req.token = decoded;
		next();
	} catch (error) {
		const err = new APIError({
			error,
			message: 'Error decoding token',
		});
		return res.status(err.code).json(err);
	}
}

export async function getUserFromId(req, res) {
	try {
		const user = await Users.findById(req.token._id, { password: 0 });
		res.json(user);
	} catch (error) {
		const err = new APIError({
			error,
			message: 'Error looking up user from Id',
			type: 'MongoError'
		});
		res.status(err.code).json(err);
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
			const validPass = await userService.comparePasswords(req.body.password, user.password);
			if (!validPass) {
				const err = new APIError({
					error: {},
					message: 'Invalid username or password',
					type: 'ClientError',
					code: 401
				});
				return res.status(err.code).json(err);
			}
			const token = await userService.getSignedToken(user._id);
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
		res.status(err.code).json(err);
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
			const decoded = await userService.verifyToken(token);
			req.userId = decoded._id;
			next();
		} catch (error) {
			const err = new APIError({
				error,
				messsage: 'Error verifying token'
			});
			res.status(err.code).json(err);
		}
	} catch (error) {
		const err = new APIError({
			error,
			message: 'Error verifying auth'
		});
		res.status(err.code).json(err);
	}
}
