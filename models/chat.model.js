const sql = require("./db.js");

const Chat = function() {};

Chat.getAll = (req, result) => {
  let query;
  if (req?.query?.nextCursor > 0) {
    query = `SELECT messages._id, messages.text, messages.user_id, messages.createdAt, user.name, user.avatar 
    FROM messages LEFT JOIN user ON messages.user_id = user.id where messages._id > ${req?.query?.nextCursor} ORDER BY messages._id LIMIT 10`;
  } else {
    query = `SELECT messages._id, messages.text, messages.user_id, messages.createdAt, user.name, user.avatar 
    FROM messages LEFT JOIN user ON messages.user_id = user.id ORDER BY messages._id LIMIT 10`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    const newRes = []
    
    res.map((item) => {
      const data = {
        _id: item?._id,
        text: item?.text,
        createdAt: item?.createdAt,
        user: {_id: item?.user_id, name: item?.name, avatar: item?.avatar}
      }
      newRes.push(data)
    });

    const nextCursor = newRes.length > 0 ? newRes[newRes.length - 1]._id : null;

    result(null, { data: newRes, nextCursor, success: newRes.length > 0 });
  });
};

module.exports = Chat;
