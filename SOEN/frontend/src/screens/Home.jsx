import { UserContext } from "../context/Usercontext.jsx";
import { useContext, useState, useEffect, useCallback } from "react";
import { MdAddLink } from "react-icons/md";
import axios from "../config/axios.js";
import { BsFillPersonFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [ismodal, setIsmodal] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projects, setProjects] = useState([]);
  const { user } = useContext(UserContext);

  // Fetch projects
  const fetchProjects = useCallback(async () => {
    try {
      const res = await axios.get("/projects/all");
      console.log("Fetched projects:", res.data);
      setProjects(res.data);
    } catch (err) {
      console.error("Error fetching projects:", err);
    }
  }, []);

  // Watch project details
  const watchProject = async (project) => {
    console.log("Watch project function is called");
    try {
      const res = await axios.get(`/projects/get-project/${project._id}`);
      console.log("Project details:", res.data);
      navigate("/project", { state: res.data });
    } catch (err) {
      console.error("Error fetching project details:", err);
    }
  };

  // Handle form submission to create a project
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("Project Name:", projectName);
    setIsmodal(false);

    try {
      const res = await axios.post("/projects/create", { name: projectName });
      console.log("Project created:", res.data);
      // Refresh the project list after creation
      fetchProjects();
    } catch (err) {
      console.error("Error creating project:", err);
    }
  };

  // Fetch projects on component mount
  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // Render if no user is found
  if (!user) {
    return (
      <div className="w-full h-screen text-white font-serif p-10 text-3xl flex justify-center items-center bg-zinc-700">
        <span>NO User Exists!</span>
      </div>
    );
  }

  // Component JSX
  return (
    <div className="w-full h-screen text-white font-serif p-10 bg-zinc-800">
      <div className="flex gap-3 flex-wrap">
        {/* Button to open modal */}
        <button
          onClick={() => setIsmodal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded flex items-center gap-2"
        >
          <span>Create a Project</span> <MdAddLink />
        </button>

        {/* Projects list */}
        <div className="flex gap-3 projects">
          {projects.map((project) => (
            <div
              key={project._id}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded flex items-center"
            >
              <button
                onClick={() => watchProject(project)}
                className="project flex flex-col items-center"
              >
                <div>{project.name}</div>
                <div className="flex items-center ml-auto">
                  <div className="mt-2">Collaborators</div>
                  <BsFillPersonFill className="ml-5 mt-2" />
                  <span className="ml-1 mt-1">{project.users?.length || 0}</span>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for creating a project */}
      {ismodal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-zinc-900 rounded-lg p-8 shadow-lg w-96">
            <h2 className="text-lg font-bold text-gray-100 mb-4">
              Create a New Project
            </h2>
            <form onSubmit={handleFormSubmit}>
              <label
                htmlFor="projectName"
                className="block text-gray-300 font-medium mb-2"
              >
                Project Name
              </label>
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="w-full p-2 bg-zinc-800 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Enter project name"
                required
              />
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  onClick={() => setIsmodal(false)}
                  className="bg-gray-600 hover:bg-gray-700 text-gray-100 py-2 px-4 rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
