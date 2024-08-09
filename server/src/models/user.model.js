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
		// -> required: true, luego de implementar JWT
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
})

const UserModel = mongoose.model('User', userSchema)

export default UserModel
