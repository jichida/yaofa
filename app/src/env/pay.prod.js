//import {updateorder_request,ui_setorderdetail} from '../../actions';
import {getpaysign} from '../actions/sagacallback';
import * as xview from './xview/Common';

export const onclickpay = ({orderinfo,payway,dispatch},callbackfn)=> {

   let orderdoc = {
      out_trade_no: orderinfo._id,
      subject: orderinfo.ordertitle || '商品名称',//$('#subject').val(),//'WL144626511265842',//$('#subject').val(),
      body: orderinfo.body|| '商品详情',//$('#body').val(),//'WL144626511265842',//
      total_fee: orderinfo.realprice,//$('#fee').val(),//'9.00',
    };
    if(payway === 'weixin'){
        orderdoc.total_fee = orderdoc.total_fee*100;
    }
    dispatch(getpaysign({
        paytype:payway,
        paypage:'orderdetailpage',
        orderdoc:orderdoc,
    })).then((paysign)=>{
       if(payway === 'weixin'){
         xview.wxpayUrl(paysign,(result)=>{
          callbackfn(result);
        });
       }
       else if(payway === 'alipay'){
          xview.alipayUrl(paysign,(result)=>{
            callbackfn(result);
         });
       }
    }).catch((err)=>{
         alert(JSON.stringify(err));
         console.log('err:' + JSON.stringify(err));
    });
}