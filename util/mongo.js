const MongoClient = require("mongodb").MongoClient;
const uri =
  "mongodb+srv://admin:r!LfaJnrbG4skL2@cluster0-tmjn4.mongodb.net/projectx";
const mongo_db = "projectx";

module.exports = (async function () {
  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = client.db(mongo_db);
  return { client, db };
})();
