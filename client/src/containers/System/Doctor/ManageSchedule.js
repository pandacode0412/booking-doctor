import React , {Component} from 'react';
import {connect} from 'react-redux'
import 

class ManageSchedule extends Component {

    state = {

    }

    componentDidMount() {
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
