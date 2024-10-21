const mongoose = require("mongoose");

exports.dbConnection = () => {
  mongoose
  .connect(process.env.DB_URI)
  .then((conn) => console.log(`Database Connected: ${conn.connection.host}`))
  .catch((err) => {
    console.log(`Database Error: ${err}`);
  });
};
