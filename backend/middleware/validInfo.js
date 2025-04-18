module.exports = (req, res, next) => {
    const { email, name, password } = req.body;
    function validEmail(userEmail) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    }

    if (req.path === "/register") {

        // console.log(!email.length);
        if (![email, name, password].every(Boolean)) {
            return res.status(401).json("Missing Credentials Invalid Info");

        } else if (!validEmail(email)) { // true or false
            return res.status(401).json("Invalid Email");
        }

    } else if (req.path === "/login") {

        if (![email, password].every(Boolean)) {
            return res.status(401).json("Missing Credentials");

        } else if (!validEmail(email)) {
            return res.status(401).json("Invalid Email");
        }
    }

    next(); // Once everything is okay it will continue on
};