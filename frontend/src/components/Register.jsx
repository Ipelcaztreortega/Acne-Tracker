import React, {Fragment, useState} from 'react';
import { Link } from 'react-router-dom';

const Register = ({ setAuth }) => {
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
        name: ""
    });

    const {email, password, name} = inputs;

    const onChange = (e) => {
        setInputs({...inputs , [e.target.name] : e.target.value }) 
    };

    const onSubmitForm = async (e) => {
        e.preventDefault(); // Preventing refreshing this page

        try {
            const body = { email, password, name };
            const response = await fetch('http://localhost:3000/auth/register', {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(body)
            });

            const parseRes = await response.json();

            localStorage.setItem("token", parseRes.token);
            setAuth(true); // Now we get taken to the dashboard
        } catch (err) {
            console.log(err.message);
        }
    }
    return(
        <Fragment>
            <h1>Register</h1>
            <form onSubmit = {onSubmitForm}>
                {/* <label htmlFor="email">Email:</label> */}
                <input type="email" name='email' placeholder="email" value={email} onChange={e => onChange(e)}/>

                {/* <label htmlFor="password">Password:</label> */}
                <input type="password" name='password' placeholder="password" value={password} onChange={e => onChange(e)} />

                {/* <label htmlFor="name">Name:</label> */}
                <input type="text" name='name' placeholder="name" value={name} onChange={e => onChange(e)}/>

                <button>Submit</button>
            </form>
            <Link to="/login">Login</Link>
        </Fragment>
    );
};

export default Register;