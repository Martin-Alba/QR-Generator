import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	token: {
		type: String,
		default: '',
	},
	avatar: {
		type: Buffer,
	},
	qrCodes: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'QR',
		},
	],
	// -> add the following fields after implementing the reset password feature (code and expiration)
})

const UserModel = mongoose.model('User', userSchema)

export default UserModel
