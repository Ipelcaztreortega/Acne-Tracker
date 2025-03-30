import { Link } from "react-router-dom";
import { useState } from "react";
function Home () {
    const [user, setUser] = useState('Irvin');
    const [signedIn, setSignedIn] = useState(false);
    return(
        <div>
            {signedIn ? (
                <div>
                <p>Welcome in {user}!</p>
                </div>
            ) : (
                <div>
                    <p>Sign up to register!</p>
                    <Link to='/register'>Register</Link>
                </div>
            )}
        </div>
    )
}

export default Home;