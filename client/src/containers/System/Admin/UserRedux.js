import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllCodeService } from '../../../services/userService';
import {LANGUAGES} from "../../../utils"
import './UserRedux.scss'
import Lightbox from 'react-image-lightbox'
import 'react-image-lightbox/style.css'
import * as actions from "../../../store/actions"
import TableManageUser from './TableManageUser';
class UserRedux extends Component {


    constructor(props) {
        super(props);
        this.state = {
            genderArr:[],
            positionArr:[],
            roleArr:[],
            previewImgURL:'',
            isOpen:false   ,
            
            email: '',
            password: '',
            firstName:'',
            lastName:'',
            phoneNumber:'',
            address:'',
            gender:'',
            position:'',
            role:'',
            avatar:''
        }
    }


    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositonStart();
        this.props.getRoleStart();
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
            let arrGenders = this.props.genderRedux
            this.setState({
                genderArr: arrGenders,
                gender:arrGenders && arrGenders.length > 0 ? arrGenders[0].key : ''
            })
        }

        if(prevProps.roleRedux !== this.props.roleRedux) {
            let arrRoles= this.props.roleRedux
            this.setState({
                roleArr: arrRoles,
                role:arrRoles && arrRoles.length > 0 ? arrRoles[0].key : ''
            })
        }
        if (prevProps.positionRedux !== this.props.positionRedux){
            let arrPositions= this.props.positionRedux

            this.setState({
                positionArr : arrPositions,
                role:arrPositions && arrPositions.length > 0 ? arrPositions[0].key : ''
            })
        }

        if(prevProps.listUsers !== this.props.listUsers) {
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber:'',
                address:'',
                gender:'',
                position:'',
                role:'',
                avatar:''
            })
        }
    }
  
    handleOnChangeImage = (event) => {
        let data = event.target.files;
        let file = data[0];
        if(file) {
            let objectUrl = URL.createdObjectURL(file);
            this.setState({
                previewImgURL:objectUrl,
                avatar:file
            })
        }
    }

    handleSaveUser = () => {
        let isValid = this.checkValidateInput();
        if(isValid === false) return;

        //fire redux action
        this.props.createNewUser({
            email: this.state.email,
            password: this.state.password,
            firstName:this.state.firstName,
            lastName:this.state.lastName,
            phoneNumber:this.state.phoneNumber,
            address:this.state.address,
            gender:this.state.gender,
            positionId:this.state.role,
            roleId:this.state.position,
          
        })
    }

    checkValidateInput = () => {
        let isValid = true ;
        let arrCheck = ['email' , 'password' , 'firstName' , 'lastName' , 'phoneNumber' , 'address']
        for(let i = o ; i < arrCheck.length ; i++) {
            if(!this.state[arrCheck[i]]) {
                isValid = false;
                alert('this input required' + arrCheck[i])
                break;
            }
        }

        return isValid;
    }

    onChangeInput = (event , id) => {
        let copyState = {...this.state}
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }


    getAllUsersFromReact = async () => {
        let response = await getAllUsers('ALL')
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
            })
        }
    }

    openPreviewImage = () => {
        if(!this.state.previewImgURL) return;

        this.setState({
            isOpen:true
        })
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
        let roles = this.state.roleArr
        let positions = this.state.positionArr
        let language = this.props.language
        let isGetGenders = this.props.isLoadingGender;

        let {email , password , firstName , lastName , phoneNumber
            , address , gender, position , role , avatar
        } = this.state
        return (
           <div className="user-redux-container">
                 <div className="title">
                       User redux
                 </div>
                 <div className="user-redux-body">
                     <div className="container">
                        <div className="row">
                            <div className="col-12 my-3"><FormattedMessage id="manage-user.add" /></div>
                            <div className="col-12">{isGetGenders === true ? 'Loading genders' : ''}</div>
                          <div className="col-3">
                                 <label><FormattedMessage id="manage-user.email" /></label>
                                 <input className="form-control" type="email"
                                       value={email}
                                       onChange={(event)=> { this.onChangeInput(event , "email")}}
                                 />
                          </div>
                          <div className="col-3">
                                 <label><FormattedMessage id="manage-user.password" /></label>
                                 <input className="form-control" type="password"
                                  
                                  value={password}
                                  onChange={(event)=> { this.onChangeInput(event , "password")}}
                                 />
                          </div>
                          <div className="col-3">
                                 <label><FormattedMessage id="manage-user.first-name" /></label>
                                 <input className="form-control" type="text"
                                  value={firstName}
                                  onChange={(event)=> { this.onChangeInput(event , "firstName")}}
                                 />
                          </div>
                          <div className="col-3">
                                 <label><FormattedMessage id="manage-user.last-name" /></label>
                                 <input className="form-control" type="text" 
                                    value={lastName}
                                    onChange={(event)=> { this.onChangeInput(event , "lastName")}}
                                 />
                          </div>
                          <div className="col-3">
                                 <label><FormattedMessage id="manage-user.phone-number" /></label>
                                 <input className="form-control" type="text" 
                                  value={phoneNumber}
                                  onChange={(event)=> { this.onChangeInput(event , "phoneNumber")}}

                                 />
                          </div>
                          <div className="col-9">
                                 <label><FormattedMessage id="manage-user.address" /></label>
                                 <input className="form-control" type="text" 
                                 
                                 value={address}
                                 onChange={(event)=> { this.onChangeInput(event , "address")}}
                                 />
                          </div>
                          <div className="col-3">
                                 <label><FormattedMessage id="manage-user.gender" /></label>
                                 <select  className="form-control"
                                   onChange={(event)=>{this.onChangeInput(event,'gender')}}
                                 >
                                      {genders && genders.length > 0 && 
                                        genders.map((item, index)=> {
                                            return(
                                                <option key={index} value={item.key}>{language === LANGUAGES.VI ? item.valueVi :item.valueEn}</option>
                                            )
                                        })
                                      }
                                 </select>
                          </div>
                          <div className="col-3">
                                 <label><FormattedMessage id="manage-user.position" /></label>
                                 <select  className="form-control"
                                  onChange={(event)=>{this.onChangeInput(event,'position')}}
                                 >
                                 {positions && positions.length > 0 && 
                                        positions.map((item, index)=> {
                                            return(
                                                <option key={index} value={item.key}>{language === LANGUAGES.VI ? item.valueVi :item.valueEn}</option>
                                            )
                                        })
                                      }
                                 </select>
                          </div>
                          <div className="col-3">
                                 <label><FormattedMessage id="manage-user.role" /></label>
                                 <select  className="form-control"
                                  onChange={(event)=>{this.onChangeInput(event,'role')}}
                                 >
                                 {roles && roles.length > 0 && 
                                        roles.map((item, index)=> {
                                            return(
                                                <option key={index} value={item.key}>{language === LANGUAGES.VI ? item.valueVi :item.valueEn}</option>
                                            )
                                        })
                                      }
                                 </select>
                          </div>
                          <div className="col-3">
                                 <label><FormattedMessage id="manage-user.image" /></label>
                                <div className="preview-img-container">
                                     <input id ="previewImg" type="file" hidden 
                                       onChange={(event) => this.handleOnChangeImage(event)}
                                     />
                                     <label className="label-upload" htmlFor = "previewImg">Tải ảnh<i className="fas fa-upload"></i></label>
                                     <div className="preview-image"
                                         style={{backgroundImage:`url(${this.state.previewImgURL})`}}
                                         onClick={()=> this.openPreviewImage()}
                                         >
                                     </div>
                                </div>
                          </div>
                          <div className="col-12 my-3">
                               <button className="btn btn-primary"
                                onClick={() => this.handleSaveUser()}
                               ><FormattedMessage id="manage-user.save" /></button>
                          </div>

                          <div className="col-12 mb-5">
                                 <TableManageUser/>
                          </div>
                        </div>
                     </div>
                 </div>
                  {
                    this.state.isOpen === true && 
                        <Lightbox
                               mainSrc={this.state.previewImgURL}
                               onCloseRequest={()=>this.setState({isOpen:false})}
                        
                        />
                  }
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        // isLoggedIn:state.user.isLoggedIn,
        // userInfo:state.user.userInfo,
        language:state.app.language,
        genderRedux:state.admin.genders,
        roleRedux : state.admin.roles,
        positionRedux:state.admin.positions,
        isLoadingGender:state.admin.isLoadingGender,
        listUsers:state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositonStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser : (data) => dispatch(actions.createNewUser(data)),
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
