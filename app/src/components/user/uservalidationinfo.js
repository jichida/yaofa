/*
    个人中心-用户认证信息
*/
import React, { Component } from 'react';
import DocumentTitle from "react-document-title";
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import '../../../public/css/borrowlist.css';
import '../../../public/css/uservalidationinfo.css';
import { connect } from 'react-redux';
import moment from "moment";
import _ from "lodash";
import $ from "jquery";
import { withRouter } from 'react-router-dom';
import { requestUrlGet } from '../../util/util';
import { 
    getmyorders_request,
    set_myorderlistStatus,
    set_orderinfo,
    set_weui
    }  from "../../actions";

const { 
    Tab,
    NavBar,
    NavBarItem,
    TabBody,
    Cells,
    Cell,
    CellHeader,
    CellBody,
    CellFooter,
    LoadMore,
    } = WeUI;

// {
//     "cardno": "321283198505066819", 
//     "birthday": "1985-05-06", 
//     "sex": "M", 
//     "name": "焦文晖", 
//     "address": "江苏省泰州市泰兴市"
// }


class IdInfo extends Component {
    pushUrl = (name)=>{
        this.props.history.push(name);
    }
    render(){
        const { data } = this.props;

        if(data){
            let datainfo = JSON.parse(data);
            let info = datainfo.data;
            return (
                <div className="pageInfo">
                    <Cells>
                        <Cell>
                            <CellBody>
                                姓名
                            </CellBody>
                            <CellFooter>
                                {info.name}
                            </CellFooter>
                        </Cell>
                        <Cell>
                            <CellBody>
                                身份证号
                            </CellBody>
                            <CellFooter>
                                {info.cardno}
                            </CellFooter>
                        </Cell>
                        <Cell>
                            <CellBody>
                                性别
                            </CellBody>
                            <CellFooter>
                                {info.sex==="M"?"男":"女"}
                            </CellFooter>
                        </Cell>
                        <Cell>
                            <CellBody>
                                出生日期
                            </CellBody>
                            <CellFooter>
                                {info.birthday}
                            </CellFooter>
                        </Cell>
                        <Cell>
                            <CellBody>
                                地址
                            </CellBody>
                            <CellFooter>
                                {info.address}
                            </CellFooter>
                        </Cell>
                    </Cells>
                </div>
            )
        }else{
            return (
                <div className="nodata">
                    <span>您还没有通过该项认证</span>
                    <span className="btn Primary" onClick={()=>{history.push("/validation")}}>去认证</span>
                </div>
            )
        }
        
    }
}
IdInfo = withRouter(IdInfo);

class PhoneInfo extends Component {

    constructor(props) {  
        super(props);  
        this.state = {
            datainfo : ""
        };
    }

    componentWillMount () {
        this.getlist();
    }

    getlist =()=>{
        console.log(this.props.data);
        if(this.props.data){
            $.ajax({
                type: "GET",//请求方式为get
                dataType: "json", //返回数据格式为json
                // url: this.props.data,
                url : "http://shuizhihe.com28.cn/uploader/phone_592c3a2b7ee6dc05bd972b3f.txt",
                success: function(msg){
                    console.log(msg);
                    this.setState({datainfo : msg})
                }
            });

            // requestUrlGet(
            //     "http://shuizhihe.com28.cn/uploader/phone_592c3a2b7ee6dc05bd972b3f.txt",
            //     {},(status, msg)=>{
            //     if(status){
            //         console.log(msg)
            //     }else{
            //         let toast = {
            //             show : true,
            //             text : msg,
            //             type : "warning"
            //         }
            //         this.props.dispatch(set_weui({toast}));
            //     }
            // })
        }
    }
    
    render(){
        const { data } = this.props;
        if(data){
            console.log(this.state.datainfo);
            return (
                <div className="pageInfo">
                    <Cells>
                        <Cell>
                            <CellBody>
                                姓名
                            </CellBody>
                            <CellFooter>
                                {data.name}
                            </CellFooter>
                        </Cell>
                        <Cell>
                            <CellBody>
                                身份证号
                            </CellBody>
                            <CellFooter>
                                {data.cardno}
                            </CellFooter>
                        </Cell>
                        <Cell>
                            <CellBody>
                                性别
                            </CellBody>
                            <CellFooter>
                                {data.sex==="M"?"男":"女"}
                            </CellFooter>
                        </Cell>
                        <Cell>
                            <CellBody>
                                出生日期
                            </CellBody>
                            <CellFooter>
                                {data.birthday}
                            </CellFooter>
                        </Cell>
                        <Cell>
                            <CellBody>
                                地址
                            </CellBody>
                            <CellFooter>
                                {data.address}
                            </CellFooter>
                        </Cell>
                    </Cells>
                </div>
            )
        }else{
            return (
                <div className="nodata">
                    <span>您还没有通过该项认证</span>
                    <span className="btn Primary" onClick={()=>{history.push("/validation")}}>去认证</span>
                </div>
            )
        }
        
    }
}
PhoneInfo = withRouter(PhoneInfo);

