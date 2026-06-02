import axios from '../axios';

const handleLoginApi = (email, password) => {
    return axios.post('/api/login', {
        email: email,
        password: password
    });
}

const getAllUsers = (inputId) => {
    //template string
    return axios.get(`/api/get-all-users?id=${inputId}`)
}

const createNewUserService = (data) => {
    console.log('chec data from sevice : ', data)
    return axios.post('/api/create-new-user', data)
}

const deleteUserService = (userId) => {
    // return axios.delete('/api/delete-user', {id: userId})
    return axios.delete('/api/delete-user', {
        data: {
            id: userId
        }
    });

}

const editUserService = (inputData) => {
    return axios.put('/api/edit-user', inputData);
}
export default {
    handleLoginApi, getAllUsers, createNewUserService, deleteUserService, editUserService
}