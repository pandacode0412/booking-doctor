import React , {Component} from 'react';
import {connect} from 'react-redux'
import './DoctorExtraInfor.scss'
import {FormattedMessage} from 'react-intl'
import Select from 'react-select'
import * as actions from '../../../store/actions'
import { CRUD_ACTIONS, LANGUAGES , dateFormat } from '../../../utils';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment'
import {toast} from 'react-toastify'
import _ from 'lodash'
class ManageSchedule extends Component {

    constructor(props) {
        super(props)
        this.state = {
           isShowDetailInfor:false
           
        }
    }

    componentDidMount() {
        
    }

    componentDidUpdate(prevProps , prevState, snapshot) {
       
    }

   showHideDetailInfor = (status) => {
    this.setState({
        isShowDetailInfor:status
    })
   }

  
    
    render() {
        let {isShowDetailInfor} = this.state
        return (
            <div className="doctor-extra-infor-container">
                <div className='content-up'>
                    <div className='text-address'>ĐỊA CHỈ KHÁM</div>
                    <div className='name-clinic'>Phòng khám Chuyên khoa Da liễu</div>
                    <div className='detail-address'>Sài Gòn</div>

                </div>
                <div>
                    
                </div>
         
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn:state.user.isLoggedIn,
        language:state.app.language,
        allDoctors:state.admin.allDoctors,
        allScheduleTime:state.admin.allScheduleTime
    };
};

const mapDispatchToProps = dispatch => {
    
    return {
        fetchAllDoctors:() => dispatch(actions.fetchAllDoctors()),
        fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
