import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
class UserRedux extends Component {


    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false
        }
    }


    async componentDidMount() {
        await this.getAllUsersFromReact()
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
        let arrUsers = this.state.arrUsers

        return (
           <div className="user-redux-container">
                 <div className="title">
                       User redux
                 </div>
                 <div className="user-redux-body">
                      <div>Thêm mới người dùng</div>
                 </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
