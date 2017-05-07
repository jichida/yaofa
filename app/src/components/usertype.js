import React, { Component } from 'react';
import DocumentTitle from "react-document-title";
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import '../../public/css/usertype.css';
import { connect } from 'react-redux';
import {
    user_type
} from '../actions';

const {
    Icon,
    Form,
    FormCell,
    CellHeader,
    Checkbox,
    CellBody
    } = WeUI;

class Page extends Component {

    selusertype = (type)=>{
        this.props.dispatch(user_type(type));
    };

    subform = ()=>{
        this.props.history.replace("/login");
    };

	render() {
        const { usertype } = this.props;
        return (
    		<div className="usertypePage AppPage">
    			<DocumentTitle title="用户类型" />
                <div className="usertypePageTitle">选择你要注册的身份</div>
    			<div className="list">
    				<div 
                        className="li"
                        onClick={()=>{this.selusertype("userborrower")}}
                        >
                        <img src="img/22.png" />
    					<div className={usertype==="userborrower"?"sel":""}>
                            <Checkbox name="checkbox1" value="1" />
                            <span>借款人</span>
                        </div>
    				</div>
    				<div 
                        className="li"
                        onClick={()=>{this.selusertype("userlender")}}
                        >
                        <img src="img/23.png" />
                        <div className={usertype==="userlender"?"sel":""}>
                            <Checkbox name="checkbox2" value="2" />
                            <span>老板</span>
                        </div>
                    </div>
                    <div 
                        className="li"
                        onClick={()=>{this.selusertype("useragency")}}
                        >
                        <img src="img/24.png" />
                        <div className={usertype==="useragency"?"sel":""}>
                            <Checkbox name="checkbox3" value="3"/>
                            <span>中介</span>
                        </div>
                    </div>
    			</div>
                <div 
                    className="btn Primary"
                    onClick={()=>{this.subform()}}
                    >
                    确定</div>
    		</div>
    	)
    }
}

const data = ({userlogin:{usertype}}) => {
    return {usertype};
};

Page = connect(data)(Page);
export default Page;
