module.exports = (app) => {
  const chat = require("../controllers/chat.controller.js");
  // Retrieve all chat
  app.get("/chat", chat.findAll);
};
