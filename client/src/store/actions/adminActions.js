import { getAllCodeService } from '../../services/userService';
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

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data:genderData
})

export const fetchGenderFailed = () => ({
    ttype: actionTypes.FETCH_GENDER_FAILED,
    data:genderData
})
    
