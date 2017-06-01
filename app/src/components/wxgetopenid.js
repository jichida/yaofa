import React, { Component } from 'react';
import Index from './index';

class Page extends Component {

    componentWillMount() {
        console.log("this.props.match.params.openid");
        console.log(this.props.match.params.openid);
    }

	render() {
        return (
    		<Index />
    	)
    }
}
export default Page;
