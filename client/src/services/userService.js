import axios from "../axios";

const handleLoginApi = (userEmail, userPassword) => {
    return axios.post('/api/login', { email: userEmail, password: userPassword });
}

const getAllUsers = (inputId) => {
    return axios.post(`/api/get-all-users?id=${inputId}`);
}

const createNewUserService = (data) => {
    return axios.post('/api/create-new-user', data)
}

const deleteUserService = (userId) => {
    return axios.delete('/api/delete-user', {
        data: {
            id: userId
        }
    })
}

const getAllCodeService = (inputType) => {
    return axios.get(`/api/getallcode?type=${inputType}`)
}

const getTopDoctorHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`)
}

const getAllDoctors = () => {
    return axios.get(`/api/top-all-doctors`)
}

const saveDetailDoctorService = (data) => {
    return axios.post(`/api/save-infor-doctors`, data)
}

const getDetailInforDoctor = (inputId) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${inputId}`)
}

const saveBulkScheduleDoctor = (data) => {
    return axios.post(`/api/bulk-create-schedule`, data)
}

const getScheduleDoctorByDate = (doctorId, date) => {
    return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`)


}
const editUserService = (inputData) => {
    return axios.put(`/api/edit-user`, inputData)


}
export {
    editUserService,
    getScheduleDoctorByDate,
    saveBulkScheduleDoctor,
    getDetailInforDoctor,
    saveDetailDoctorService,
    getAllDoctors,
    getTopDoctorHomeService,
    getAllCodeService, handleLoginApi,
    getAllUsers, createNewUserService,
    deleteUserService
}