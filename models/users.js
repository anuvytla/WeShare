const {Schema, model} = require('mongoose');

// creates blueprint for user object
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
            // validating email of the user using the regex expression
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

// Create a virtual property `friendCount` that get the friends length  for each user
userSchema.virtual('friendCount').get(function (){
    return this.friends.length;
});


// Intializing user models
const User = model("Users", userSchema);

module.exports = User;