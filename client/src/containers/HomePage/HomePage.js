import React, { Component } from 'react';
import { connect } from 'react-redux';



class HomePage extends Component {

    render() {
      return (
        <div>
            <HomeHeader/>
            <div style={{height:'300px'}}></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
