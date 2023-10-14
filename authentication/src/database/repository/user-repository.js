import User from '../models/Users.js';
import bcrypt from 'bcrypt';

class UserRepository {
	async signupUser(data) {
		const { userId, email, password, userName, type, state } = data;
		let user = await User.signup(
			userId,
			email,
			password,
			userName,
			type,
			state,
		);
		return user;
	}
	async loginUser(req) {
		const { userName, password } = req.body;
		const user = await User.findOne({ userName: userName }).lean();
		if (user) {
			if (password) {
				const auth = await bcrypt.compare(password, user.password);
				if (auth) {
					return user;
				}
			}
			throw Error('incorrect Password');
		}
		throw Error('incorrect Email');
	}

	async deleteUser(userId) {
		const user = await User.deleteOne({ userId: userId });
		return user;
	}

	async findUserByEmail(email) {
		let user = await User.findOne({ email: email }).lean();
		return user;
	}
	async findUserByUserName(userName) {
		let user = await User.findOne({ userName: userName }).lean();
		return user;
	}
}

export default UserRepository;