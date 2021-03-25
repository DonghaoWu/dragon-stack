import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

const SubNav = () => {
    const [keys, setKeys] = useState([false, false, false]);

    const handleClick = (index) => () => {
        let newKeys = [false, false, false];
        newKeys[index] = true;
        setKeys(newKeys);
    }

    return (
        <div className='sub-nav-container'>
            <Link to="/" onClick={handleClick(0)} className={keys[0] ? `seletedTag` : `unSelectedTag`}>Create A Dragon</Link>
            <Link to="/account-dragons" className={keys[1] ? `seletedTag` : `unSelectedTag`} onClick={handleClick(1)}>My Dragons</Link>
            <Link to="/public-dragons" className={keys[2] ? `seletedTag` : `unSelectedTag`} onClick={handleClick(2)}>Public Dragons</Link>
        </div>
    )
}

export default SubNav;
