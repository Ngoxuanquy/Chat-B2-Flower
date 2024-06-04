const ChatService = require("../services/chat.service");

class ChatController {
  static async create(req, res, next) {
    res.json({
      message: "success",
      metadata: await ChatService.create(req.body),
    });
  }
  static async getMessageUser(req, res, next) {
    res.json({
      message: "success message",
      metadata: await ChatService.getMessageUser(req.params),
    });
  }
}

module.exports = ChatController;
