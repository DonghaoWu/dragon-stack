import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

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
            <Nav justify variant="tabs" defaultActiveKey="/">
                <Nav.Item>
                    <Link to="/">Create A Dragon</Link>
                </Nav.Item>
                <Nav.Item>
                    <Link to="/account-dragons">My Dragons</Link>
                </Nav.Item>
                <Nav.Item>
                    <Link to="/public-dragons">Public Dragons</Link>
                </Nav.Item>
            </Nav>
        </div>
    )
}

export default SubNav;
