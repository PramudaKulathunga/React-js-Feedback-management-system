import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './DropDownMenu_STD.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const DropDownMenu_STD = () => {
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        if (open) {
            window.addEventListener("click", handleOutsideClick);
        }

        return () => {
            window.removeEventListener("click", handleOutsideClick);
        };
    }, [open]);

    const handleMenuClick = (event) => {
        event.stopPropagation();
        setOpen(!open);
    };

    return (
        <div>
            <div onClick={handleMenuClick}>
                <FontAwesomeIcon icon={faBars} className='menuIcon' />
            </div>

            <div ref={menuRef} className={`menu_keys ${open ? 'active' : 'inactive'}`}>
                <ul>
                    <Link to='/Home_STD' style={{ textDecoration: 'none' }}><DropdownItem text={"Dashboard"} /></Link>
                    <Link to='/ResetPwd' style={{ textDecoration: 'none' }}><DropdownItem text={"Reset password"} /></Link>
                    <Link to='/' style={{ textDecoration: 'none' }}><DropdownItem text={"Log out"} /></Link>
                </ul>
            </div>
        </div>
    )
}

function DropdownItem(props) {
    return (
        <li className='dropDownItem'>
            <a>{props.text}</a>
        </li>
    )
}

export default DropDownMenu_STD