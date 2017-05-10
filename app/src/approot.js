/**
 * Created by wangxiaoqing on 2017/3/27.
 */
import React from 'react';

import WeuiTool from './components/tools/weuitool';

//测试
import Test from "./components/test";
//跳转首页
import Index from "./components/index";
//登录
import Login from "./components/login";
//注册
import Register from "./components/register";
//忘记密码
import ResetPassword from "./components/resetpassword";
//选择用户类型
import UserType from "./components/usertype";
//设置
import Settings from "./components/settings";

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


/*放款端*/
//首页
import BossIndex from "./components/boss/index";
//首页
import BossFiller from "./components/boss/filler";
//个人中心
import BossUserCenter from "./components/boss/usercenter";
//借款人详情
import BossAddLoan from "./components/boss/addloan";
//我的放款列表  //未完成
import BossLoanList from "./components/boss/loanlist";
//放款详情  //未完成
//import BossLoanList from "./components/boss/loanlist";


/*中介端*/
import AgencyIndex from "./components/agency/index";
//中介个人中心
import AgencyUserCenter from "./components/agency/usercenter";
//借款列表
import AgencyBorrowList from "./components/agency/borrowlist";

import {requireAuthentication} from './components/requireauthentication';


import {
    HashRouter as Router,
    Route,Redirect,
    Switch
} from 'react-router-dom';

const CoApp = (props) => {
    let CustomRoute = Route;
    return (
        <Switch>
            <CustomRoute exact path="/" component={Index}/>
            <CustomRoute exact path="/test" component={Test}/>
            <CustomRoute exact path="/usertype" component={UserType}/>
            <CustomRoute exact path="/login" component={Login}/>
            <CustomRoute exact path="/register" component={Register}/>
            <CustomRoute exact path="/userindex" component={UserIndex}/>
            <CustomRoute exact path="/bossindex" component={BossIndex}/>
            <CustomRoute exact path="/settings" component={Settings}/>


            <CustomRoute exact path="/agencyindex" component={AgencyIndex}/>
            <CustomRoute exact path="/agencyusercenter" component={AgencyUserCenter}/>
            <CustomRoute exact path="/agencyborrowlist" component={AgencyBorrowList}/>

            <CustomRoute exact path="/bossaddloan" component={BossAddLoan}/>
            <CustomRoute exact path="/bossfiller" component={BossFiller}/>
            <CustomRoute exact path="/bossusercenter" component={BossUserCenter}/>
            <CustomRoute exact path="/bossloanlist" component={BossLoanList}/>

            <CustomRoute exact path="/addborrow" component={AddBorrow}/>
            <CustomRoute exact path="/addBorrowUserInfo" component={AddBorrowUserInfo}/>
            <CustomRoute exact path="/usercenter" component={UserCenter}/>
            <CustomRoute exact path="/borrowlist" component={BorrowList}/>
            <CustomRoute exact path="/borrowinfo" component={BorrowInfo}/>
            <CustomRoute exact path="/validation" component={Validation}/>
            <CustomRoute exact path="/borrowuserinfo" component={BorrowUserInfo}/>
            <CustomRoute exact path="/addborrowuserinfo" component={AddBorrowUserInfo}/>
            <CustomRoute exact path="/validationshenfen" component={ValidationShenfen}/>
            <CustomRoute exact path="/validationphone" component={ValidationPhone}/>
            <CustomRoute exact path="/validationtaobao" component={ValidationTaobao}/>
            <CustomRoute exact path="/validationzhima" component={ValidationZhima}/>




        </Switch>
    );
}


//app
class AppRoot extends React.Component {
    render() {
        return (
            <div className="AppContainer">
                <WeuiTool />
                <CoApp />
            </div>
        );
    }
}

export default AppRoot;
