
import {
  requestpost,
} from '../util/util.js';

export const payorder = (paysign,orderinfo,callbackfn)=>{
  alert("JSON.stringify(paysign)"+JSON.stringify(paysign));
  console.log("JSON.stringify(paysign)"+JSON.stringify(paysign));
  let postdata = {
      "out_trade_no":orderinfo._id
  };
  requestpost('/pay/weixintest',postdata,(err,result)=>{
      console.log("testpost err:" + JSON.stringify(err));
      console.log("testpost result:" + JSON.stringify(result));
      callbackfn(result);
  });
}
