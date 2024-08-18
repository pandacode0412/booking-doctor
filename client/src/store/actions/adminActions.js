import { getAllCodeService , createNewUserService } from '../../services/userService';
import actionTypes from './actionTypes';

export const adminLoginSuccess = (adminInfo) => ({
    type: actionTypes.ADMIN_LOGIN_SUCCESS,
    adminInfo: adminInfo
})

export const adminLoginFail = () => ({
    type: actionTypes.ADMIN_LOGIN_FAIL
})

export const processLogout = () => ({
    type: actionTypes.PROCESS_LOGOUT
})

export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({type:actionTypes.FETCH_GENDER_START})

            let res = await getAllCodeService("GENDER")
            if(res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data))
            }else {
                dispatch(fetchGenderFailed())
            }
        } catch (error) {
             dispatch(fetchGenderFailed())         
        }
    }
}

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITON_SUCCESS,
    data: positionData
})

export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITON_FAILED,
    
})

export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("POSITION")
            if(res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data))
            }else {
                dispatch(fetchPositionFailed())
            }
        } catch (error) {
             dispatch(fetchPositionFailed()) 
             console.log('fetchPositionFailed error' , error)        
        }
    }
}

export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("ROLE")
            if(res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data))
            }else {
                dispatch(fetchRoleFailed())
            }
        } catch (error) {
             dispatch(fetchRoleFailed()) 
             console.log('fetchRoleFailed error' , error)        
        }
    }
}

export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {

            let res = await createNewUserService(data)
            if(res && res.errCode === 0) {
                dispatch(saveUserSuccess())
            }else {
                dispatch(saveUserFailed())
            }
        } catch (error) {
             dispatch(saveUserFailed())       
             console.log("saveUserFailed" , error)  
        }
    }
}



export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED,
    
})


export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data:genderData
})

export const fetchGenderFailed = () => ({
    ttype: actionTypes.FETCH_GENDER_FAILED,
    data:genderData
})
    
