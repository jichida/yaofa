/*
    投诉商家
*/
import React, { Component } from 'react';
import DocumentTitle from "react-document-title";
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import '../../../public/css/tousu.css';
import { connect } from 'react-redux';
import moment from "moment";
import withRouter from 'react-router-dom/withRouter';
import { 
    set_borrowinfo,
    set_addloanid,
    confirmorder_request,
    set_orderinfo,
    set_weui,
    lender_set_ui_endorder,
    lender_set_endorder_status,
    lender_set_moneyreal,
    borrow_ui_sureorder,
    set_tousucontent,
    }  from "../../actions";
const { 
    Cells,
    Cell,
    CellBody,
    CellHeader,
    CellFooter,
    Panel,
    PanelHeader,
    PanelBody,
    MediaBox,
    MediaBoxDescription,
    CellsTitle
    } = WeUI;

/*
    let payload = {
            query:{_id:this.props.orderinfo._id},
            data:{
                orderstatus : 4
            }
        };
        this.props.dispatch(confirmorder_request(payload));
*/
class Page extends Component {
    pushUrl = (name)=>{
        this.props.history.push(name);
    }

    componentWillUnmount(){
        this.props.dispatch(set_tousucontent(""))
    }

    componentWillMount() {
        let orderInfo = this.props.orderInfo;
        if(!orderInfo.hasOwnProperty("_id")){
            this.props.history.goBack();
        }
        if(orderInfo.orderstatus!=3&&orderInfo.orderstatus!=-2){
            this.props.history.goBack();
        }
    }
    //设置投诉详情
    setTousuContent=(e)=>{
        this.props.dispatch(set_tousucontent(e.target.value));
    }
    //提交投诉
    submitContent=()=>{

        if(this.props.tousucontent!=''){
            setTimeout(()=>{
                let payload = {
                    query:{_id:this.props.orderid},
                    data:{
                        orderstatus : -1,
                        errorreason : this.props.tousucontent
                    }
                };
                this.props.dispatch(confirmorder_request(payload));
                setTimeout(()=>{
                    this.props.history.goBack();
                },1000)
            },100)
        }else{
            let toast = {
                show : true,
                text : "内容不能为空",
                type : "warning"
            }
            this.props.dispatch(set_weui({ toast }));
        }
    }
	render() {
        const { orderInfo } = this.props;
        return (
    		<div className="tousuPage AppPage">
    			<DocumentTitle title="投诉商家" />
                <div className="list">
                    <textarea 
                        placeholder="请输入投诉详情" 
                        onChange={(e)=>{this.setTousuContent(e)}}
                    />
                    <div className="submitBtn">
                        <button 
                            className="btn Primary"
                            onClick={()=>{this.submitContent()}}
                        ><span>确定</span></button>
                    </div>
                </div>
    		</div>
    	)
    }
}

const data = ({order:{orderInfo,tousucontent}}) => {
    //console.log(orderInfo);
    //usertype: userborrow  useragency  userlender
    return {orderInfo,tousucontent};
};
Page = connect(data)(Page);
export default Page;



