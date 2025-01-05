import { UserContext } from "../context/Usercontext.jsx";
import { useContext, useState } from "react";
import { MdAddLink } from "react-icons/md";
import  axios from "../config/axios.js";

const Home = () => {
  const [ismodal, setIsmodal] = useState(false);
  const [projectName, setProjectName] = useState(""); // State to handle form input
  const { user } = useContext(UserContext);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Project Name:", projectName);
    setIsmodal(false);
    axios.post("/projects/create",{
      name : projectName
    })
    .then((res)=>{
      console.log(res);
    })
    .catch((err)=>{
       console.log(err);
    })
  
  };

  if (!user) {
    return (
      <div className="w-full h-screen text-white font-serif p-10 text-3xl flex justify-center items-center bg-zinc-700">
        <span>NO User Exists!</span>
      </div>
    );
  }

  return (
    <div className="w-full h-screen text-white font-serif p-10 bg-zinc-800">
      <button
        onClick={() => setIsmodal(true)} // Open modal
        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded flex items-center gap-2"
      >
        <span>Create a Project</span> <MdAddLink />
      </button>

      {/* Modal */}
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
                  onClick={() => setIsmodal(false)} // Close modal
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
