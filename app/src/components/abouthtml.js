/*
    设置
*/
import React, { Component } from 'react';
import DocumentTitle from "react-document-title";
import WeUI from 'react-weui';
import { connect } from 'react-redux';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import '../../public/css/abouthtml.css';
const { 
    Cells,
    Cell,
    CellBody,
    CellFooter,
    CellHeader
    } = WeUI;
import {
    getabouthtml_request
    } from '../actions';

class Page extends Component {

    componentWillMount() {
        this.props.dispatch(getabouthtml_request({keyname: this.props.match.params.type}));
    }

    render() {
        const { about,match } = this.props;
        const data = about[match.params.type];
        return (
            <div className="aboutPage AppPage">
                <DocumentTitle title={data.title} />
                <div className="list">
                    {data.desc}
                </div>
            </div>
        )
    }
}
const data =  ({about}) =>{
    return {about};
};
export default connect(data)(Page);



