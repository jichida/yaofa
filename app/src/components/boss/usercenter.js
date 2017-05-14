/*
    个人中心
*/
import React, { Component } from 'react';
import DocumentTitle from "react-document-title";
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import '../../../public/css/usercenter.css';
import Footer from './footer';
import { connect } from "react-redux";

const {
    Cells,
    Cell,
    CellHeader,
    CellBody,
    CellFooter
    } = WeUI;

class Page extends Component {

    pushUrl = (name)=>{
        this.props.history.push(name);
    }

	render() {
        const { avatar, nickname } = this.props;
        return (
    		<div className="usercenterPage AppPage">
    			<DocumentTitle title="个人中心" />
                <div className="headcontent">
                    <img src="img/27.png" />
                    <div className="userinfo">
                        <img src={avatar} />
                        <span>{nickname}</span>
                    </div>
                </div>
                <div className="list">
                    <Cells>
                        <Cell href="javascript:;" access>
                            <CellHeader>
                                <img src="img/8.png" alt="" />
                            </CellHeader>
                            <CellBody>
                                我的放款
                            </CellBody>
                            <CellFooter/>
                        </Cell>
                        <Cell href="javascript:;" access>
                            <CellHeader>
                                <img src="img/9.png" alt="" />
                            </CellHeader>
                            <CellBody>
                                我的邀请码
                            </CellBody>
                            <CellFooter/>
                        </Cell>
                    </Cells>
                    <Cells>
                        <Cell
                            access
                            onClick={()=>{this.pushUrl("/settings")}}
                            >
                            <CellHeader>
                                <img src="img/10.png" alt="" />
                            </CellHeader>
                            <CellBody>
                                设置
                            </CellBody>
                            <CellFooter/>
                        </Cell>
                    </Cells>
                </div>
                <Footer action={2}/>
            </div>
    	)
    }
}

const data = ({userlogin:{profile}}) => {
    return {...profile};
};
Page = connect(data)(Page);
export default Page;

