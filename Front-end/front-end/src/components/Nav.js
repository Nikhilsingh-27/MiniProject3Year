import React from 'react';
import { Link } from 'react-router-dom';
const Nav = () => {
    return (
        <div>
            <ul className="nav-ul">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/profile">About</Link>
                </li>
                <li>
                    <Link to="/map">Map</Link>
                </li>
                <li>
                    <Link to="/techinput">Submit Complaint</Link>
                </li>
                {/* <li>
                    <Link to="/info">Technology Info</Link>
                </li> */}

                {/* <li>
                    <Link to="/compare">Compare</Link>
                </li>
                <li>
                    <Link to="/logout">Logout</Link>
                </li>
                 */}
            </ul>
        </div>
    );
}

export default Nav;