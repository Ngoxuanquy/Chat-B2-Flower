const express = require("express");
const ChatController = require("../../controllers/chatController");

const router = express.Router();

router.post("/create", ChatController.create);
router.get("/getMessageUser/:userId", ChatController.getMessageUser);

module.exports = router;
