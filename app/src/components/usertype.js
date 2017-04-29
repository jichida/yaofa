import React, { Component } from 'react';
import DocumentTitle from "react-document-title";
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import '../../public/css/usertype.css';
const {
    Icon,
    Form,
    FormCell,
    CellHeader,
    Checkbox,
    CellBody
    } = WeUI;

class Page extends Component {

	render() {
        return (
    		<div className="usertypePage AppPage">
    			<DocumentTitle title="用户类型" />
                <div className="usertypePageTitle">选择你要注册的身份</div>
    			<div className="list">
    				<div className="li">
                        <img src="img/22.png" />
    					<div>
                            <Checkbox name="checkbox1" value="1"/>
                            <span>借款人</span>
                        </div>
    				</div>
    				<div className="li">
                        <img src="img/23.png" />
                        <div className="sel">
                            <Checkbox name="checkbox1" value="1"/>
                            <span>老板</span>
                        </div>
                    </div>
                    <div className="li">
                        <img src="img/24.png" />
                        <div>
                            <Checkbox name="checkbox1" value="1"/>
                            <span>中介</span>
                        </div>
                    </div>
    			</div>
                <div className="btn Primary">确定</div>
    		</div>
    	)
    }
}

export default Page;