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
import SwiperBanner from '../tools/swiperbanner';
import {
  getmyborrowusers_request,
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

	render() {
        return (
            <div className="indexPage AppPage">
        		<SwiperBanner data={this.headBanner()} />
                <div className="pageTitle bossindexfiller">
                    <span>我的邀请列表</span>
                </div>
                <div className="list">
                    <Cells>
                        <Cell access>
                            <CellHeader>
                                <img src="img/6.png" alt="" />
                                <div className="userinfo">
                                    <span className="name">爱喝水的宝宝</span>
                                </div>
                            </CellHeader>
                            <CellBody>
                                <div className="color_warning">13661214711</div>
                            </CellBody>
                            <CellFooter/>
                        </Cell>
                        
                    </Cells>
                </div>
                <div className="nodata">
                    <img src="img/21.png" />
                    <span>当前您暂无邀请纪录</span>
                    <botton className="btn Primary">立刻去邀请</botton>
                </div>
                <Footer action={0}/>
            </div>
    	)
    }
}

Page = connect()(Page);
export default Page;