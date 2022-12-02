const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());
mongoose.connect("mongodb://0.0.0.0:27017/NotekeeperDb", {
  useNewUrlParser: true,
});

const NotekeeperSchema = {
  title: String,
  content: String,
};

const Notekeeper = mongoose.model("Notekeeper", NotekeeperSchema);

app.get("/api", (req, res) => {
  Notekeeper.find((err, result) => {
    if (!err) {
      res.send(result);
    }
  });
});
app.post("/api/addNew", (req, res) => {
  const query = new Notekeeper({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    content: req.body.content,
  });
  query.save((err) => {
    if (!err) {
      res.send("Successfully added new Note");
    }
  });
});
app.put("/api/update/", (req, res) => {
  Notekeeper.updateOne({ _id: req.body.id }, { $set: req.body }, (err) => {
    if (!err) {
      res.send("Patched succesfully");
    }
  });
});

app.delete("/api/delete/:id", (req, res) => {
  Notekeeper.deleteOne(
    { _id: mongoose.Types.ObjectId(req.params.id) },
    { $set: req.body },
    (err) => {
      if (!err) {
        res.send("successfully deleted");
      }
    }
  );
});
app.listen(8000, () => {
  console.log("Backend connected");
});
