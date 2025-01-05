import projectmodel from "../db/models/project.model.js";

export const createaproject = async (name, id) => {
  try {
    if (!name || !id) {
      throw new Error("Project name and user ID are required");
    }

    const existingProject = await projectmodel.findOne({ name });
    if (existingProject) {
      return {
        status: "error",
        message: "Project with this name already exists",
      };
    }

    const project = await projectmodel.create({
      name,
      users: [id],
    });

    return {
      status: "success",
      project,
    };
  } catch (err) {
    console.error("Error in createaproject:", err.message);
    return {
      status: "error",
      message: err.message,
    };
  }
};
