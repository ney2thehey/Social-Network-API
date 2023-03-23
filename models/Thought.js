const { Schema, model } = require('mongoose');

const reactionSchema = require('./Reaction');



const thoughtSchema = new Schema (

  {
       thoughtText: {
           type: String,
           required: true,
          //have a min and max length for the characters 

      },
      createdAt: {
           type: Date,
          default: Date.now,
      },
       username: {
           type: String,
          required: true,
          ref: 'User'
       },
      reactions: [reactionSchema]
        },

        {
            toJSON:{
                virtuals: true,
                getters: true
            },
        }
)


thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);
module.exports = Thought;
