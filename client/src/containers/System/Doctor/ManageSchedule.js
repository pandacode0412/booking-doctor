import React , {Component} from 'react';
import {connect} from 'react-redux'
import './ManageSchedule.scss'
import {FormattedMessage} from 'react-intl'
import Select from 'react-select'
import * as actions from '../../../store/actions'
import { CRUD_ACTIONS, LANGUAGES } from '../../../utils';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment'
class ManageSchedule extends Component {

    constructor(props) {
        super(props)
        this.state = {
            listDoctors:[],
            selectedDoctor:{},
            currentDate:'',
            rangeTime:[]
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctors();
        this.props.fetchAllScheduleTime();
    }

    componentDidUpdate(prevProps , prevState, snapshot) {
        if(prevProps.allDoctors !== this.props.allDoctors){
            let dataSelect
        }
    }

    render() {
        return (
            <React.Fragment>
                <div>manage chedule</div>
            </React.Fragment>
        )
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn:state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
