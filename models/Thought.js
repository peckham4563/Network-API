const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction')

// Schema to create Student model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
    },
    id: false
  }
);
thoughtSchema.virtual('reactionCount').get(function(){
    this.reactions.length
})
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
