const express = require("express");
const createFormRouter = express.Router();
const CreateForm = require("../models/createForm.schema");

// POST API: Create a new form
createFormRouter.post("/create/forms", async (req, res) => {
  try {
    const { formId, name, elements } = req.body;
    console.log(formId)
    console.log(name)
    console.log(elements)
    // Validate input
    if (!formId || !name || !Array.isArray(elements) || elements.length === 0) {
      return res
        .status(400)
        .json({ message: "Invalid form data. formId, name, and elements are required." });
    }

    // Check for required fields in each element
    for (const element of elements) {
        // Validate that either bubble or inputType is present
        if (!(element.bubble || element.inputType)) {
          return res.status(400).json({
            message: "Each element must have either bubble or inputType.",
          });
        }
      
        // Check that content and id are present
        if (!element.content || !element.id) {
          return res.status(400).json({
            message: "Each element must have content and id.",
          });
        }
      }
      

    const newForm = new CreateForm({ formId, name, elements });
    await newForm.save();

    res.status(201).json({ message: "Form created successfully!", form: newForm });
  } catch (error) {
    res.status(500).json({ message: "Error creating form.", error: error.message });
  }
});

// GET API: Fetch all forms
createFormRouter.get("/forms", async (req, res) => {
  try {
    const forms = await CreateForm.find().populate("formId"); // Populate formId if needed
    res.status(200).json(forms);
  } catch (error) {
    res.status(500).json({ message: "Error fetching forms.", error: error.message });
  }
});

// GET API: Fetch a form by ID
createFormRouter.get("/forms/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const form = await CreateForm.findById(id).populate("formId");

    if (!form) {
      return res.status(404).json({ message: "Form not found." });
    }

    res.status(200).json(form);
  } catch (error) {
    res.status(500).json({ message: "Error fetching form.", error: error.message });
  }
});

// PUT API: Update a form by ID
createFormRouter.put("/forms/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { formId, name, elements } = req.body;

    // Validate input
    if (!formId || !name || !Array.isArray(elements) || elements.length === 0) {
      return res
        .status(400)
        .json({ message: "Invalid form data. formId, name, and elements are required." });
    }

    for (const element of elements) {
      if (!element.type || !element.inputType || !element.content || !element.id) {
        return res.status(400).json({
          message: "Each element must have type, inputType, content, and id.",
        });
      }
    }

    const updatedForm = await CreateForm.findByIdAndUpdate(
      id,
      { formId, name, elements },
      { new: true, runValidators: true }
    );

    if (!updatedForm) {
      return res.status(404).json({ message: "Form not found." });
    }

    res.status(200).json({ message: "Form updated successfully!", form: updatedForm });
  } catch (error) {
    res.status(500).json({ message: "Error updating form.", error: error.message });
  }
});

// DELETE API: Delete a form by ID
createFormRouter.delete("/forms/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedForm = await CreateForm.findByIdAndDelete(id);

    if (!deletedForm) {
      return res.status(404).json({ message: "Form not found." });
    }

    res.status(200).json({ message: "Form deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting form.", error: error.message });
  }
});

module.exports = createFormRouter;
