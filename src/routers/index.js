const express = require("express");
const router = express.Router();

router.use("/v1/api/chat", require("./chats"));

module.exports = router;
