import React, { Component } from 'react';
import { set_weui } from '../actions';

class Page extends Component {

    componentWillMount() {
        console.log("this.props.match.params.openid");
        console.log(this.props.match.params.openid);
        localStorage.setItem("openid",this.props.match.params.openid);
        if(this.props.match.params.openid){
            this.props.history.push("/");
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

export default Page;
