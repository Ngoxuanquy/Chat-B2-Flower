const { chat } = require("../models/chat.models");

class ChatService {
  static async create(payload) {
    console.log({ payload });

    try {
      let existingChat = await chat.findOne({ userId: payload.userId });
      console.log({ existingChat });

      if (existingChat) {
        existingChat.message.push(payload.message);
        await existingChat.save();

        return existingChat;
      } else {
        const newChat = await chat.create({
          name: payload.name,
          email: payload.email,
          userId: payload.userId,
          message: [payload.message], // Store the new message in an array
        });

        return newChat;
      }
    } catch (error) {
      console.error("Error creating or updating chat:", error);
    }
  }

  static async getMessageUser({ userId }) {
    try {
      // Retrieve all chat records from the database
      console.log({ userId });
      const chatMessages = await chat.findOne({
        userId: userId,
      });
      console.log({ chatMessages });
      return chatMessages;
    } catch (error) {
      // Handle any errors that occur during the retrieval process
      console.error("Error retrieving chat messages:", error);
    }
  }
}

module.exports = ChatService;
