// import {jwtDecode} from 'jwt-decode';
import {useState } from "react";


function Login () {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [inputValue, setInputValue] = useState('')


    // Grabbing from the input
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = () => {
        // navigate('/');
        setLoggedIn(true);
        setUser(inputValue);
    }

    return(
        <div>
            <h1>Login Page</h1>
            {isLoggedIn ? (
                <div>
                    <p>Welcome, {user}!</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} action="">
                    <label htmlFor="">First Name:</label>
                    <input type="text" value={inputValue} onChange={handleInputChange}/>
                    <p>Input Value: {inputValue}</p>
                    <button type='submit'>Submit</button>
                </form>
            )}
        </div>
    );
};

export default Login;