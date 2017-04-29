import React, { Component } from 'react';
import DocumentTitle from "react-document-title";
//登录
import Login from "./components/login";
//注册
import Register from "./components/register";
//忘记密码
import ResetPassword from "./components/resetpassword";
//选择用户类型
import UserType from "./components/usertype";

/*
	借款人端
*/
//发布借款
import AddBorrow from "./components/user/addborrow";
//放款详情
import Loaninfo from "./components/user/loaninfo";
//用户中心
import UserCenter from "./components/user/usercenter";
//借款列表
import BorrowList from "./components/user/borrowlist";
//借款详情
import BorrowInfo from "./components/user/borrowinfo";
//忘记密码
import UserIndex from "./components/user/index";
//认证中心
import Validation from "./components/user/validation";
//认证-身份认证
import ValidationShenfen from "./components/user/validation-shenfen";
//认证-手机运营商认证
import ValidationPhone from "./components/user/validation-phone";
//认证-芝麻认证
import ValidationZhima from "./components/user/validation-zhima";
//认证-照片认证
import ValidationPhoto from "./components/user/validation-photo";
//认证-照片认证
import ValidationTaobao from "./components/user/validation-taobao";
//用户借款资料详情
import BorrowUserInfo from "./components/user/borrowuserinfo";
//完善借款资料
import AddBorrowUserInfo from "./components/user/addborrowuserinfo";
//设置
import Settings from "./components/user/settings";

/*放款端*/
//首页
import BossIndex from "./components/boss/index";
//个人中心
import BossUserCenter from "./components/boss/usercenter";
//借款人详情
import BossBorrowUserInfo from "./components/boss/borrowuserinfo";
//借款人详情
import BossAddLoan from "./components/boss/addloan";

class App extends Component {
    render() {
        return (
            <div className="AppContainer">
                <BossAddLoan />
            </div>
        );
    }
}

export default App;