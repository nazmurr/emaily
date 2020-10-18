import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Emaily!</h1>
            <p>Collect feedback from your users.</p>
            <Link className="btn btn-large" to="/surveys">Get Started</Link>
        </div>
    )
}

export default Landing;