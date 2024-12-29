const mongoose = require("mongoose");

const createFormSchema = new mongoose.Schema({
  formId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Form",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  elements: [
    {
      bubble: {
        type: String,
        enum: ["bubbleText", "bubbleImage"],
        required: true,
      },
      inputType: {
        type: String,
        enum: [
          "inputText",
          "inputNumber",
          "inputEmail",
          "inputPhone",
          "inputDate",
          "inputRating",
          "inputButton",
        ],
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      id: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("CreateForm", createFormSchema);
