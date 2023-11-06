const sql = require("./db.js");

const Chat = function() {};

Chat.getAll = (req, result) => {
  let query;
  if (req?.query?.nextCursor > 0) {
    query = `SELECT messages.id, messages.text, messages.user_id, messages.createdAt, user.name, user.avatar 
    FROM messages LEFT JOIN user ON messages.user_id = user.id where messages.id > ${req?.query?.nextCursor} ORDER BY messages.id LIMIT 10`;
  } else {
    query = `SELECT messages.id, messages.text, messages.user_id, messages.createdAt, user.name, user.avatar 
    FROM messages LEFT JOIN user ON messages.user_id = user.id ORDER BY messages.id LIMIT 10`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    const nextCursor = res.length > 0 ? res[res.length - 1].id : null;
    result(null, { data: res, nextCursor });
  });
};

module.exports = Chat;
