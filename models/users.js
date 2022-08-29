const {Schema, model} = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required : true,
            unique: true,
            match: [
                /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,3})$/,
                "Enter valid email address"
            ], 
        },

        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: "Thoughts",
            },
        ],

        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Users',
            },
        ],
    },
    {
        toJSON: {
            virtuals:true,
        },
        id:false,
    }
);


userSchema.virtual('friendCount').get(function (){
    return this.friends.length;
});

const User = model("Users", userSchema);

module.exports = User;