import React, {Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const Login = ({setAuth}) => {

    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    });

    const {email, password} = inputs;

    const onChange = (e) => {
        setInputs({...inputs , [e.target.name] : e.target.value }) 
    };

    const onSubmitForm = async (e) => {
        e.preventDefault();

        try {
            const body = {email, password}
            const response = await fetch("http://localhost:3000/auth/login", {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(body)
            });

            const parseRes = await response.json();
            // console.log(parseRes);

            if (parseRes.token) {
                localStorage.setItem("token", parseRes.token);
                setAuth(true); // Now we get taken to the dashboard
                toast.success('Login Successfully');
            } else {
                setAuth(false);
                toast.error(parseRes);
            }

        } catch (err) {
            console.log(err.message);

        };
    };
    return(
        <Fragment>
            <h1>Login</h1>
            <form onSubmit={onSubmitForm}>
                {/* <label htmlFor="email">Email: </label> */}
                <input 
                    type="email" 
                    name="email" 
                    placeholder="email" 
                    value={email}
                    onChange={e => onChange(e)}
                />

                {/* <label htmlFor="password">Password: </label> */}
                <input 
                    type="password" 
                    name="password" 
                    placeholder="password"
                    value={password}
                    onChange={e => onChange(e)}
                />

                <button>Submit</button>
            </form>
            <Link to="/register">Register</Link>
            <ToastContainer /> {/* Putting toast container for it to work */}
        </Fragment>
    );
};

export default Login;