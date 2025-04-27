const router = require('express').Router();
const pool = require('../db');
const authorization = require('../middleware/authorization');

router.post('/adding-entry', authorization, async (req, res) => {
    try {
        // 1. Destructure the req.body
        const {user_id, formattedDate, severity, notes} = req.body;
        // console.log({user_id, formattedDate, severity, notes})

        // 2. Grabbing the user
        const user = await pool.query('SELECT * FROM users WHERE user_id = $1', [
            user_id
        ]);
        if (user.rows.length === 0) {
            return res.status(401).json("User does not exists"); // 401 unauthenticated, 301 is not authorized
        };

        // 2. Enter the user's entry inside the db acne_entry table
        await pool.query(
            "INSERT INTO acne_entries (user_id, entry_date, severity, notes) VALUES ( $1, $2, $3, $4 ) RETURNING *", 
            [user_id, formattedDate, severity, notes]
        );

        res.status(201).json('Acne Entry added successfully');
    } catch (err) {
        console.log(err);
        return res.status(500).json('Server Error');
    }
});

router.post('/getting-entries', authorization, async (req, res) => {
    try {
        const { user_id } = req.body;
        const user_entries = await pool.query('SELECT entry_date, severity, notes, created_at FROM acne_entries WHERE user_id = $1', [user_id]);

        if (user_entries.rows.length === 0) {
            return res.status(201).json("User does not have any entries");
        };

        res.json(user_entries.rows);
        // console.log(user_entries.rows);
    } catch (err) {
        console.log(err.message);
        return res.status(500).json('Server Error')
    };
});
module.exports = router;