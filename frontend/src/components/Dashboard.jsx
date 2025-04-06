import React, { Fragment, useState, useEffect} from 'react';


const Dashboard = ({ setAuth}) => {
    const [name, setName] = useState('');

    async function getName() {
        try {
            const response = await fetch("http://localhost:3000/dashboard/", {
                method: 'GET',
                headers: { token: localStorage.token }
            });
            const parseRes = await response.json()
            setName(parseRes.user_name);
        } catch (err) {
            console.log(err.message);
        }
    }

    // function to clear out local storage
    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        setAuth(false);
    };

    useEffect(() => {
        getName();
    }, []); // Brackets make it so we only make one request

    
    return(
        <Fragment>
            <h1>Dashboard {name}</h1>
            <button onClick={e => logout(e)}>Logout</button>
        </Fragment>
    );
};

export default Dashboard;