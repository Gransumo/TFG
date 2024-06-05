const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const notificationSchema = new mongoose.Schema({
	userId: {
		type: Number,
		required: true
	},
	type: {
		type: String,
		required: true
	},
	data: {
		friendRequest: {
			request_id: {
				type: Number
			},
			from_user_id: {
				type: Number
			}
		},
		event_invitation: {
			event_invitation_id: {
				type: Number
			},
			event_id: {
				type: Number
			}
		},
		event_update: {
			event_id: {
				type: String
			},
			update_info: {
				type: String
			}
		}
	},
	read: {
		type: Boolean,
		default: false
	},
	created_at: {
		type: Date,
		default: Date.now
	}
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
