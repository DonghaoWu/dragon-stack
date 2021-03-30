import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import './styles.css';

const SubNav = () => {
    const [reRender, setReRender] = useState(false);

    const handleClick = () => {
        setReRender(!reRender);
    }

    const history = useHistory();
    const pathname = history.location.pathname;

    return (
        <div className='sub-nav-container'>
            <Link to="/" onClick={() => handleClick()} className={pathname === '/' ? `seletedTag` : `unSelectedTag`}>Create A Dragon</Link>
            <Link to="/account-dragons" onClick={() => handleClick()} className={pathname === '/account-dragons' ? `seletedTag` : `unSelectedTag`}>My Dragons</Link>
            <Link to="/public-dragons" onClick={() => handleClick()} className={pathname === '/public-dragons' ? `seletedTag` : `unSelectedTag`}>Public Dragons</Link>
        </div>
    )
}

export default SubNav;
