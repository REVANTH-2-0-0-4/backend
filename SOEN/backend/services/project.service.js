import mongoose from "mongoose";
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
export const getallprojectsbyid = async (userid) => {

  try {
    if (!userid) {
      throw new Error("user id required");
    }
    const all_projects = await projectmodel.find({
      users: userid
    })
    return all_projects;
  }

  catch (err) {
    return {
      "status": "error",
      "message": err.message
    }
  }

}
export const adduserstoproject = async (users, projectid, userid) => {
  try {
    if (!users) {
      throw new Error("Users are not present");
    }
    if (!projectid) {
      throw new Error("Invalid project ID");
    }
    if (!userid) {
      throw new Error("User ID is not defined");
    }
    if (!mongoose.Types.ObjectId.isValid(projectid)) {
      throw new Error("Project ID is not in mongoose format");
    }
    users.forEach((user) => {
      if (!mongoose.Types.ObjectId.isValid(user)) {
        throw new Error(`User ID ${user} is not in mongoose format`);
      }
    });
    if (!mongoose.Types.ObjectId.isValid(userid)) {
      throw new Error("User ID is not in mongoose format");
    }

    const project = await projectmodel.findOne({
      _id: projectid,
      users: userid,
    });
    console.log("project id :", projectid);
    console.log("user id  :", userid);
    console.log("project :", project);

    if (!project) {
      throw new Error("You are not in the project to add others");
    }

    const updatedProject = await projectmodel.findOneAndUpdate(
      { _id: projectid },
      {
        $addToSet: { users: { $each: users } },
      },
      { new: true }
    );

    return {
      status: "success",
      message: "Users added successfully",
      project: updatedProject,
    };
  } catch (error) {
    console.log("error in adduser projectservices : ", error.message);

    return {
      status: "error",
      message: error.message,
    };
  }
};
export const getproject_ = async (projectid) => {
  try {
    if (!projectid) {
      throw new Error("project services didnot recieve the project id");
    }
    if (!mongoose.Types.ObjectId.isValid(projectid)) {
      throw new Error("project id is not of the mongoose format");
    }
    const project =  await projectmodel.findOne({
      _id: projectid
    }).populate('users');
    // console.log(project);
    
    return {
      "status": "success",
      "project": project
    }
  } catch (error) {
    return {
      "status": "error",
      "message": error.message
    }
  }
}

