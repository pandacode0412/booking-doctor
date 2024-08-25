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
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctors:dataSelect
            })
        }
        if(prevProps.allScheduleTime !== this.props.allScheduleTime) {
            this.setState({
                rangeTime:this.props.allScheduleTime
            })
        }
    }

    buildDataInputSelect = () => {
        let result = []
        let {language} = this.props
        if(inputData && inputData.length > 0) {
            
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
