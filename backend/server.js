const express = require("express");
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "fms"
})


//Insert queries
app.post('/fms', (req, res) => {
    const sql = "INSERT INTO forgotpassword(`email`) VALUES (?)";
    const values = [
        req.body.email
    ]
    db.query(sql, [values], (err, data) => {
        if (err) {
            return res.json("Error");
        }
        return res.json(data);
    })
})

app.post('/fms/login', (req, res) => {
    const sql = "INSERT INTO login(`name`,`email`,`password`,`password2`,`department`,`position`,`batchNo`,`regNo`,`indexNo`,`semester`) VALUES (?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.password,
        req.body.password2,
        req.body.department,
        req.body.position,
        req.body.batchNo,
        req.body.regNo,
        req.body.indexNo,
        req.body.semester
    ]
    db.query(sql, [values], (err, data) => {
        if (err) {
            return res.json("Error");
        }
        return res.json(data);
    })
})

app.post('/fms/coursefeedback', (req, res) => {
    const sql = "INSERT INTO coursefeedback(`owner`,`subject`,`semester`,`q1`,`q2`,`q3`,`q4`,`q5`,`q6`,`q7`,`q8`,`q9`,`q10`,`q11`,`q12`,`q13`,`q14`,`q15`,`comment`) VALUES (?)";
    const values = [
        req.body.owner,
        req.body.course,
        req.body.semester,
        req.body.one,
        req.body.two,
        req.body.three,
        req.body.four,
        req.body.five,
        req.body.six,
        req.body.seven,
        req.body.eight,
        req.body.nine,
        req.body.ten,
        req.body.eleven,
        req.body.twelve,
        req.body.thirteen,
        req.body.fourteen,
        req.body.fifteen,
        req.body.comment
    ]
    db.query(sql, [values], (err, data) => {
        if (err) {
            return res.json("Error");
        }
        return res.json(data);
    })
})

app.post('/fms/lecturerfeedback', (req, res) => {
    const sql = "INSERT INTO lecturerfeedback(`owner`,`teacher`,`subject`,`semester`,`q1`,`q2`,`q3`,`q4`,`q5`,`q6`,`q7`,`q8`,`q9`,`q10`,`q11`,`q12`,`comment`) VALUES (?)";
    const values = [
        req.body.owner,
        req.body.teacher,
        req.body.course,
        req.body.semester,
        req.body.one,
        req.body.two,
        req.body.three,
        req.body.four,
        req.body.five,
        req.body.six,
        req.body.seven,
        req.body.eight,
        req.body.nine,
        req.body.ten,
        req.body.eleven,
        req.body.twelve,
        req.body.comment
    ]
    db.query(sql, [values], (err, data) => {
        if (err) {
            return res.json("Error");
        }
        return res.json(data);
    })
})

app.post('/fms/notice', (req, res) => {
    const sql = "INSERT INTO notice(`code`,`notice`,`status`) VALUES (?)";
    const values = [
        req.body.code,
        req.body.notice,
        req.body.status
    ]
    db.query(sql, [values], (err, data) => {
        if (err) {
            return res.json("Error");
        }
        return res.json(data);
    })
})

app.post('/fms/lecturerdetails', (req, res) => {
    const sql = "INSERT INTO lecturerdetails(`lec_id`,`name`,`position`,`department`) VALUES (?)";
    const values = [
        req.body.lecId,
        req.body.name,
        req.body.position,
        req.body.department
    ]
    db.query(sql, [values], (err, data) => {
        if (err) {
            return res.json("Error");
        }
        return res.json(data);
    })
})


//Select queries
app.post('/login', (req, res) => {

    const { condition, email, password, department } = req.body;

    if (condition === "normal") {
        const sql = "SELECT * FROM login WHERE `email`=? AND `password`=?";
        db.query(sql, [email, password], (err, data) => {
            if (err) {
                return res.json("Error");
            }
            if (data.length > 0) {
                return res.json(data);
            } else {
                return res.json("Failed");
            }
        })
    }

    else if (condition === "Student") {

        if (department === "Select Department") {
            const sql = "SELECT * FROM login WHERE `position`=?";
            db.query(sql, condition, (err, data) => {
                if (err) {
                    return res.json("Error");
                }
                res.json(data);
            })
        }
        else {
            const sql = "SELECT * FROM login WHERE `position`=? AND `department`=?";
            db.query(sql, [condition, department], (err, data) => {
                if (err) {
                    return res.json("Error");
                }
                res.json(data);
            })
        }
    }
})

