import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import { LANGUAGES } from '../../utils';
import {FormattedMessage} from 'react-intl';
import UserRedux from './UserRedux';
import './TableManageUser.scss'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css'
import { fetchAllDoctor } from '../../../store/actions/adminActions';



const options = [
    {value:'chocolate',label:""}
]
const mdParser = new MarkdownIt();

class ManageDoctor extends Component {

    constructor(props) {
        super(props);
        this.state={
            contentMarkdown:'',
            contentHTML:'',
            selectedOption:'',
            description:'',
            listDoctors:[]
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctors()
        
    }

    buildDataInputSelect = (inputData) => {
        let result = [];
        let {language} = this.props;
        if(inputData && inputData.lenght > 0)
        {
           inputData.map((item , index) => {
            let object = {};

            let labelVi =`${item.lastName} ${item.firstName}`
            let labelEn =`${item.firstName} ${item.lastName}`
            object.label = language === LANGUAGES.VI ? labelVi : labelEn;
            object.value = item.id;
            result.push(object)
           })
        }

        return result
    }

    componentDidUpdate(prevProps , prevState , snapshot) {
        if(prevProps.allDoctors !== this.props.allDoctors) {
            this.setState({
                listDoctors:dataSelect
            })
        }
        if(prevProps.language !== this.props.language) {
             let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
             this.setState({
                listDoctors:dataSelect
             })
        }
    }

    handleEditorChange = ({html, text}) => {
        this.setState({
            contentMarkdown:text,
            contentHTML:html,
        })
    }  


    handleChange = selectedOption => {
        this.setState({selectedOption})
    }

    handleOnChangeDesc = (event) => {
        this.setState({
            description:event.target.value
        })
    }
   

    render() {
        return (
            <div className="manage-doctor-container">
              <div className="manage-doctor-title">
                Tạo thêm thông tin doctors
              </div>
              <div className="more-infor">
                      <div className="content-left form-group">
                        <label>Chọn bác sĩ</label>
                        <Select
                           value={this.state.selectedOption}
                           onChange={this.handleChange}
                           options={options}
                        />
                      </div>
                      <div className="content-right">
                             <label>Thông tin giới thiệu: </label>
                             <textarea className="form-control" row="4"
                                  onChange={(event)=>this.handleOnChangeDesc(event)}
                                  value={this.state.description}
                             >

                             </textarea>
                      </div>
              </div>
              <div className="manage-doctor-editor">
                  <MdEditor
                     style={{height:'500px'}}
                     renderHTML={text=>mdParser.render(text)}
                     onChange={this.handleEditorChange}
                  />
              </div>
              <button
                onClick={()=>this.handleSaveContentMarkdown()}
                className="save-content-doctor"

              >
                Lưu thông tin
              </button>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
       allDoctors: state.admin.allDoctors
    };
};

const mapDispatchToProps = dispatch => {
    return {
       fetchAllDoctors: (id) =>  dispatch(actions.fetchAllDoctors()),
     
};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
