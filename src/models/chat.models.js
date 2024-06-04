const mongoose = require("mongoose"); // Erase if already required
const { model, Schema } = require("mongoose");
// Declare the Schema of the Mongo model

const DOCUMENT_NAME = "Chat";
const COLLECTION_NAME = "Chats";

var chatSchema = new Schema(
  {
    name: {
      type: String,
      maxLength: 150,
    },
    email: {
      type: String,
      unique: true,
    },
    userId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    verify: {
      type: mongoose.Schema.Types.Boolean,
      default: false,
    },
    message: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

//Export the model
module.exports = {
  chat: model(DOCUMENT_NAME, chatSchema),
};
