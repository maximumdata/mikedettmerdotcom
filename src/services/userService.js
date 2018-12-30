import jsonwebtoken from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import config from '../config';

export async function hashPassword(password) {
	return await bcrypt.hash(password, 10);
}

export async function comparePasswords(postedPass, userPass) {
	return await bcrypt.compare(postedPass, userPass);
}

export async function getSignedToken(_id) {
	return await jsonwebtoken.sign({ _id }, config.JWT_SECRET, {
		expiresIn: 86400
	});
}

export async function verifyToken(token) {
	return jsonwebtoken.verify(token, config.JWT_SECRET);
}

export default {
	hashPassword,
	getSignedToken,
	verifyToken,
	comparePasswords
};
