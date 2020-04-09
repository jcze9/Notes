const mongos = require("mongoose");
const { NOTES_APP_MONGOD_HOST, NOTES_APP_MONGOD_DATABASE } = process.env;
const MONGODB_URI = `mongodb://${NOTES_APP_MONGOD_HOST}/${NOTES_APP_MONGOD_DATABASE}`;
mongos
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then((db) => console.log("Database Connected"))
  .catch((err) => console.log(err));
