const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, "Please provide a username"],
		max_length: 100
	},
	email: {
		type: String,
		max_length: 50,
		validate: {
			validator: async (v) => {
				if (await User.exists({email: v}).exec()) {
					return false;
				}
				return true;
			}
		}
	},
	password: {
		type: String,
		required: [true, "Please provide a password"],
		max_length: 50
	}
})

const User = mongoose.model('User', userSchema)

module.exports = User