/*
    借款信息
*/
import React, { Component } from 'react';
import DocumentTitle from "react-document-title";
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import '../../../public/css/index.css';
import Footer from './footer';
import _ from "lodash";
import { connect } from 'react-redux';
import SwiperBanner from '../tools/swiperbanner';
import moment from "moment";
import { 
    getmyorders_request,
    set_orderinfo,
    set_weui,
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
    CellFooter
    } = WeUI;

class Page extends Component {

    headBanner =()=>{
        let data = [
            "img/5.png",
            "img/5.png",
        ]
        return data;
    }


    constructor(props) {  
        super(props);  
        this.listHeight=300;  
    } 

    componentWillMount() {

        this.props.dispatch(getmyorders_request({
            query:{

            },
            options:{
                sort: { updated_at: 1 },
                page: 1,
                limit: 100,
            }
        }));

        this.listHeight = window.innerHeight - ((window.innerWidth*0.3)+110);




        //console.log("userlog:::"+JSON.stringify(this.props.userlogin));
        let userlogin = this.props.userlogin;
        // "resultid": false,
        // "resultphone": false,
        // "resultzhima": false,
        // "resulttaobao": false,
        // "resultrealname": true,
        // hukou:String,
        // limithuabei:Number,//花呗额度
        // limitjiebei:Number,//借呗额度
        // jiedaibaofuzai:Number,//借贷宝负债
        // jiedaobaoyihuan:Number,//借贷宝已还
        // realtimeforphoneyear:Number,//手机号实名时间（年）

        // truename:String,  //真实用户名
        // idcard:String,//身份证号
        // phonenumber:String,//手机号
        // phonepassword:String,//手机密码
        // taobaoaccount:String,//淘宝账号
        // taobaopassword:String,//淘宝密码
        // urlphoneid1:String,//身份证照片正面
        // urlphoneid2:String,//身份证照片反面
        // urlphoneid3:String,//身份证照片手持

        
        //console.log(userlogin);
        //userlogin.resultzhima&&
        //userlogin.resultphoto===2&&
        if( 
            userlogin.resultid===2 && 
            userlogin.resultphone===2 && 
            // userlogin.resulttaobao===2 && 
            userlogin.hasOwnProperty("hukou")
            // userlogin.resultzhima===2
        ){
            // this.props.dispatch(set_weui({confirm:{
            //     show : true,
            //     title : "认证审核中...",
            //     text : "认证资料已经递交",
            //     buttonsCloseText : "关闭",
            //     buttonsClickText : "完善借款资料",
            //     buttonsClick : ()=>{this.props.history.push("/borrowuserinfo")}
            // }}))
            return false;
        }else{
            this.props.dispatch(set_weui({confirm:{
                show : true,
                title : "贷款信息未完善",
                text : "通过认证并且完善借款信息后才能进行借贷",
                buttonsCloseText : "暂不",
                buttonsClickText : "去完善",
                buttonsClick : ()=>{this.props.history.push("/validation")}
            }}))
        }

        


    }

    pushUrl = (name)=>{
        this.props.history.push(name);
    }

    gotoBorrowInfo =(order)=>{
        if(order.orderstatus!==-3){
            this.props.dispatch(set_orderinfo(order));
            //this.pushUrl("/borrowinfo");
            this.pushUrl(`/orderdetail/${order._id}`);
        }
    }

	render() {
        const { myorderlist } = this.props;
        return (
            <div className="indexPage AppPage">
                <DocumentTitle title="红领金-借款端" />
                <div className="swiperContainer">
        		    <SwiperBanner data={this.headBanner()} />
                </div>
                <div className="pageTitle">
                    <span>我的最新借款</span>
                    <span 
                        className="rightlnk"
                        onClick={()=>{this.pushUrl("/borrowlist")}}
                        >查看全部</span>
                </div>
                <div className="list" style={{height:this.listHeight+"px"}}>
                    {myorderlist.length>0?(
                        <Cells>
                            {
                                _.map(myorderlist, (order,index)=>{

                                    return order.orderstatus!==4 && order.orderstatus!==-1 && (
                                        <Cell
                                            access
                                            key={index}
                                            onClick={()=>{
                                                this.gotoBorrowInfo(order);
                                            }}
                                            >
                                            <CellHeader>
                                                <div className="userinfo">
                                                    <span className="name">借款额度:{order.moneylimit}</span>
                                                    <span className="name">借款期限:{order.moneyperiod}</span>
                                                    <span className="time">{moment(order.created_at).format('YYYY-MM-DD H:mm:ss')}</span>
                                                </div>
                                            </CellHeader>
                                            <CellBody>
                                                {order.orderstatus===-3 && "超时失效"}
                                                {order.orderstatus!==-3 && order.statusforlender}
                                            </CellBody>
                                            {order.orderstatus!==-3 && <CellFooter/>}
                                        </Cell>
                                    )
                                })
                            }
                        </Cells>
                    ):(
                        <div className="nodata">
                            <img src="img/21.png" />
                            <span>当前您暂无借款记录</span>
                            <span 
                                className="btn Primary"
                                onClick={()=>{this.pushUrl("/addborrow")}}
                                >
                                立刻借款
                            </span>
                        </div>
                    )}
                </div>
                <Footer action={1}/>
            </div>
    	)
    }
}

const data = ({order:{myorderlist}, userlogin}) => {
    myorderlist = _.sortBy(myorderlist, [function(o) { return -(new Date(o.updated_at)).getTime(); }]);

    return {myorderlist,userlogin};
};
Page = connect(data)(Page);
export default Page;

