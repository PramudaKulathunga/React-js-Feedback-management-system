function validation(values) {
    let error = {}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const password_pattern1 = /^[a-zA-Z0-9]{8,}$/
    const password_pattern2 = /^(?=.*\d)[a-zA-Z0-9]{8,}$/
    const password_pattern3 = /^(?=.*[a-z])[a-zA-Z0-9]{8,}$/
    const password_pattern4 = /^(?=.*[A-Z])[a-zA-Z0-9]{8,}$/

    if (values.email === "") {
        error.email = "Email should not be empty"
    }
    else if (!email_pattern.test(values.email)) {
        error.email = "Email didn't match"
    }
    else {
        error.email = ""
    }


    if (values.password === "") {
        error.password = "Password should not be empty"
    }
    else if (!password_pattern1.test(values.password)) {
        error.password = "Should be more than 8 charactors"
    }
    else if (!password_pattern2.test(values.password)) {
        error.password = "Should be include number"
    }
    else if (!password_pattern3.test(values.password)) {
        error.password = "Should be include lowercase"
    }
    else if (!password_pattern4.test(values.password)) {
        error.password = "Should be include uppercase"
    }
    else {
        error.password = ""
    }


    if (values.password2 === "") {
        error.password2 = "Password should not be empty"
    }
    else if (values.password2[0]!==values.password[0]) {
        error.password2 = "Password didn't match"
    }
    else {
        error.password2 = ""
    }

    return error;
}

export default validation;