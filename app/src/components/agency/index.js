/*
    借款信息
*/
import React, { Component } from 'react';
import DocumentTitle from "react-document-title";
import WeUI from 'react-weui';
import { connect } from 'react-redux';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import '../../../public/css/index.css';
import Footer from './footer';
import _ from 'lodash';
import SwiperBanner from '../tools/swiperbanner';
import {
    getmyborrowusers_request,
    set_borrowinfo
} from '../../actions';

const { 
    Cells,
    Cell,
    CellHeader,
    CellBody,
    CellFooter,
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
        this.listHeight = window.innerHeight - ((window.innerWidth*0.3)+110);
        window.setTimeout(()=>{this.props.dispatch(getmyborrowusers_request({}))},0);
    }

    clickitem =(borrowinfo)=>{
        this.props.dispatch(set_borrowinfo(borrowinfo));
        this.props.history.push("/borrowuserinfo");
    }

	render() {
        const { borrowlist,history } = this.props;
        return (
            <div className="indexPage AppPage" >
                <DocumentTitle title="红领金-借款端" />
        		<SwiperBanner data={this.headBanner()} />
                <div className="pageTitle bossindexfiller">
                    <span>我的邀请列表</span>
                </div>
                <div className="list" style={{height:this.listHeight+"px"}}>
                {borrowlist.length==0?(
                    <div className="nodata">
                        <img src="img/21.png" />
                        <span>当前您暂无邀请纪录</span>
                        <botton className="btn Primary" onClick={()=>{history.push("/agencyqrcode")}}>立刻去邀请</botton>
                    </div>
                ):(
                    <Cells>
                        {
                            _.map(borrowlist, (userborrow,index)=>{
                                return (
                                    <Cell 
                                        access 
                                        key={index}
                                        onClick={()=>{this.clickitem(userborrow)}}
                                        >
                                        <CellHeader>
                                            <img src={userborrow.profile.avatar} alt="" />
                                            <div className="userinfo">
                                                <span className="name">{userborrow.profile.nickname}</span>
                                            </div>
                                        </CellHeader>
                                        <CellBody>
                                            
                                        </CellBody>
                                        <CellFooter/>
                                    </Cell>
                                )
                            })
                        }
                    </Cells>
                )}
                </div>
                <Footer action={0}/>
            </div>
    	)
    }
}
const data = ({useragency:{borrowlist}}) => {
    return {borrowlist};
};
Page = connect(data)(Page);
export default Page;
