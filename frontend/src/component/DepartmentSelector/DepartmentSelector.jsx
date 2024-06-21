import React, { useState, useEffect } from 'react';
import './DepartmentSelector.css';

function DepartmentSelector({ Condition }) {

    const [selectedDepartment, setSelectedDepartment] = useState("Select Department");

    useEffect(() => {
        if (Condition === "normal") {
            if (localStorage.getItem('semester')) {
                setSelectedDepartment(localStorage.getItem('department'));
            }
        }
        else if (Condition === "chooseLec") {
            if (localStorage.getItem('departmentLec')) {
                setSelectedDepartment(localStorage.getItem('departmentLec'));
            }
        }
        else if (Condition === "chooseSTD") {
            if (localStorage.getItem('departmentSTD')) {
                setSelectedDepartment(localStorage.getItem('departmentSTD'));
            }
        }
    }, []);

    const handle = (e) => {
        if (Condition === "normal") {
            localStorage.setItem('department', e.target.value);
        }
        else if (Condition === "chooseLec") {
            localStorage.setItem('departmentLec', e.target.value);
            window.location.reload();
        }
        else if (Condition === "chooseSTD") {
            localStorage.setItem('departmentSTD', e.target.value);
            window.location.reload();
        }
    }

    return (
        <div>
            <select value={selectedDepartment} onChange={handle} className='DepdropSelect'>
                <option className='Depoption1' value={"Select Department"}>Select Department</option>
                <option value={"Department of Computer Engineering"}>Department of Computer Engineering</option>
                <option value={"Department of Electrical and Electronic Engineering"}>Department of Electrical & Electronic Engineering</option>
                <option value={"Department of Mechanical and Process Engineering"}>Department of Mechanical & Process Engineering</option>
                <option value={"Department of Civil Engineering"}>Department of Civil Engineering</option>
                <option value={"Not Selected"}>Not Selected</option>
            </select>
        </div>
    )
}

export default DepartmentSelector