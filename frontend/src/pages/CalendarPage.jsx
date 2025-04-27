import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // This adds CSS, which look nice
import { Link, useNavigate } from "react-router-dom";


const CalendarPage = () => {
    const [date, setDate] = useState(new Date());
    const [name, setName] = useState('');
    const [userID, setUserID] = useState('');
    const navigate = useNavigate();

    const formattedDate = date.toISOString().split('T')[0]; // date.toISOString() standardizes the date to "2025-04-15", .split('T') seperates the date from the time. 

    async function getUserInfo() {
        try {
            const response = await fetch("http://localhost:3000/dashboard/", {
                method: 'GET',
                headers: { token: localStorage.token }
            });
            const parseRes = await response.json()
            // console.log(parseRes);
            setName(parseRes.user_name);
            setUserID(parseRes.user_id);
        } catch (err) {
            console.log(err.message);
        }
    };

    const goToEntry = (e) => {
        e.preventDefault();
        // This data gets carried in-memory (not visible in the URL) and is available on the next page using useLocation().
        navigate('/entry', {
            state: { 
                selectedDate: formattedDate, 
                user_name: {name},
                user_id: {userID} 
            }
        }); //  This is the second argument, which is an object where you can specify: state
    }

    useEffect(() => {
        getUserInfo();
    }, []); // Brackets make it so we only make one request

    return (
        <div>
            <h2>Track Your Acne: {name}</h2>
            {/*value will have it so it is by default on date */}
            <Calendar onChange={setDate} value={date} /> 
            <p>Selected Date: {date.toDateString()}</p>
            {/* <p>{formattedDate}</p> */}
            <button onClick={(e) => goToEntry(e)}>Next</button>
        </div>
    );
};

export default CalendarPage;
