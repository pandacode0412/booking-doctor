import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import { LANGUAGES } from '../../utils';
import {FormattedMessage} from 'react-intl';
import UserRedux from './UserRedux';

class TableManageUser extends Component {

    constructor(props) {
        super(props);
        this.state={
            userRedux: []
        }
    }

    componentDidMount() {
        this.props.fetchUserRedux()
    }

    componentDidUpdate(prevProps , prevState , snapshot) {
        if(prevProps.listUsers !== this.props.listUsers) {
            this.setState({
                userRedux: this.props.listUsers
            })
        }
    }

    handleDeleteUser = (user) => {
        this.props.deleteAUserRedux(user.id)
    }

   

    render() {
        let arrUsers = this.state.userRedux
        return (
            
              <table id="TableMangeUser">
                    <tbody>
                        <tr>
                            <th>Email</th>
                            <th>First name</th>
                            <th>Last Name</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>
                        {
                            arrUsers && arrUsers.length > 0 &&
                            arrUsers.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button className=""btn-edit><i className="fas fa-pencil-alt"></i></button>
                                            <button
                                              onClick={() => this.handleDeleteUser(item)}
                                              className="btn-delete"
                                            >
<i className="fas fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
              </table>
        );
    }

}

const mapStateToProps = state => {
    return {
    listUsers:state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux:(language)=>dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
