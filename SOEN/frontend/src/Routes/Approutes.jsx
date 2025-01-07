import Login from '../screens/Login';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Register from '../screens/Register';
import Home from '../screens/Home';
import Project from "../screens/Project.jsx"

const Approutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element = {<Home></Home>}/>
        <Route path='/login' element = {<Login></Login>}/>
        <Route path='/register' element = {<Register></Register>}/>
        <Route path='/project' element = { <Project></Project>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Approutes
