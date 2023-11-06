const Chat = require("../models/chat.model.js");

// Retrieve all Chats from the database.
exports.findAll = (req, res) => {
  Chat.getAll(req, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving chats.",
          success: false,
      });
    else res.send(data);
  });
};
