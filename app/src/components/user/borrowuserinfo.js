/*
    用户借款资料详情
*/
import React, { Component } from 'react';
import DocumentTitle from "react-document-title";
import WeUI from 'react-weui';
import { connect } from 'react-redux';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import '../../../public/css/borrowuserinfo.css';
const {
    CellBody,
    CellFooter,
    Cells,
    Cell
    } = WeUI;

class Page extends Component {

    pushUrl = (name)=>{
        this.props.history.push(name);
    }

    // hukou:String,
    // limithuabei:Number,//花呗额度
    // limitjiebei:Number,//借呗额度
    // jiedaibaofuzai:Number,//借贷宝负债
    // jiedaobaoyihuan:Number,//借贷宝已还
    // realtimeforphoneyear:Number,//手机号实名时间（年）

    // hasgudingzichan:{ type: Boolean, default: false },//是否有固定资产
    // hasdanwei:{ type: Boolean, default: false },//是否有工作单位
    // hasgongjijin:{ type: Boolean, default: false },//是否有公积金
    // hasshebao:{ type: Boolean, default: false },//是否有社保
    // hassanhaotongyi:{ type: Boolean, default: false },//三号是否统一
    // hasjinrihuankuan:{ type: Boolean, default: false },//有无今日还款
    // hasyuqijilu:{ type: Boolean, default: false },//有无逾期记录
    // hasshenfenzhengyuanjian:{ type: Boolean, default: false },//身份证原件
    
	render() {
        const { borrowinfo,usertype } = this.props;
        const greenhave = (<span className="green">有</span>);
        return (
    		<div className="borrowuserinfoPage AppPage">
    			<DocumentTitle title="我的借款资料" />
                {usertype=="userborrow"?(
                    <div className="pageTitle"><span>我的借款资料</span></div>
                ):(
                    <div className="headcontent">
                        <div className="userinfo">
                            <img src={borrowinfo.profile.avatar} />
                            <span>{borrowinfo.profile.nickname}</span>
                        </div>
                    </div>
                )}
                <div className="form" style={{height:(window.innerHeight-104)+"px"}}>
                    <Cells>
                        <Cell><CellBody>芝麻信用分</CellBody><CellFooter>{borrowinfo.hasOwnProperty("resultzhima")&&borrowinfo.resultzhima?`${borrowinfo.resultzhima}`:"未认证"}</CellFooter></Cell>
                    </Cells>    
                    <Cells>
                        <Cell><CellBody>户籍</CellBody><CellFooter>{borrowinfo.hasOwnProperty("hukou")?`${borrowinfo.hukou}`:"未填写"}</CellFooter></Cell>
                        <Cell><CellBody>花呗额度</CellBody><CellFooter>{borrowinfo.hasOwnProperty("limithuabei")?`${borrowinfo.limithuabei}元`:"未填写"}</CellFooter></Cell>
                        <Cell><CellBody>借呗额度</CellBody><CellFooter>{borrowinfo.hasOwnProperty("limitjiebei")?`${borrowinfo.limitjiebei}元`:"未填写"}</CellFooter></Cell>
                        <Cell><CellBody>借贷宝负债</CellBody><CellFooter>{borrowinfo.hasOwnProperty("jiedaibaofuzai")?`${borrowinfo.jiedaibaofuzai}元`:"未填写"}</CellFooter></Cell>
                        <Cell><CellBody>借贷宝已还款</CellBody><CellFooter>{borrowinfo.hasOwnProperty("jiedaobaoyihuan")?`${borrowinfo.jiedaobaoyihuan}元`:"未填写"}</CellFooter></Cell>
                        <Cell><CellBody>手机号实名时间</CellBody><CellFooter>{borrowinfo.hasOwnProperty("realtimeforphoneyear")?`${borrowinfo.realtimeforphoneyear}年`:"未填写"}</CellFooter></Cell>
                    </Cells>
                    <Cells>
                        <Cell><CellBody>是否有固定资产</CellBody><CellFooter>{borrowinfo.hasgudingzichan?greenhave:"无"}</CellFooter></Cell>
                        <Cell><CellBody>是否有工作单位</CellBody><CellFooter>{borrowinfo.hasdanwei?greenhave:"无"}</CellFooter></Cell>
                        <Cell><CellBody>是否有公积金</CellBody><CellFooter>{borrowinfo.hasgongjijin?greenhave:"无"}</CellFooter></Cell>
                        <Cell><CellBody>是否有社保</CellBody><CellFooter>{borrowinfo.hasshebao?greenhave:"无"}</CellFooter></Cell>
                        <Cell><CellBody>三号是否统一</CellBody><CellFooter>{borrowinfo.hassanhaotongyi?greenhave:"无"}</CellFooter></Cell>
                        <Cell><CellBody>有无今日还款</CellBody><CellFooter>{borrowinfo.hasjinrihuankuan?greenhave:"无"}</CellFooter></Cell>
                        <Cell><CellBody>有无身份证原件</CellBody><CellFooter>{borrowinfo.hasshenfenzhengyuanjian?greenhave:"无"}</CellFooter></Cell>
                    </Cells>
                    <Cells>
                        <Cell><CellBody>常用联系人1</CellBody><CellFooter>{borrowinfo.contact1?`${borrowinfo.contact1.name} ${borrowinfo.contact1.phonenumber}`:"未填写"}</CellFooter></Cell>
                        <Cell><CellBody>常用联系人2</CellBody><CellFooter>{borrowinfo.contact2?`${borrowinfo.contact2.name} ${borrowinfo.contact2.phonenumber}`:"未填写"}</CellFooter></Cell>
                    </Cells>

                </div>
                {usertype=="userborrow"?(
                <div className="submitBtn">
                    <button 
                        className="btn Primary"
                        onClick={()=>{this.pushUrl("/addborrowuserinfo")}}
                        ><span>去修改</span></button>
                </div>
                ):""}
    		</div>
    	)
    }
}
const data = ({userborrow:{borrowinfo}}) => {
    console.log(borrowinfo);
    let usertype = localStorage.getItem('usertype');
    return {borrowinfo,usertype};
};
Page = connect(data)(Page);
export default Page;



