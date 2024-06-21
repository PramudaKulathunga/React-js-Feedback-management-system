import React from 'react';
import './Header_MA.css';
import DropDownMenu_MA from '../DropDownMenu_MA/DropDownMenu_MA';

function Header_MA() {
    return (
        <div className='container_MA'>
            <DropDownMenu_MA/>
            <div className='ss_MA'></div>
            <p className='text_MA'>Feedback Management System</p>
        </div>
    )
}

export default Header_MA