class TaobaoInfo extends Component {
    
    constructor(props) {  
        super(props);  
        this.state = {
            datainfo : ""
        };
    }

    componentWillMount () {
        this.getlist();
    }

    getlist =()=>{
        if(this.props.data){
            $.ajax({
                type: "GET",//请求方式为get
                dataType: "json", //返回数据格式为json
                type: "GET",
                url: this.props.data,
                success: function(msg){
                    console.log(msg);
                    this.setState({datainfo : msg})
                }
            });
        }
    }
    
    render(){
        const { data } = this.props;
        if(data){
            console.log(this.state.datainfo);
            return (
                <div className="pageInfo">
                    <Cells>
                        <Cell>
                            <CellBody>
                                姓名
                            </CellBody>
                            <CellFooter>
                                {data.name}
                            </CellFooter>
                        </Cell>
                        <Cell>
                            <CellBody>
                                身份证号
                            </CellBody>
                            <CellFooter>
                                {data.cardno}
                            </CellFooter>
                        </Cell>
                        <Cell>
                            <CellBody>
                                性别
                            </CellBody>
                            <CellFooter>
                                {data.sex==="M"?"男":"女"}
                            </CellFooter>
                        </Cell>
                        <Cell>
                            <CellBody>
                                出生日期
                            </CellBody>
                            <CellFooter>
                                {data.birthday}
                            </CellFooter>
                        </Cell>
                        <Cell>
                            <CellBody>
                                地址
                            </CellBody>
                            <CellFooter>
                                {data.address}
                            </CellFooter>
                        </Cell>
                    </Cells>
                </div>
            )
        }else{
            return (
                <div className="nodata">
                    <span>您还没有通过该项认证</span>
                    <span className="btn Primary" onClick={()=>{history.push("/validation")}}>去认证</span>
                </div>
            )
        }
        
    }
}
TaobaoInfo = withRouter(TaobaoInfo);

class Page extends Component {

    constructor(props) {  
        super(props);  
        this.state = {
            status : 'id',
            datainfo : null,
            topicshow : true
        };
    }

    pushUrl = (name)=>{
        this.props.history.push(name);
    }

    SetStatus = (status)=>{
        this.setState({status: status});
    }

    hidetopic=()=>{
        this.setState({topicshow : false})
    }

    render() {
        const { navlist,resultid_obj,resulttaobao_detail,resultphone_detail } = this.props;
        return (
            <div className="borrowlistPage uservalidationinfoPage AppPage">
                <DocumentTitle title="我的借款" />
                {this.state.topicshow?(
                    <span className="topicinfo">
                        该信息平台将严格保密，只会开发给向你借款的商家查阅，不作为任何商业用途，如有泄漏情况，请及时联系客服
                        <span onClick={this.hidetopic}></span>
                    </span>
                ):""}
                <Tab>
                    <NavBar>
                        {
                            _.map(navlist, (list, index)=>{
                                return (
                                    <NavBarItem 
                                        active={this.state.status==list.type}
                                        onClick={()=>{this.SetStatus(list.type)}}
                                        key={index}
                                        >
                                        {list.name}
                                    </NavBarItem>
                                )
                            })
                        }
                    </NavBar>
                    <TabBody>
                        {this.state.status==="id"?(<IdInfo data={resultid_obj}/>):""}
                        {this.state.status==="taobao"?(<TaobaoInfo data={resulttaobao_detail}/>):""}
                        {this.state.status==="phone"?(<PhoneInfo data={resultphone_detail}/>):""}
                    </TabBody>
                </Tab>
            </div>
        )
    }
}
const data = ({userlogin:{resultphone_detail,resulttaobao_detail,resultid_obj}}) => {
    let navlist = [
        {   
            name : "身份信息",
            type : "id",
        },
        {
            name : "淘宝信息",
            type : "taobao"
        },
        {
            name : "运营商信息",
            type : "phone"
        }
    ];
    return {resultphone_detail, resulttaobao_detail, resultid_obj, navlist};
};
Page = connect(data)(Page);
export default Page;





