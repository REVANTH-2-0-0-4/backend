import { UserContext } from '../context/Usercontext.jsx';
import { useContext } from "react";

const Home = () => {
  const { user } = useContext(UserContext);
  console.log(user);

  return (
    <div>
      <pre>
        {JSON.stringify(user)} 
      </pre>
    </div>
  );
};

export default Home;