app.post('/forgotpassword', (req, res) => {

    const { condition, email } = req.body;
    if (condition === "check") {
        const sql = "SELECT email FROM forgotpassword WHERE `email`=?";
        db.query(sql, email, (err, data) => {
            if (err) {
                return res.json("Error");
            }
            if (data.length > 0) {
                return res.json("available");
            } else {
                return res.json("unavailable");
            }
        })
    }
    else if (condition === "all") {
        const sql = 'SELECT * FROM forgotpassword';

        db.query(sql, (err, results) => {
            if (err) {
                return res.json("Error");
            }
            res.json(results);
        });
    }
})

app.post('/subject', (req, res) => {

    const { condition, department, semester, semester2 } = req.body;

    if (condition === "normal") {
        const sql = "SELECT * FROM subject WHERE `department`=? AND `semester`=?";
        db.query(sql, [department, semester], (err, data) => {
            if (err) {
                return res.json("Error");
            }
            if (data.length > 0) {
                return res.json(data);
            } else {
                return res.json("Failed");
            }
        })
    }

    else if (condition == "course") {

        if (semester2 === "Select Semester") {
            const sql = "SELECT * FROM subject";
            db.query(sql, (err, data) => {
                if (err) {
                    return res.json("Error");
                }
                if (data.length > 0) {
                    return res.json(data);
                } else {
                    return res.json("Failed");
                }
            });
        }
        else {
            const sql = "SELECT * FROM subject WHERE `semester`=?";
            db.query(sql, semester2, (err, data) => {
                if (err) {
                    return res.json("Error");
                }
                if (data.length > 0) {
                    return res.json(data);
                } else {
                    return res.json("Failed");
                }
            });
        }
    }
})

app.post('/teacher', (req, res) => {

    const { condition, department, semester } = req.body;

    if (condition === "normal") {
        const sql = "SELECT * FROM teacher WHERE `department`=? AND `semester`=?";
        db.query(sql, [department, semester], (err, data) => {
            if (err) {
                return res.json("Error");
            }
            if (data.length > 0) {
                return res.json(data);
            } else {
                return res.json("Failed");
            }
        })
    }

    else if (condition == "all") {
        const sql = "SELECT * FROM teacher";
        db.query(sql, (err, data) => {
            if (err) {
                return res.json("Error");
            }
            if (data.length > 0) {
                return res.json(data);
            } else {
                return res.json("Failed");
            }
        });
    }
})

app.post('/coursefeedback', (req, res) => {

    const semester = req.body.value1;

    if (semester === "Select Semester") {
        const sql = 'SELECT * FROM coursefeedback';

        db.query(sql, (err, results) => {
            if (err) {
                return res.json("Error");
            }
            res.json(results);
        });
    }
    else {
        const sql = 'SELECT * FROM coursefeedback WHERE `semester`=?';

        db.query(sql, semester, (err, results) => {
            if (err) {
                return res.json("Error");
            }
            res.json(results);
        });
    }
});

app.post('/lecturerfeedback', (req, res) => {

    const semester = req.body.value2;
    if (semester === "Select Semester") {
        const sql = 'SELECT * FROM lecturerfeedback';

        db.query(sql, (err, results) => {
            if (err) {
                return res.json("Error");
            }
            res.json(results);
        });
    }
    else {
        const sql = 'SELECT * FROM lecturerfeedback WHERE `semester`=?';

        db.query(sql, semester, (err, results) => {
            if (err) {
                return res.json("Error");
            }
            res.json(results);
        });
    }
});

app.post('/lecturerdetails', (req, res) => {
    const department = req.body.value1;

    if (department === "Select Department") {
        const sql = 'SELECT * FROM lecturerdetails';

        db.query(sql, (err, results) => {
            if (err) {
                return res.json("Error");
            }
            res.json(results);
        });
    }
    else {
        const sql = 'SELECT * FROM lecturerdetails WHERE `department`=?';

        db.query(sql, department, (err, results) => {
            if (err) {
                return res.json("Error");
            }
            res.json(results);
        });
    }
});

app.post('/coursequestion', (req, res) => {
    const sql = 'SELECT * FROM coursequestion';

    db.query(sql, (err, results) => {
        if (err) {
            return res.json("Error");
        }
        res.json(results);
    });
});

