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
        let type = this.props.match.params.type;
        //resulttaobao,resultid,resultphone,resultzhima,resultrealname
        //淘宝认证成功后返回
        if (nextProps.resulttaobao==2 && type==="taobao") {
            let toast = {
                show : true,
                text : "认证成功",
                type : "success"
            }
            this.props.dispatch(set_weui({ toast }));
            window.setTimeout(()=> {
                this.props.history.replace("/validation");
            }, 1500);
        }
        //运营商认证成功后返回
        // if (nextProps.resultphone==2 && type==="phone") {
        //     let toast = {
        //         show : true,
        //         text : "认证成功",
        //         type : "success"
        //     }
        //     this.props.dispatch(set_weui({ toast }));
        //     window.setTimeout(()=> {
        //         this.props.history.replace("/validation");
        //     }, 1500);
        // }
    };
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
        return ( 
            <div className="validationPage AppPage">
                <span>sfsfsdfsdf<br/></span>
                {success && <iframe height='100%' width='100%' src={html.url} />}
            </div>
        );
    }
}
const data = ({validationhtml,userlogin:{resulttaobao,resultid,resultphone,resultzhima,resultrealname}}) => {
    return { ...validationhtml,resulttaobao,resultid,resultphone,resultzhima,resultrealname };
}
export default connect(data)(Page);





