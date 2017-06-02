import React, { Component } from 'react';

class Page extends Component {

    componentWillMount() {
        console.log("this.props.match.params.openid");
        console.log(this.props.match.params.openid);
        localStorage.setItem("openid","xxxxxx");
    }

	render() {
        return (
    		<div>本页面是获取openid的页面</div>
    	)
    }
}

export default Page;
