import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Entry = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const formattedDate = location.state?.selectedDate; 

    const user_id = location.state?.user_id.userID;
    const [inputs, setInputs] = useState({
        severity: "",
        notes: ""
    })
    const {severity, notes} = inputs;

    const onChange = (e) => {
        setInputs({...inputs , [e.target.name] : e.target.value }) 
    }

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = {user_id, formattedDate, severity, notes};
            const response = await fetch("http://localhost:3000/entry/adding-entry", {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json",
                    token: localStorage.token // Pass this as well so that authorization.js will be verified
                },
                body: JSON.stringify(body)
            });

            const parseRes = await response.json();
            console.log(parseRes);
            navigate('/overview', { // We pass the user_id from overview
                state: { 
                    user_id: user_id
                }
            })

        } catch (err) {
            console.log(err.message);
        }

    }
    return(
        <div>
            <h1>Submit your acne entry</h1>
            <p>Acne Entry for {formattedDate}</p>
            <form onSubmit={onSubmitForm}>
                {/* <input 
                    type="number" 
                    name="severity" 
                    placeholder="(1-10)" 
                    value={severity}
                    onChange={e => onChange(e)}
                /> */}
                <select 
                    name="severity" 
                    value={severity}
                    onChange={e => onChange(e)}
                >
                    <option value="">Select severity</option>
                    {[...Array(10)].map((_, index) => (
                        <option key={index + 1} value={index + 1}>
                            {index + 1}
                        </option>
                    ))}
                </select>

                <input 
                    type="text" 
                    name="notes" 
                    placeholder="notes"
                    value={notes}
                    onChange={e => onChange(e)}
                />

                <button>Submit</button>
            </form>
        </div>
    );
};

export default Entry;