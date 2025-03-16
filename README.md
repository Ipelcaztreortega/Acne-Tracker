
### User Flow
1. Authentication & Account Creation

- User clicks "Sign in" .
- If it's their first time, a new account is created in your PostgreSQL database.
- If returning, they are authenticated and redirected to the dashboard.

2. Dashboard & Calendar View

- A calendar is displayed, showing past acne logs with color-coded severity levels (if applicable).
- User clicks on a date to view past entries or log a new entry.

3. Logging an Acne Entry

- User selects a date (default: today).
- User fills out a form with inputs like:
- Severity (scale of 1-10 or mild/moderate/severe)
- Breakout Location (forehead, cheeks, chin, etc.)
- Possible Triggers (diet, stress, hormones, products, etc.)
- Treatment Used (medications, creams, lifestyle changes)
- Notes (optional reflection)

4. Saving & Updating Entries

- When the form is submitted, the data is stored in PostgreSQL.
- User can edit past entries from the calendar.

5. Insights & Trends (Optional Advanced Feature)

- Charts to visualize breakout frequency, triggers, and treatment effectiveness over time.
- Filters to compare different time periods.


### Technology Breakdown
**Frontend (React + Vite + Tailwind CSS)**  

- Calendar UI (e.g., react-big-calendar)
- Form for acne logging
- Charts (if adding analytics later)

**Backend (Node.js + Express)**

- Routes for fetching, updating, and deleting acne logs
- Middleware for authentication ()

**Database (PostgreSQL)**

- Users Table (id, email, name, createdAt)
- Acne Logs Table (id, userId, date, severity, location, triggers, treatment, notes)

**Authentication **

- Store session tokens (or JWT for API auth)


### Install dependencies in this frontend directory
```
npm install react-router-dom axios dayjs react-calendar
```


### First initialize the backend project
```
npm init -y
```

### Install dependencies in this backend directory
```
npm install bcryptjs jsonwebtoken dotenv express-validator cookie-parser cors pg
```

**What each package does:**

- bcryptjs → Hashes passwords before storing them in the database.
- jsonwebtoken → Creates & verifies JWT tokens for authentication.
- dotenv → Loads environment variables (e.g., secret keys).
- express-validator → Validates user input (e.g., email format, password strength).
- cookie-parser → Helps handle HTTP-only cookies.
- cors → Enables cross-origin requests (important for frontend-backend communication).
- pg → Used to connect to postgreSQL db


