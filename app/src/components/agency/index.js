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

    componentWillMount() {
        this.props.dispatch(getmyborrowusers_request({}));
    }

    clickitem =(borrowinfo)=>{
        this.props.dispatch(set_borrowinfo(borrowinfo));
        this.props.history.push("/bossborrowuserinfo");
    }

	render() {
        const { borrowlist } = this.props;
        return (
            <div className="indexPage AppPage">
        		<SwiperBanner data={this.headBanner()} />
                <div className="pageTitle bossindexfiller">
                    <span>我的邀请列表</span>
                </div>
                <div className="list">
                {borrowlist.length==0?(
                    <div className="nodata">
                        <img src="img/21.png" />
                        <span>当前您暂无邀请纪录</span>
                        <botton className="btn Primary">立刻去邀请</botton>
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
                                            <img src="img/6.png" alt="" />
                                            <div className="userinfo">
                                                <span className="name">{userborrow.profile.nickname}</span>
                                            </div>
                                        </CellHeader>
                                        <CellBody>
                                            <div className="color_warning">{userborrow.username}</div>
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
