import React, { Component } from 'react';
import DocumentTitle from "react-document-title";
import '../../public/css/login.css';
import { connect } from 'react-redux';
import withRouter from 'react-router-dom/withRouter';
import { Fields, Field, reduxForm, Form, formValueSelector } from 'redux-form';
import {
  settypeuserauthentication_request,
} from '../actions';

export class Page extends Component {
    componentWillMount() {
        this.props.dispatch(settypeuserauthentication_request(
            {
                data:{
                    resultphone : 1
                },
                query : {
                    _id : this.props.userid
                }
            }
        ))
    };
    render() {
        return (
            <div className="loginPage AppPage">
                test
            </div>
        )
    }
}

const data = ({userlogin:{userid}}) => {
    return {userid};
};

Page = connect(data)(Page);
export default Page;

