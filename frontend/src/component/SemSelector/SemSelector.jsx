import React, { useState, useEffect } from 'react';
import './SemSelector.css';

function SemSelector({ Condition }) {
 
    const [selectedSemester, setSelectedSemester] = useState("Select Semester");

    useEffect(() => {
        if (Condition === "normal") {
            if (localStorage.getItem('semester')) {
                setSelectedSemester(localStorage.getItem('semester'));
            }
        }
        else if (Condition === "chooseCF") {
            if (localStorage.getItem('semesterCF')) {
                setSelectedSemester(localStorage.getItem('semesterCF'));
            }
        }
        else if (Condition === "chooseLF") {
            if (localStorage.getItem('semesterLF')) {
                setSelectedSemester(localStorage.getItem('semesterLF'));
            }
        }
        else if (Condition === "chooseCourse") {
            if (localStorage.getItem('semesterCourse')) {
                setSelectedSemester(localStorage.getItem('semesterCourse'));
            }
        }
    }, []);

    const handle = (e) => {
        if (Condition === "normal") {
            localStorage.setItem('semester', e.target.value);
        }
        else if (Condition === "chooseCF") {
            localStorage.setItem('semesterCF', e.target.value);
            window.location.reload();
        }
        else if (Condition === "chooseLF") {
            localStorage.setItem('semesterLF', e.target.value);
            window.location.reload();
        }
        else if (Condition === "chooseCourse") {
            localStorage.setItem('semesterCourse', e.target.value);
            window.location.reload();
        }
    }

    return (
        <div>
            <select value={selectedSemester} onChange={handle} className='SemdropSelect'>
                <option className='Semoption1' value={"Select Semester"}>Select Semester</option>
                <option value={"Semester 01"}>Semester 01</option>
                <option value={"Semester 02"}>Semester 02</option>
                <option value={"Semester 03"}>Semester 03</option>
                <option value={"Semester 04"}>Semester 04</option>
                <option value={"Semester 05"}>Semester 05</option>
                <option value={"Semester 06"}>Semester 06</option>
                <option value={"Semester 07"}>Semester 07</option>
                <option value={"Semester 08"}>Semester 08</option>
            </select>
        </div>
    )
}

export default SemSelector