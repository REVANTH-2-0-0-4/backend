import { useContext, useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import axios  from '../config/axios';
import { UserContext } from '../context/Usercontext.jsx';


const Login = () => {
  let { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  function submithandler(e){
    e.preventDefault();
    axios.post('/users/login',{
      email,
      password
    })
    .then((res)=>{
      // console.log("response : " ,res);
      console.log("response data : " ,res.data);
      // console.log("response token  : " ,res.data.token);
      localStorage.setItem('token',res.data.token);
      setUser(res.data.response);
      navigate('/');
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  return (


    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4 font-serif">
      <div className="w-full max-w-md">
        <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 space-y-8 backdrop-blur-lg border border-gray-700">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-white tracking-tight">
              Welcome Back
            </h1>
            <p className="text-gray-400">
              Enter your credentials to access your account
            </p>
          </div>

          {/* Form */}
          <form 
          onSubmit={submithandler}
          className="space-y-6">
            <div className="space-y-4">
              {/* Email Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 block">
                  Email
                </label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  name='email'
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  placeholder="Enter your email"
                  required
                />
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 block">
                  Password
                </label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  name='password'
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transform hover:scale-[1.02] transition-all duration-200"
            >
              Sign in
            </button>
          </form>

          {/* Register Link */}
          <div className="text-center">
            <p className="text-gray-400">
              Dont have an account ?
              <Link
                to="/register"
                className="font-medium text-blue-400 hover:text-blue-300 transition duration-200"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;