app.post('/lecturerquestion', (req, res) => {
    const sql = 'SELECT * FROM lecturerquestion';

    db.query(sql, (err, results) => {
        if (err) {
            return res.json("Error");
        }
        res.json(results);
    });
});

app.post('/notice', (req, res) => {
    const sql = 'SELECT * FROM notice';

    db.query(sql, (err, results) => {
        if (err) {
            return res.json("Error");
        }
        res.json(results);
    });
});

app.post('/coursequestion', (req, res) => {
    const sql = 'SELECT * FROM coursequestion';

    db.query(sql, (err, results) => {
        if (err) {
            return res.json("Error");
        }
        res.json(results);
    });
});

app.post('/lecturerfeedback', (req, res) => {
    const sql = 'SELECT * FROM lecturerfeedback';

    db.query(sql, (err, results) => {
        if (err) {
            return res.json("Error");
        }
        res.json(results);
    });
});



//Update queries
app.put('/login/:email', (req, res) => {
    const email = req.params.email;
    const { condition, batchNo, regNo, indexNo, semester, password, password2, name, department, question } = req.body;

    if (condition === "resetPwd") {

        const sql = "UPDATE login SET `password` = ?, `password2` = ? WHERE `email` = ?";
        db.query(sql, [password, password2, email], (err, data) => {
            if (err) {
                return res.json("Error");
            }
            return res.json("Updates")
        })
    }

    if (condition === "forgotPwd") {

        const sql = "UPDATE login SET `password` = ?, `password2` = ? WHERE `email` = ?";
        db.query(sql, [question, question, email], (err, data) => {
            if (err) {
                return res.json("Error");
            }
            return res.json("Updates")
        })
    }

    else if (condition === "edit") {
        const sql = "UPDATE login SET `batchNo` = ?, `regNo` = ?,`indexNo`=?,`semester`=? WHERE `email` = ?";
        db.query(sql, [batchNo, regNo, indexNo, semester, email], (err, data) => {
            if (err) {
                return res.json("Error");
            }
            return res.json("Updates")
        })
    }

    else if (condition === "editAdmin") {
        const sql = "UPDATE login SET `name` = ?, `department` = ?, `batchNo` = ?, `regNo` = ?,`indexNo`=?,`semester`=? WHERE `email` = ?";
        db.query(sql, [name, department, batchNo, regNo, indexNo, semester, email], (err, data) => {
            if (err) {
                return res.json("Error");
            }
            return res.json("Updates")
        })
    }

    else {
        return res.status(400).send('Invalid number of columns to update');
    }
})



app.put('/notice/:id', (req, res) => {
    const id = req.params.id;
    const { code, notice, status } = req.body;

    const sql = "UPDATE notice SET `code` = ?, `notice` = ?, `status` = ? WHERE `id` = ?";
    db.query(sql, [code, notice, status, id], (err, data) => {
        if (err) {
            return res.json("Error");
        }
        return res.json("Updates")
    })
})

app.put('/lecturerdetails/:id', (req, res) => {
    const id = req.params.id;
    const { lecId, name, position, department } = req.body;

    const sql = "UPDATE lecturerdetails SET `lec_id` = ?, `name` = ?, `position` = ?, `department` = ? WHERE `id` = ?";
    db.query(sql, [lecId, name, position, department, id], (err, data) => {
        if (err) {
            return res.json("Error");
        }
        return res.json("Updates")
    })
})

app.put('/subject/:id', (req, res) => {
    const id = req.params.id;
    const { semester, department, subject1, subject2, subject3, subject4, subject5, subject6, subject7 } = req.body;

    const sql = "UPDATE subject SET `semester` = ?, `department` = ?, `subject1` = ?, `subject2` = ?, `subject3` = ?, `subject4` = ?, `subject5` = ?, `subject6` = ?, `subject7` = ? WHERE `id` = ?";
    db.query(sql, [semester, department, subject1, subject2, subject3, subject4, subject5, subject6, subject7, id], (err, data) => {
        if (err) {
            return res.json("Error");
        }
        return res.json("Updates")
    })
})

