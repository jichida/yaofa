/**
 * Created by wangxiaoqing on 2017/3/25.
 */
import { put,takeEvery,call} from 'redux-saga/effects';
import {
  payorder
} from '../env/pay.js';

import {
  payorder_result,
  getpaysign_request,
  getpaysign_result
} from '../actions';
import { push,replace } from 'react-router-redux';//https://github.com/reactjs/react-router-redux

function takepay(param) {
    return new Promise(resolve => {
      payorder(param,(result)=>{
        resolve(result);
      });
    });
}

export function* payflow() {
    console.log(`payflow======>`);

    yield takeEvery(`${payorder_result}`, function*(action) {
          let {payload:result} = action;
          console.log(`payorder_result:${JSON.stringify(result)}`);
          const {orderinfo} = result;
          let orderdoc = {
             out_trade_no: orderinfo._id,
             subject: orderinfo.ordertitle || '商品名称',//$('#subject').val(),//'WL144626511265842',//$('#subject').val(),
             body: orderinfo.body|| '商品详情',//$('#body').val(),//'WL144626511265842',//
             total_fee: orderinfo.moneyreal*100,//$('#fee').val(),//'9.00',
           };
          yield put(getpaysign_request({
              paytype:'weixin',
              paypage:'orderdetailpage',
              orderdoc:orderdoc,
          });
          let { payload:paysign } = yield take(`${getpaysign_result}`);
    });


}
