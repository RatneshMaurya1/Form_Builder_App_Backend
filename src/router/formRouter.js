const express = require("express");
const userAuth = require("../middlewares/userAuth");
const Folder = require("../models/folder.schema");
const Form = require("../models/form.schema")
const mongoose = require("mongoose")

const formRouter = express.Router()

formRouter.post("/form/:userId", userAuth, async (req, res) => {
    try {
      const { name, folderId } = req.body;
      const userId = req.params.userId
  
      if (!name) {
        return res.status(400).json({ message: "Name is required" });
      }
  
      if (folderId && !mongoose.isValidObjectId(folderId)) {
        return res.status(400).json({ message: "Invalid folderId format" });
      }
  

      const form = new Form({
        name,
        folderId: folderId || null,
        userId,
      });
  
      await form.save();
  
      return res.status(201).json({ message: "Form created successfully", form });
    } catch (error) {
      return res.status(500).json({ message: "Failed to create form", error: error.message });
    }
  });
  formRouter.get("/form/:userId", userAuth, async (req, res) => {
    try {
      const { userId } = req.params; 
      const { folderId } = req.body; 
  
      if (!mongoose.isValidObjectId(userId)) {
        return res.status(400).json({ message: "Invalid userId format" });
      }
  
      let filter = { userId };
  
      if (folderId) {
        if (!mongoose.isValidObjectId(folderId)) {
          return res.status(400).json({ message: "Invalid folderId format" });
        }
        filter.folderId = folderId;
      } else {
        filter.folderId = null;
      }

      const forms = await Form.find(filter);
      return res.status(200).json({ message: "Forms fetched successfully", forms });
    } catch (error) {
      return res.status(500).json({ message: "Failed to fetch forms", error: error.message });
    }
  });

module.exports = formRouter