app.put('/teacher/:id', (req, res) => {
    const id = req.params.id;
    const { i, lecture } = req.body;

    if (i == 0) {
        const sql = "UPDATE teacher SET `teacher1` = ? WHERE `id` = ?";
        db.query(sql, [lecture, id], (err, data) => {
            if (err) {
                return res.json("Error");
            }
            return res.json("Updates")
        })
    }
    else if (i == 1) {
        const sql = "UPDATE teacher SET `teacher2` = ? WHERE `id` = ?";
        db.query(sql, [lecture, id], (err, data) => {
            if (err) {
                return res.json("Error");
            }
            return res.json("Updates")
        })
    }
    else if (i == 2) {
        const sql = "UPDATE teacher SET `teacher3` = ? WHERE `id` = ?";
        db.query(sql, [lecture, id], (err, data) => {
            if (err) {
                return res.json("Error");
            }
            return res.json("Updates")
        })
    }
    else if (i == 3) {
        const sql = "UPDATE teacher SET `teacher4` = ? WHERE `id` = ?";
        db.query(sql, [lecture, id], (err, data) => {
            if (err) {
                return res.json("Error");
            }
            return res.json("Updates")
        })
    }
    else if (i == 4) {
        const sql = "UPDATE teacher SET `teacher5` = ? WHERE `id` = ?";
        db.query(sql, [lecture, id], (err, data) => {
            if (err) {
                return res.json("Error");
            }
            return res.json("Updates")
        })
    }
    else if (i == 5) {
        const sql = "UPDATE teacher SET `teacher6` = ? WHERE `id` = ?";
        db.query(sql, [lecture, id], (err, data) => {
            if (err) {
                return res.json("Error");
            }
            return res.json("Updates")
        })
    }
    else if (i == 6) {
        const sql = "UPDATE teacher SET `teacher7` = ? WHERE `id` = ?";
        db.query(sql, [lecture, id], (err, data) => {
            if (err) {
                return res.json("Error");
            }
            return res.json("Updates")
        })
    }
})

app.put('/coursequestion/:id', (req, res) => {
    const id = req.params.id;
    const question = req.body.question;

    const sql = "UPDATE coursequestion SET `question` = ? WHERE `id` = ?";
    db.query(sql, [question, id], (err, data) => {
        if (err) {
            return res.json("Error");
        }
        return res.json("Updates")
    })
})

app.put('/lecturerquestion/:id', (req, res) => {
    const id = req.params.id;
    const question = req.body.question;

    const sql = "UPDATE lecturerquestion SET `question` = ? WHERE `id` = ?";
    db.query(sql, [question, id], (err, data) => {
        if (err) {
            return res.json("Error");
        }
        return res.json("Updates")
    })
})


//Delete queries
app.delete('/notice/:id', (req, res) => {
    const id = req.params.id;

    const sql = "DELETE FROM notice WHERE id = ?";
    db.query(sql, id, (err, data) => {
        if (err) {
            return res.json("Error");
        }
        return res.json("Updates")
    })
});

app.delete('/coursefeedback/:id', (req, res) => {
    const id = req.params.id;

    const sql = "DELETE FROM coursefeedback WHERE id = ?";
    db.query(sql, id, (err, data) => {
        if (err) {
            return res.json("Error");
        }
        return res.json("Updates")
    })
});

app.delete('/lecturerfeedback/:id', (req, res) => {
    const id = req.params.id;

    const sql = "DELETE FROM lecturerfeedback WHERE id = ?";
    db.query(sql, id, (err, data) => {
        if (err) {
            return res.json("Error");
        }
        return res.json("Updates")
    })
});

app.delete('/lecturerdetails/:id', (req, res) => {
    const id = req.params.id;

    const sql = "DELETE FROM lecturerdetails WHERE id = ?";
    db.query(sql, id, (err, data) => {
        if (err) {
            return res.json("Error");
        }
        return res.json("Updates")
    })
});

app.delete('/login/:email', (req, res) => {
    const email = req.params.email;

    const sql = "DELETE FROM login WHERE email = ?";
    db.query(sql, email, (err, data) => {
        if (err) {
            return res.json("Error");
        }
        return res.json("Updates")
    })
});

app.delete('/forgotpassword/:id', (req, res) => {
    const id = req.params.id;

    const sql = "DELETE FROM forgotpassword WHERE id = ?";
    db.query(sql, id, (err, data) => {
        if (err) {
            return res.json("Error");
        }
        return res.json("Updates")
    })
});


app.listen(8081, () => {
    console.log("listening");
}) 