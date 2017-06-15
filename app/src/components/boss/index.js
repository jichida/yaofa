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
import { connect } from "react-redux";
import SwiperBanner from '../tools/swiperbanner';
import moment from 'moment';
import {
    set_lender_borrowlist,
    set_lender_borrowlist_filler,
    queryintrestedorder_request,
    set_orderinfo,
    set_weui
} from '../../actions';

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
    Form,
    FormCell,
    Select,
    Label,
    Input,
    Switch,
    LoadMore
    } = WeUI;

let bossindexgetlist = null;

class Page extends Component {

    headBanner =()=>{
        let data = [
            "img/5.png",
            "img/5.png",
        ]
        return data;
    }

    pushUrl = (name)=>{
        this.props.history.push(name);
    }

    constructor(props) {  
        super(props);  
        this.state = {
            showmark: false,
            falsemark : false,
        };  
    } 

    componentWillMount() {
        this.pageStart(this.props.approvalstatus);
        this.getList();
        bossindexgetlist = window.setInterval(()=>{
            this.getList();
        },5000);
    }

    pageStart =(approvalstatus)=>{
        const {dispatch,truename} = this.props;
        if(approvalstatus==="已审核"){
            // this.props.dispatch(set_weui({confirm:{
            //     show : true,
            //     title : "认证审核中...",
            //     text : "认证资料已经递交",
            //     buttonsCloseText : "关闭",
            //     buttonsClickText : "完善借款资料",
            //     buttonsClick : ()=>{this.props.history.push("/borrowuserinfo")}
            // }}))
            //return false;
        }else if(approvalstatus==="已拒绝"){
            this.setState({falsemark: true});
        }else{
            if(!!truename){
                this.setState({showmark: true});
            }else{
                dispatch(set_weui({confirm:{
                    show : true,
                    title : "未获得接单权限",
                    text : "商家需要通过资料审核后才能进行接单",
                    buttonsCloseText : "暂不",
                    buttonsClickText : "去完善资料",
                    buttonsClick : ()=>{this.props.history.push("/loaninfo")}
                }}))
            }
        }
        
    }

    gotoBorrowInfo =(borrowinfo)=>{
        //console.log(borrowinfo);
        this.props.dispatch(set_orderinfo(borrowinfo));
        this.pushUrl("/borrowinfo");
    }

    getList =()=>{
        let query = {};
        let borrowlistfiller = this.props.borrowlistfiller;
        // borrowlistfiller.jiedaibaofuzai && 
        // borrowlistfiller.limithuabei &&
        // borrowlistfiller.realtimeforphoneyear && 
        // borrowlistfiller.limitjiebei &&
        // query:{
        //       orderstatus:{$nin:[-1,4]}
        //     },
        // if(!!borrowlistfiller.jiedaibaofuzai){
        //     query.jiedaibaofuzai 
        // }
        this.props.dispatch(queryintrestedorder_request({query}))
    }

    componentWillUnmount(){
        window.clearInterval(bossindexgetlist);
    }


    componentWillReceiveProps(nextProps){

        
        //const {approvalstatus, canaccept} = nextProps;
        const {approvalstatus,truename} = this.props;

        if(!truename && !!nextProps.truename){
            this.setState({showmark: true});
        }

        if(approvalstatus!=="已审核" && nextProps.approvalstatus==="已审核"){
            this.pageStart(nextProps.approvalstatus);
            this.setState({showmark: false, falsemark: false});
        }
        if(approvalstatus==="已拒绝" && nextProps.approvalstatus!=="已拒绝"){
            this.setState({falsemark: false});
        }
        if(nextProps.approvalstatus!=="已拒绝" && nextProps.approvalstatus!=="已审核" && approvalstatus!=="未递交"){
            this.pageStart(nextProps.approvalstatus);
        }
        if(
            approvalstatus==="已审核" && nextProps.approvalstatus!=="已审核" || 
            approvalstatus!=="已拒绝" && nextProps.approvalstatus==="已拒绝" 

        ){
            this.pageStart(nextProps.approvalstatus);
        }



    }

    clearfiller=()=>{
        this.props.dispatch(set_lender_borrowlist_filler({}));
    }

