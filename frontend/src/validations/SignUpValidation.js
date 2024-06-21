function validation(values) {
    let error = {}

    if (values.name === "") {
        error.name = "Name should not be empty"
    }
    else {
        error.name = ""
    }

    if (values.regNo === "") {
        error.regNo = "Registration number should not be empty"
    }
    else {
        error.regNo = ""
    }

    if (values.indexNo === "") {
        error.indexNo = "Index number should not be empty"
    }
    else {
        error.indexNo = ""
    }
    
    return error;
}

export default validation;