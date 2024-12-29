const mongoose = require("mongoose")

const getISTTime = () => {
    const offset = 5.5 * 60 * 60 * 1000; 
    return new Date(Date.now() + offset).toISOString();
  };
const itemSchema = new mongoose.Schema({
    type: {
      type: String,
      required: true,
      enum: ['text', 'image', 'input'], 
    },
    content: {
      type: String, 
      required: function () {
        return this.type !== 'input';
      },
    },
    inputType: {
      type: String,
      enum: ['text', 'email', 'number', 'date', 'rating', 'phone'], 
      required: function () {
        return this.type === 'input'; 
      },
    },
    placeholder: {
      type: String,
      required: function () {
        return this.type === 'input' && (this.inputType === 'text' || this.inputType === 'number');
      },
    },
    isRequired: {
      type: Boolean,
      default: false,
    },
    response: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
  });

  const CreateFormSchema = new mongoose.Schema({
    name: { type: String, required: true }, 
    elements: {
      type: [itemSchema],
      validate: {
        validator: function (v) {
          return v.length > 0; 
        },
        message: 'A form must have at least one element.',
      },
    },
  },{
    timestamps:{
        createdTime:getISTTime,
    }
  });
  
  const CreatedForm = mongoose.model('CreateForm', CreateFormSchema);
  
  module.exports = CreatedForm;