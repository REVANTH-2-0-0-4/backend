import { validationResult } from "express-validator";
import usermodel from "../db/models/user.model.js";
import * as projectservices from "../services/project.service.js";

export const createproject = async (req, res) => {
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: "error", errors: errors.array() });
  }

  try {
    const loggedin_user = req.user.email;

    console.log("Email check:", loggedin_user);

    
    const user = await usermodel.findOne({ email: loggedin_user });
    if (!user) {
      return res.status(404).json({ status: "error", message: "User not found" });
    }

    
    delete user._doc.password;

    
    const { name } = req.body;
    const project = await projectservices.createaproject(name, user._id);

    
    if (project.status === "error") {
      return res.status(400).json({ status: "error", message: project.message });
    }

    
    return res.status(201).json({ status: "success", project });
  } catch (err) {
    console.error("Error in createproject:", err.message);
    return res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};
