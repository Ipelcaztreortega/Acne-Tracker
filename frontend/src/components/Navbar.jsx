import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Navbar = ({ setAuth, isAuthenthicated }) => { // setAuth is a setter, not the value of auth itself. You needed to pass the actual auth state (isAuthenthicated) to Navbar.
    const [name, setName] = useState('');
    const [userID, setUserID] = useState('');
    
    async function getName() {
        try {
            const response = await fetch("http://localhost:3000/dashboard", {
                method: 'GET',
                headers: { token: localStorage.token }
            });
            const parseRes = await response.json()
            setName(parseRes.user_name);
            setUserID(parseRes.user_id);
            // console.log(parseRes.user_id);
        } catch (err) {
            console.log(err.message);
        }
    };

    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        setAuth(false);
    }

    useEffect(() => {
        if (isAuthenthicated) {
            getName();
        }
    }, [isAuthenthicated]); // Brackets make it so we only make one request

    return(
        <div>
            {isAuthenthicated ? (
                <ul>
                    <button onClick={(e) => logout(e)}>Logout</button>
                    <li>{name}</li>
                    <li>
                        <Link to='/overview' state={{ user_id: userID }}>Entries</Link>
                    </li>
                    <li>
                        <Link to='/calendar'>CalendarPage</Link>
                    </li>
                </ul>
            ) :(
                <ul>
                    <li><Link to='/login'>Login</Link></li>
                </ul>
            )}
            
        </div>
    )
};

export default Navbar;