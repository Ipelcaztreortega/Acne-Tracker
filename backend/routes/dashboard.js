const router = require('express').Router();
const pool = require('../db');
const authorization = require('../middleware/authorization');

router.get('/', authorization, async (req, res) => {
    try {
        // req.user has the payload
        // res.json(req.user); // So when we use is-verify, then go on dashboard and authroize, we will get the user's uuid

        const user = await pool.query('SELECT user_id FROM users WHERE user_id = $1', [req.user]);
        res.json(user.rows[0]);
    } catch (err) {
        console.log(err.message);
        return res.status(500).json('Server Error')
    }
})
module.exports = router;