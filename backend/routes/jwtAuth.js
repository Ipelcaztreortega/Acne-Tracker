const router = require('express').Router();
const pool = require('../db');
const bcrypt = require('bcryptjs');
const jwtGenerator = require('../utils/jwtGenerator');
const validInfo = require('../middleware/validInfo');
const authorization = require('../middleware/authorization');

// For registering, adding something new to db
router.post('/register', validInfo,  async (req, res) => {
    try {
        // 1. Destructure req.body (name, email, password)
        const {name, email, password} = req.body;

        // 2.  Check if user exists ( if user exists then throw error)
        const user = await pool.query('SELECT * FROM users WHERE user_email = $1', [
            email
        ]);
        if (user.rows.length !== 0) {
            return res.status(401).json("User already exists"); // 401 unauthenticated, 301 is not authorized
        };

        // 3. Bcrypt the password
        const saltRound = 10; // How encrypted it will be
        const salt = await bcrypt.genSalt(saltRound);

        const bcryptPassword = await bcrypt.hash(password, salt); // This is encrypted now

        // 4. Enter the new user inside the db
        const newUser = await pool.query(
            "INSERT INTO users (user_name, user_email, user_password) VALUES ( $1, $2, $3) RETURNING *", 
            [name, email, bcryptPassword]
        );
        
        // 5. Generating our jwt token, we need a jwt secret
        const token = jwtGenerator(newUser.rows[0].user_id);
        res.json({token});

    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error')
    }
});


// login route
router.post('/login', validInfo, async (req, res) => {
    try {
        // 1. Destructure the req.body
        const {name, email, password} = req.body;

        // 2. Check if the user does not exist (if not then we throw error)
        const user = await pool.query('SELECT * FROM users WHERE user_email = $1', [
            email
        ]);

        if (user.rows.length === 0) {
            return res.status(401).json("Password or Email is incorrect");
        };

        // console.log(user.rows[0]);
        // 3. Check if incoming password is the same as the database password
        const validPassword = await bcrypt.compare(password, user.rows[0].user_password); // This returns a boolean

        // console.log(validPassword);

        if (!validPassword) {
            return res.status(401).json('Password or Email is incorrect');
        }

        // 4. Give them the jwt token
        const token = jwtGenerator(user.rows[0].user_id);
        res.json({token});
        
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error')
    }
});

// Refresh check
router.get('/is-verify', authorization, async (req, res) => {
    try {
        res.json(true);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error')
    }
});


module.exports = router;