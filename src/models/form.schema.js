const mongoose = require("mongoose")

const formSchema = new mongoose.Schema({
  title: { type: String, required: true },
  folderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Folder",
    default: null,
  },
});

module.exports = mongoose.model("Form", formSchema);
