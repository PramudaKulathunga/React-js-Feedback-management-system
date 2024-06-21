import React from 'react';
import './Header_STD.css';
import DropDownMenu_STD from '../DropDownMenu_STD/DropDownMenu_STD';

function Header_STD() {
    return (
        <div className='container_STD'>
            <DropDownMenu_STD/>
            <div className='ss_STD'></div>
            <p className='text_STD'>Feedback Management System</p>
        </div>
    )
}

export default Header_STD