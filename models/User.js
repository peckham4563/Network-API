const { Schema, model } = require('mongoose');

// Schema to create Student model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: "Thought"
    }],
    friends:  [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }]
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false
  }
);
userSchema.virtual('friendCount').get(function(){
    this.friends.length
})
const User = model('User', userSchema);

module.exports = User;
