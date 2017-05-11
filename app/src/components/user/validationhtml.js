import React, { Component } from 'react';
import { connect } from 'react-redux';
import renderHTML from 'react-render-html';
import {
  userauthenticationhtml_request,
  userauthenticationhtml_result
} from '../../actions';

export class Page extends React.Component {

  componentWillMount () {//taobao,phone
    this.props.dispatch(userauthenticationhtml_request({
      type:this.props.match.params.type,
      data:{}
    }));
  }

  componentWillUnmount () {//taobao,phone
    this.props.dispatch(userauthenticationhtml_result({html:{
      code:-1,
      errorCode:"-1"
    }}));
  }

  onClickBack =()=>{
    this.props.history.goBack();
  }

  render() {
    const {html} = this.props;
    let success = false;
    let type = this.props.match.params.type;
    if(type === 'taobao' && html.errorCode === "0" ){
      success = true;
    }
    if(type === 'phone' && html.code === 0 ){
      success = true;
    }
    console.log(`------------>${JSON.stringify(html)}`);
    return ( <div>
              {success && <iframe src={html.url} />}
            </div>
     );
  }
}


const mapStateToProps = ({validationhtml}) => {
  return validationhtml;
}

export default connect(mapStateToProps)(Page);
