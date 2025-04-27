import { Link } from 'react-router-dom'

const Home = () => {
    return(
        <div>
            <h1>Welcome to Acne Tracker!</h1>
            <Link to='/login'>Begin tracking now</Link>
        </div>
    );
};

export default Home;