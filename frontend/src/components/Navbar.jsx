import { Link } from "react-router-dom";
import {useState} from "react";

function Navbar () {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    const logout = () => {
        setLoggedIn(false);
        setUser(null);
    }
    return(
        <div>
            {isLoggedIn ? (
                <ul>
                    <Link to='/'>Home</Link>
                    <Link to='/calendar'>Calendar</Link>
                    <p>{user}</p>
                    <button onClick={logout}>Logout</button>
                </ul>
            ) : (
                <ul>
                    <Link to='/'>Home</Link>
                    <Link to='/calendar'>Calendar</Link>
                    <Link to='/login'>Login</Link>
                    {/* <Link to='/signup'>Signup</Link> */}
                </ul>
            )}  
        </div>
    );
};

export default Navbar;