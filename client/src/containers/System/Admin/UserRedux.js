import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllCodeService } from '../../../services/userService';
import {LANGUAGES} from "../../../utils"
import * as actions from "../../../store/actions"
class UserRedux extends Component {


    constructor(props) {
        super(props);
        this.state = {
            genderArr:[]           
        }
    }


    async componentDidMount() {
        this.props.getGenderStart();
    //   try {
    //     let res = await getAllCodeService('role')
    //     if(res && res.errCode === 0) {
    //         this.setState({
    //             genderArr:res.data
    //         })
    //     }
    //   } catch (e) {
        
    //   }
    }

    componentDidMount(prevProps, prevState, snapshot){
        //render => didupdate
        //hiện tại (this) và quá khứ(previous)

        if(prevProps.genderRedux !== this.props.genderRedux) {
            this.setState({
                genderArr:this.props.genderRedux
            })
        }
    }


    getAllUsersFromReact = async () => {
        let response = await getAllUsers('ALL')
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
            })
        }
    }


    handleAddNewUser = () => {
        this.setState({
            isOpenModalUserL: true,
        })
    }


    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser
        })
    }


    createNewUser = async (data) => {
        try {
            let response = await this.createNewUserService(data)
            if (response && response.errCode !== 0) {
                alert(response.errMessage)
            } else {
                await this.getAllUsersFromReact();
                this.setState({
                    isOpenModalUser: false
                })
                emitter.emit('EVENT_CLEAR_MODAL_DATA')
            }

        } catch (e) {
            console.log(e)
        }
    }

    handleDeleteUser = async (user) => {
        try {
            let res = await deleteUserService(user.id)
            if (res && res.errCode === 0) {
                await this.getAllUsersFromReact();
            }
            else {
                alert(res.errMessage)
            }
        } catch (error) {
            console.log(error)
        }
    }

    /**
     * life Cycle
     * Run componet:
     * 1. Run construct -> init state
     * 2. Did mount (set state) 
     * 3. Render 
     * 
     * 
     * 
     * 
     * 
     * 
     */

    render() {
        let genders = this.state.genderArr;
        let language = this.props.language
        return (
           <div className="user-redux-container">
                 <div className="title">
                       User redux
                 </div>
                 <div className="user-redux-body">
                     <div className="container">
                        <div className="row">
                            <div className="col-12 my-3"><FormattedMessage id="manage-user.add" /></div>
                          <div className="col-3">
                                 <label><FormattedMessage id="manage-user.email" /></label>
                                 <input className="form-control" type="email" />
                          </div>
                          <div className="col-3">
                                 <label><FormattedMessage id="manage-user.password" /></label>
                                 <input className="form-control" type="password" />
                          </div>
                          <div className="col-3">
                                 <label><FormattedMessage id="manage-user.first-name" /></label>
                                 <input className="form-control" type="text" />
                          </div>
                          <div className="col-3">
                                 <label><FormattedMessage id="manage-user.last-name" /></label>
                                 <input className="form-control" type="text" />
                          </div>
                          <div className="col-3">
                                 <label><FormattedMessage id="manage-user.phone-number" /></label>
                                 <input className="form-control" type="text" />
                          </div>
                          <div className="col-9">
                                 <label><FormattedMessage id="manage-user.address" /></label>
                                 <input className="form-control" type="text" />
                          </div>
                          <div className="col-3">
                                 <label><FormattedMessage id="manage-user.gender" /></label>
                                 <select  className="form-control">
                                      {genders && genders.length > 0 && 
                                        genders.map((item, index)=> {
                                            return(
                                                <option key={index}>{language === LANGUAGES.VI ? item.valueVi :item.valueEn}</option>
                                            )
                                        })
                                      }
                                 </select>
                          </div>
                          <div className="col-3">
                                 <label><FormattedMessage id="manage-user.position" /></label>
                                 <select  className="form-control">
                                      <option selected >Choose...</option>
                                      <option seleted >...</option>
                                 </select>
                          </div>
                          <div className="col-3">
                                 <label><FormattedMessage id="manage-user.role" /></label>
                                 <select  className="form-control">
                                      <option selected >Choose...</option>
                                      <option  >...</option>
                                 </select>
                          </div>
                          <div className="col-3">
                                 <label><FormattedMessage id="manage-user.image" /></label>
                                 <input type="text" className="form-control" />
                          </div>
                          <div className="col-12 mt-3">
                               <button className="btn btn-primary"><FormattedMessage id="manage-user.save" /></button>
                          </div>
                        </div>
                     </div>
                 </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        // isLoggedIn:state.user.isLoggedIn,
        // userInfo:state.user.userInfo,
        language:state.app.language,
        genderRedux:state.admin.genders
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
