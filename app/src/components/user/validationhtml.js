import React, { Component } from 'react';
import { connect } from 'react-redux';
import renderHTML from 'react-render-html';
import {
  userauthenticationhtml_request,
  userauthenticationhtml_result,
  set_weui
} from '../../actions';

export class Page extends React.Component {

    componentWillReceiveProps(nextProps) {
        // let type = this.props.match.params.type;
        // //淘宝认证成功后返回
        // if (
        //         nextProps.resulttaobao==1 && type==="taobao" &&
        //         (this.props.resulttaobao===0||this.props.resulttaobao===-1)
        //     ) {
        //         this.props.history.replace("/validation");
        // }
        // // //运营商认证成功后返回
        // if(
        //         nextProps.resultphone==1 && type==="phone" &&
        //         (this.props.resultphone===0||this.props.resultphone===-1)
        //     ){
        //         this.props.history.replace("/validation");
        // }
    };

    componentWillMount () {//taobao,phone
        let type = this.props.match.params.type;
        if(type==="taobao" && this.props.resulttaobao==2){
            this.props.history.goBack();
        }
        if(type==="phone" && this.props.resultphone==2){
            this.props.history.goBack();
        }
        this.props.dispatch(userauthenticationhtml_request({
            type: type,
            data:{}
        }));
        this.setState({show : true})
        this.props.dispatch(set_weui({
            loading:{show:true}
        }));
        window.setTimeout(()=>{
            this.props.dispatch(set_weui({
                loading:{show:false}
            }));
        },2000)
    }


    componentWillUnmount () {//taobao,phone
        this.props.dispatch(userauthenticationhtml_result({html:{
            code:-1,
            errorCode:"-1"
        }}));
        this.setState({show : false})
    }

    onClickBack =()=>{
        this.props.history.goBack();
    }


    constructor(props) {  
        super(props);  
        this.state = {show: true};
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

        if(!!html.url){
            window.location.href = html.url;
        }
        return ( 
            <div className="validationPage AppPage">

                loading...
                
            </div>
        );
    }

}

const data = ({validationhtml,userlogin:{resulttaobao,resultid,resultphone,resultzhima,resultrealname}}) => {
    return { ...validationhtml,resulttaobao,resultid,resultphone,resultzhima,resultrealname };
}

export default connect(data)(Page);









