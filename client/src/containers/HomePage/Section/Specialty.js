import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Specialty.scss'
import {FormattedMessage} from 'react-intl'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"
class Specialty extends Component {

    render() {

        let settings = {
            dots:false,
            infinite:true,
            speed:500,
            slidesToShow:1,
            slidesToScroll:1
        }


      return (
        <div>
            
            <div className="section-specialty">
                 <div className="specialty-content">
                         <Slider {...settings}>

                         </Slider>
                 </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
