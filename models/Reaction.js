const { Schema, model } = require('mongoose');

// Schema to create a course model
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      default: true,
      max_length: 280
    },
    userName: {
      type: String,
      default: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // add getter method to format timestamp
    }
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

module.exports = reactionSchema;
