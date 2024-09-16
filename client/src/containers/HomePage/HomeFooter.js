import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl'
import Slider from "react-slick"


class HomeFooter extends Component {

    render() {
        return (
            <div className='home-footer'>
                <p>&copy; 2023 Đặt lệnh khám bệnha. <a href=''>More information, please visit my youtube channel. Click here</a></p>
            </div>
        )
    }


}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
