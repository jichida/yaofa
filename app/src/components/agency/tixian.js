import React, { Component, PropTypes } from 'react';
import '../../../public/css/tixian.css';
import DocumentTitle from "react-document-title";
import { connect } from 'react-redux';
import {
    profit_set_tixianform,
    set_weui
} from '../../actions';

export class Page extends Component {

    componentWillMount() {
        this.props.dispatch(profit_set_tixianform({cashmoney: 0}));
    }

    onClickReturn =()=>{
        this.props.history.goBack();
    }

    setTixianprice =(e)=>{
        let val = e.target.value;
        if(val>this.props.balance){
            e.target.value = this.props.balance;
        }
        let payload = {
            cashmoney: parseInt(val),//提现金额
        }
        this.props.dispatch(profit_set_tixianform(payload));
    }

    onClickNext = (name)=> {
        if(this.props.profitform.cashmoney<=0){
            this.props.dispatch(set_weui({
                toast:{
                    show:true,
                    text: '提交失败',
                    type: 'warning'
                }})
            )
        }else{
            this.props.history.replace(name);
        }
    };

    render() {
        return (
            <div className="tixianPage AppPage">
                <DocumentTitle title="借款人详情" />
                <div className="headCont">
                    <div className="info">
                        <span className="profittit">提现金额</span>
                        <div className="priceinput">
                            <span className="number">¥</span>
                            <input onChange={(e)=>{this.setTixianprice(e)}}/>
                            <span className="txt">可提现金额 ¥{this.props.balance}</span>
                        </div>
                    </div>
                </div>
                <div className="buttoncon">
                    <button className="btn Primary" style={{width:"100%"}} onClick={()=>{this.onClickNext("/tixian2")}}>下一步</button>
                </div>
            </div>
        );
    }
}
const data =  ({userlogin,profit}) =>{ return {...userlogin, ...profit}};
export default connect(data)(Page);


