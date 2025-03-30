import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CalendarPage from "./pages/CalendarPage";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App () {
  return(
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/calendar' element={<CalendarPage/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login />}/>
      </Routes>
    </Router>
  )
}
export default App;