	render() {
        const {borrowlist,borrowlistfiller,approvalrejectseason} = this.props;
        return (
            <div className="indexPage AppPage">
                <DocumentTitle title="耀发钱庄－放款端" />
                {this.state.showmark?(
                    <div className="bossindexMark">
                        <div >
                            <span className="color_warning">商家信息审核中...</span>
                            <div>
                                <span className="tit">如有疑问请查看:</span>
                                <span onClick={()=>{this.pushUrl("/abouthtml/helpcenter")}}>帮助文档</span>
                                <span onClick={()=>{this.pushUrl("/abouthtml/aboutus")}}>联系我们</span>
                            </div>
                        </div>
                        
                    </div>
                ):""}
                {this.state.falsemark?(
                    <div className="bossindexMark">
                        <div >
                            <span className="color_error">商家信息审核未通过...</span>
                            {!!approvalrejectseason?(
                                <span>理由: {approvalrejectseason}</span>
                            ):""}
                            <div>
                                <span className="tit">如有疑问请查看:</span>
                                <span onClick={()=>{this.pushUrl("/abouthtml/helpcenter")}}>帮助文档</span>
                                <span onClick={()=>{this.pushUrl("/abouthtml/aboutus")}}>联系我们</span>
                            </div>
                        </div>
                        
                    </div>
                ):""}
        		<SwiperBanner data={this.headBanner()} />
                <div className="pageTitle bossindexfiller">
                    <span>最新借款信息</span>
                    <div>
                    <span 
                        onClick={()=>{this.pushUrl("/bossfiller")}}
                        className="filler sel">
                        筛选
                        <img src="img/7.png" />
                    </span>
                    {
                        !!borrowlistfiller.jiedaibaofuzai ||
                        !!borrowlistfiller.limithuabei ||
                        !!borrowlistfiller.realtimeforphoneyear || 
                        !!borrowlistfiller.limitjiebei ?(
                        <span className="clear" onClick={()=>{this.clearfiller()}}>清空</span>):""
                    }
                    </div>
                </div>
                {
                        !!borrowlistfiller.jiedaibaofuzai ||
                        !!borrowlistfiller.limithuabei ||
                        !!borrowlistfiller.realtimeforphoneyear || 
                        !!borrowlistfiller.limitjiebei ?(
                    <div className="fillerbanner">
                        {borrowlistfiller.jiedaibaofuzai && <span>借贷宝负债&lt;{borrowlistfiller.jiedaibaofuzai}元</span>}
                        {borrowlistfiller.limithuabei && <span>花呗分值&lt;{borrowlistfiller.limithuabei}分</span>}
                        {borrowlistfiller.realtimeforphoneyear && <span>手机号实名时间&lt;{borrowlistfiller.realtimeforphoneyear}年</span>}
                        {borrowlistfiller.limitjiebei && <span>借呗额度&lt;{borrowlistfiller.limitjiebei}元</span>}
                    </div>
                    ):""
                }
                <div className="list">
                    {borrowlist.length>0?(
                        <Cells>
                            {

                                _.map(borrowlist, (borrow,index)=>{
                                    return (
                                        <Cell 
                                            access
                                            key={index}
                                            onClick={()=>{this.gotoBorrowInfo(borrow);}}
                                            >
                                            <CellHeader>
                                                <img src={borrow.creator.profile.avatar} alt="" />
                                                <div className="userinfo">
                                                    <span className="name">{borrow.creator.profile.nickname}</span>
                                                    <span className="time">借款期限: {borrow.moneyperiod}</span>
                                                    <span className="time">发布时间: {moment(borrow.created_at).format('YYYY-MM-DD H:mm:ss')}</span>
                                                    
                                                </div>
                                            </CellHeader>
                                            <CellBody>
                                                <div>借 <span className="blue">{borrow.moneylimit}</span> 元</div>
                                                <div>{borrow.statusforlender}</div>
                                            </CellBody>
                                            <CellFooter/>
                                        </Cell>
                                    )
                                })
                            }
                        </Cells>
                    ):(
                        <LoadMore showLine>暂无数据</LoadMore>
                    )}
                    
                </div>
                <Footer action={0}/>
            </div>
    	)
    }
}

const data = ({userlender:{borrowlist,borrowlistfiller}, userlogin:{approvalstatus,canaccept,truename,approvalrejectseason}}) => {
    //console.log(borrowlist);
    borrowlist = _.sortBy(borrowlist, [function(o) { return -(new Date(o.created_at)).getTime(); }]);
    return { borrowlist, borrowlistfiller, approvalstatus,canaccept,truename,approvalrejectseason };
};
Page = connect(data)(Page);
export default Page;







