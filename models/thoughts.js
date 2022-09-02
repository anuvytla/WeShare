const {Schema, model} = require('mongoose');
const Reaction = require('./Reactions');
const moment = require('moment');

// create blue print for thoughts
const thoughtSchema = new Schema (
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        // using moment.js to format timestamp  for the thought creation time and date
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAt => moment(createdAt).format("MMM DD, YYYY [at] hh:mm a"),
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [Reaction],
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);
// Create a virtual property `reactionCount` that gets the reaction length  per post
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});


// Intializing thought models
const Thoughts = model('Thoughts' , thoughtSchema);

module.exports = Thoughts;