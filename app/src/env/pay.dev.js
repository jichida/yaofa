
import {
  requestpost,
} from '../util/util.js';

export const payorder = (paysign,orderinfo,callbackfn)=>{
  alert("JSON.stringify(paysign)"+JSON.stringify(paysign));
  console.log(paysign);
  let postdata = {
      "out_trade_no":orderinfo._id
  };
  // requestpost('/pay/weixintest',postdata,(err,result)=>{
  //     console.log("testpost err:" + JSON.stringify(err));
  //     console.log("testpost result:" + JSON.stringify(result));
  //     callbackfn(result);
  // });
  let onBridgeReady =()=>{
      console.log("onBridgeReady::::"+JSON.stringfiy(paysign));
      alert(paysign.appId);
      alert(paysign.timeStamp);
      alert(paysign.nonceStr);
      alert(paysign.package);
      alert(paysign.paySign);
     window.WeixinJSBridge.invoke(
         'getBrandWCPayRequest', {
            "appId": paysign.appId,
            "timeStamp": paysign.timeStamp,   
            "nonceStr": paysign.nonceStr,  
            "package": paysign.package,     
            "signType": "MD5",
            "paySign": paysign.paySign
         },
         function(res){     
             if(res.err_msg === "get_brand_wcpay_request:ok" ) {}     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
         }
     ); 
  }
  if (typeof window.WeixinJSBridge === "undefined"){
     if( document.addEventListener ){
         document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
     }else if (document.attachEvent){
         document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
         document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
     }
  }else{
     onBridgeReady();
  }
}
