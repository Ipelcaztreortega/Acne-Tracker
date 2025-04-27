import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';


const Overview = () => {
        const [entry, setEntries] = useState([]); // When you receive multiple entries (json objects), you need to use an array
        const location = useLocation();
        const user_id = location.state?.user_id;
        console.log("Overview", user_id);

        // The reason we put all of this in the useEffect is because we keep asking for user_id so like that's messing with getEntries
        useEffect(() => {
            const getEntries = async () => {
                try {
                    const body = { user_id };
                    const response = await fetch("http://localhost:3000/entry/getting-entries", {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json",
                            token: localStorage.token
                        },
                        body: JSON.stringify(body)
                    });
                    
                    const parseRes = await response.json();
                    // console.log(parseRes);
                    setEntries(parseRes);
                } catch (err) {
                    console.log(err.message);
                }
            };
        
            if (user_id) {
                getEntries();
            }
        }, [user_id]); // Brackets make it so we only make one request

    return(
        <div>
            <h1>Welcome to your overview</h1>
            <div>
            {entry
                .sort((a, b) => new Date(b.created_at) - new Date(a.created_at)) // newest first
                .map((acne, idx) => (   
                    <div key={idx} >
                        <p>Entry Date: {new Date(acne.entry_date).toLocaleDateString()}</p>
                        <p>Severity: {acne.severity}</p>
                        <p>Notes: {acne.notes}</p>
                        <p>Post created: {new Date(acne.created_at).toLocaleString()}</p> {/* Format date and time */}
                    </div>
            ))}
            </div>
        </div>
    )
};
export default Overview;