import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './DropDownMenu_MA.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const DropDownMenu_MA = () => {
    const [open2, setOpen2] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpen2(false);
            }
        };

        if (open2) {
            window.addEventListener("click", handleOutsideClick);
        }

        return () => {
            window.removeEventListener("click", handleOutsideClick);
        };
    }, [open2]);

    const handleMenuClick = (event) => {
        event.stopPropagation();
        setOpen2(!open2);
    };

    return (
        <div>
            <div onClick={handleMenuClick}>
                <FontAwesomeIcon icon={faBars} className='menuIcon2' />
            </div>

            <div ref={menuRef} className={`menu_keys2 ${open2 ? 'active' : 'inactive'}`}>
                <ul>
                    <Link to='/Home_MA' style={{ textDecoration: 'none' }}><DropdownItem2 text={"Dashboard"} /></Link>
                    <Link to='/FeedbackPage' style={{ textDecoration: 'none' }}><DropdownItem2 text={"Feedback"} /></Link>
                    <Link to='/Lecturer' style={{ textDecoration: 'none' }}><DropdownItem2 text={"Lectures list"} /></Link>
                    <Link to='/Course' style={{ textDecoration: 'none' }}><DropdownItem2 text={"Course list"} /></Link>
                    <Link to='/StudentList' style={{ textDecoration: 'none' }}><DropdownItem2 text={"Student list "} /></Link>
                    <Link to='/CourseAllocation' style={{ textDecoration: 'none' }}><DropdownItem2 text={"Course allocation"} /></Link>
                    <Link to='/Summary' style={{ textDecoration: 'none' }}><DropdownItem2 text={"Summary"} /></Link>
                    <Link to='/QA' style={{ textDecoration: 'none' }}><DropdownItem2 text={"Questions"} /></Link>
                    <Link to='/PasswordManager' style={{ textDecoration: 'none' }}><DropdownItem2 text={"Password Manager"} /></Link>
                    <Link to='/ResetPwd' style={{ textDecoration: 'none' }}><DropdownItem2 text={"Reset password"} /></Link>
                    <Link to='/' style={{ textDecoration: 'none' }}><DropdownItem2 text={"Log out"} /></Link>
                </ul>
            </div>

        </div>
    )
}

function DropdownItem2(props) {
    return (
        <li className='dropDownItem2'>
            <a>{props.text}</a>
        </li>
    )
}

export default DropDownMenu_MA