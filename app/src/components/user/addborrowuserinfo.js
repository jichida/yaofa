/*
    借款详情
*/
import React, { Component } from 'react';
import DocumentTitle from "react-document-title";
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import '../../../public/css/borrowuserinfo.css';
const { 
    Form,
    FormCell,
    CellHeader,
    CellBody,
    Label,
    Input,
    Select,
    Checkbox
    } = WeUI;

class Page extends Component {

	render() {
        return (
    		<div className="borrowuserinfoPage AppPage">
    			<DocumentTitle title="完善借款资料" />
                <div className="pageTitle"><span>完善借款资料</span></div>
                <div className="form">
                    <Form className="formStyle1">
                        <FormCell select selectPos="after">
                            <CellHeader>
                                <Label><span>户籍</span></Label>
                            </CellHeader>
                            <CellBody>
                                <Select data={[
                                    {
                                        value: 1,
                                        label: '临时周转'
                                    },
                                    {
                                        value: 2,
                                        label: '买房'
                                    },
                                    {
                                        value: 3,
                                        label: '买车'
                                    }
                                ]} />
                            </CellBody>
                        </FormCell>
                        <FormCell>
                            <CellHeader>
                                <Label><span>花呗额度</span></Label>
                            </CellHeader>
                            <CellBody>
                                <Input type="tel" placeholder="请输入花呗额度"/>
                                <span>元</span>
                            </CellBody>
                        </FormCell>
                        <FormCell>
                            <CellHeader>
                                <Label><span>借呗额度</span></Label>
                            </CellHeader>
                            <CellBody>
                                <Input type="tel" placeholder="请输入借呗额度"/>
                                <span>元</span>
                            </CellBody>
                        </FormCell>
                        <FormCell>
                            <CellHeader>
                                <Label><span>借贷宝负债</span></Label>
                            </CellHeader>
                            <CellBody>
                                <Input type="tel" placeholder="借贷宝负债金额"/>
                                <span>元</span>
                            </CellBody>
                        </FormCell>
                        <FormCell>
                            <CellHeader>
                                <Label><span>借贷宝已还</span></Label>
                            </CellHeader>
                            <CellBody>
                                <Input type="tel" placeholder="借贷宝已还金额"/>
                                <span>元</span>
                            </CellBody>
                        </FormCell>
                        <FormCell select selectPos="after">
                            <CellHeader>
                                <Label><span>手机号实名时间</span></Label>
                            </CellHeader>
                            <CellBody>
                                <Select data={[
                                    {
                                        value: 1,
                                        label: '1年'
                                    },
                                    {
                                        value: 2,
                                        label: '2年'
                                    },
                                    {
                                        value: 3,
                                        label: '3年'
                                    }
                                ]} />
                            </CellBody>
                        </FormCell>
                    </Form>
                    <Form className="formStyle1">
                        <FormCell checkbox>
                            <CellHeader>
                                <Label><span>是否有固定资产</span></Label>
                            </CellHeader>
                            <CellBody>
                                <Checkbox name="" value="" />
                            </CellBody>
                        </FormCell>
                        <FormCell checkbox>
                            <CellHeader>
                                <Label><span>是否有工作单位</span></Label>
                            </CellHeader>
                            <CellBody>
                                <Checkbox name="" value="" />
                            </CellBody>
                        </FormCell>
                        <FormCell checkbox>
                            <CellHeader>
                                <Label><span>是否有公积金</span></Label>
                            </CellHeader>
                            <CellBody>
                                <Checkbox name="" value="" />
                            </CellBody>
                        </FormCell>
                        <FormCell checkbox>
                            <CellHeader>
                                <Label><span>是否有社保</span></Label>
                            </CellHeader>
                            <CellBody>
                                <Checkbox name="" value="" />
                            </CellBody>
                        </FormCell>
                        <FormCell checkbox>
                            <CellHeader>
                                <Label><span>三号是否统一</span></Label>
                            </CellHeader>
                            <CellBody>
                                <Checkbox name="" value="" />
                            </CellBody>
                        </FormCell>
                        <FormCell checkbox>
                            <CellHeader>
                                <Label><span>有无今日还款</span></Label>
                            </CellHeader>
                            <CellBody>
                                <Checkbox name="" value="" />
                            </CellBody>
                        </FormCell>
                        <FormCell checkbox>
                            <CellHeader>
                                <Label><span>有无身份证原件</span></Label>
                            </CellHeader>
                            <CellBody>
                                <Checkbox name="" value="" />
                            </CellBody>
                        </FormCell>
                    </Form>
                </div>
                <div className="submitBtn">
                    <botton className="btn Primary">确定</botton>
                </div>
    		</div>
    	)
    }
}

export default Page;