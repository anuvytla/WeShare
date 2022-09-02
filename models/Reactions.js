const {Schema, Types} = require('mongoose');
const moment = require('moment');


const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId,
        },

        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },

        username: {
            type: String,
            required: true,
        },
        // created a timestamp format for reactions using moment.js
        creadtedAt: {
            type: Date,
            default: Date.now,
            get: createdAt => moment(createdAt).format("MMM DD, YYYY [at] hh:mm a"),
        },
    },
    {
        toJSON: {
            getters: true,
        },

        id: false,
    }
);

module.exports = reactionSchema;