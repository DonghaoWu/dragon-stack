import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './styles.css';

const SubNav = () => {
    const [keys, setKeys] = useState({
        key1: false,
        key2: false,
        key3: false
    })

    const handleClick = (key) => {
        setKeys({ [key]: true })
    }

    return (
        <div className='sub-nav-container'>
            <Link to="/">Create A Dragon</Link>
            <Link to="/account-dragons">My Dragons</Link>
            <Link to="/public-dragons">Public Dragons</Link>
        </div>
    )
}

export default SubNav;
