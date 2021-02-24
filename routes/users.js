var express = require("express");
var router = express.Router();
const ObjectId = require("mongodb").ObjectId;

/* GET users listing. */
router.get("/all", async (_, res) => {
  const { client, db } = await require("../util/mongo");
  try {
    const result = await db.collection("users").find({}).toArray();
    //res.render("usersList", { users: result });
    res.send(result);
  } catch (err) {
    res.status(500).send(err.toString());
    client.close();
  }
});

router.get("/find/:id", async (req, res) => {
  const { client, db } = await require("../util/mongo");

  try {
    const { id } = req.params;
    const result = await db.collection("users").findOne({ _id: ObjectId(id) });
    res.send(result);
  } catch (err) {
    res.status(500).send(err.toString());
    client.close();
  }
});

router.post("/create", async (req, res) => {
  const { client, db } = await require("../util/mongo");

  try {
    const user = req.body;
    await db.collection("users").insertOne(user);
    res.send();
  } catch (err) {
    res.status(500).send(err.toString());
    client.close();
  }
});

router.put("/update", async (req, res) => {
  const { client, db } = await require("../util/mongo");

  try {
    const payload = req.body;
    await db
      .collection("users")
      .updateOne(
        { _id: ObjectId(payload.id) },
        { $set: { name: payload.name } }
      );
    res.send();
  } catch (err) {
    res.status(500).send(err.toString());
    client.close();
  }
});

router.delete("/delete/:id", async (req, res) => {
  const { client, db } = await require("../util/mongo");

  try {
    const { id } = req.params;
    await db.collection("users").deleteOne({ _id: ObjectId(id) });
    res.send();
  } catch (err) {
    res.status(500).send(err.toString());
    client.close();
  }
});

module.exports = router;
