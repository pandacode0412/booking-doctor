import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import moment from 'moment'
import './Header.scss';
import { LANGUAGES } from '../../utils';
import {FormattedMessage} from 'react-intl';
import localization from 'moment/locale/vi'
import {getScheduleDoctorByDate} from '../../../services/userService'

class DetailDoctor extends Component {

    constructor(props) {
        super(props)
        this.state = {
           allDays: [],
           allAvalableTime:[]
        }
    }

    async componetDidMount() {
         let {language} = this.props;
         this.setArrDays(language)
    }

    capitalizeFirstLetter(string) {
        return string.chartAt(0).toUpperCase() + string.slice(1);
    }

    setArrDays = (language) => {
        let allDays = []
        for(let i = 0 ; i<7 ; i++) {
            let object = {};
            if(language === LANGUAGES.VI) {
                let labelVi =moment(new Date()).add(i,'days').format('dddd - DD/MM')
                object.label = this.capitalizeFirstLetter(labelVi)

            }else {
                object.label = moment(new Date()).add(i,'days').locale('en').format("ddd - DD/MM")
            }
            object.value = moment(new Date()).add(i,'days').startOf('day').valueOf();
            allDays.push(object);
        }
        this.setState({
            allDays:allDays,
        })
    }

    componetDidUpdate(prevProps, prevState, snapshot) {
           if(this.props.language !== prevProps.language) {
            this.setArrDays(this.props.language)
           }
    }

    handleOnChangeSelect = async (event) => {
        if(this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
            let doctorId = this.props.doctorIdFromParent
            let date = event.target.value
            let res = await getScheduleDoctorByDate(doctorId, date)
            if(res && res.errCode === 0) {
                this.setState({
                    allAvalableTime:res.data ? res.data : []
                })
            }
        }
    }

    render() {
        let {allDays , allAvalableTime} = this.state
        let {language} = this.props
      

        return (
            < div className="doctor-schedule-container">
                <div className="all-schedule">
                    <select onChage={(event) =>this.handleOnChangeSelect(event)}>
                          {allDays && allDays.length > 0 && 
                            allDays.map((item,index)=> {
                                return (
                                    <option
                                      value={item.value}
                                      key={index}
                                    >
                                       {item.label}
                                    </option>
                                )
                            })
                          }
                    </select>
                </div>
                <div className="all-available-time">

                </div>
             
            
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        language:state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux:(language)=>dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
