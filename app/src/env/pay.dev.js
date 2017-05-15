
import {
  requestpost,
} from '../util/util.js';

export const payorder = (paysign,orderinfo,callbackfn)=>{
  let postdata = {
      "out_trade_no":orderinfo._id
  };
  requestpost('/pay/weixintest',postdata,(err,result)=>{
        console.log("testpost err:" + JSON.stringify(err));
        console.log("testpost result:" + JSON.stringify(result));
        callbackfn(result);
  });
}
