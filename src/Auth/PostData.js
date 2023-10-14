import axios from 'axios';

const postNewUser = async (info) => {
    return await axios.post('/accounts/users/',
        { ...info },
        {
            headers:
                { 'Content-Type': 'multipart/form-data' }
        })
}
const postUser = async (info) => {
    return await axios.post('/token/',
        { ...info },
        {
            headers:
                { 'Content-Type': 'application/json' }
        })
}

export { postNewUser, postUser };