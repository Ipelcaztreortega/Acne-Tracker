import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // This adds CSS, which look nice
// import { Link } from "react-router-dom";


const CalendarPage = () => {
    const [date, setDate] = useState(new Date());

    return (
        <div>
            <h2>Track Your Acne</h2>
            {/*value will have it so it is by default on date */}
            <Calendar onChange={setDate} value={date} /> 
            <p>Selected Date: {date.toDateString()}</p>
        </div>
    );
};

export default CalendarPage;
