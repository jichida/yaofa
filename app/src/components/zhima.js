import React, { Component } from 'react';
import { set_weui,getzhimascore_request } from '../actions';
import { connect } from 'react-redux';

//getzhimascore 接 : 输 参数:openid: 返回参数: 户表中数据

class Page extends Component {

    componentWillMount() {
        let openid = this.props.match.params.openid;
        localStorage.setItem("zhimaopenid",openid);
        if(openid){
            this.props.dispatch(getzhimascore_request({openid:openid}));
        }else{
            this.props.dispatch(set_weui({
                toast:{
                    show: true,
                    text: '数据加载失败',
                    type: 'warning'
                }})
            )
        }
    }
    render() {
        return (
            <div></div>
        )
    }

}
Page = connect()(Page);
export default Page;
