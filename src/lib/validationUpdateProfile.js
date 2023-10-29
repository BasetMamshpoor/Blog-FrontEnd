export default function validation(state = {}) {
    let errors = {}

    //username
    if (!state.username) {
        errors.username = 'username can not be empty'
    } else if (!state.username.trim()) {
        errors.username = 'username is wrong!'
    } else if (!/^[A-Za-z][A-Za-z0-9]*$/.test(state.usernae)) {
        errors.username = 'Username must contain English letters and numbers'
    } else if (state.username.length > 10) {
        errors.username = 'max username length is 10 character'
    } else {
        delete errors.username
    }
    //email
    if (!state.email) {
        delete errors.email
    } else if (!/^\S+@\S+\.\S+$/.test(state.email)) {
        errors.email = 'email format is wrong!'
    } else {
        delete errors.email
    }

    return errors
}