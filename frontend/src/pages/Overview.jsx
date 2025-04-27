import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';


const Overview = () => {
        const [entry, setEntries] = useState([]); // When you receive multiple entries (json objects), you need to use an array
        const location = useLocation();
        const user_id = location.state?.user_id;
        console.log("Overview", user_id);

        async function getEntries() {
            try {
                const body = {user_id};
                const response = await fetch("http://localhost:3000/entry/getting-entries", {
                    method: 'POST',
                    headers: {
                        "Content-Type" : "application/json",
                        token: localStorage.token // Pass this as well so that authorization.js will be verified
                    },
                    body: JSON.stringify(body)
                });
                
                const parseRes = await response.json();
                console.log(parseRes);
                setEntries(parseRes);
            } catch (err) {
                console.log(err.message);
            }
        }
    
        useEffect(() => {
            getEntries();
        }, []); // Brackets make it so we only make one request
    return(
        <div>
            <h1>Welcome to your dashboard</h1>
            <div>
                {entry.forEach(acne => {
                    acne.severity;
                })}
            </div>
        </div>
    )
};
export default Overview;