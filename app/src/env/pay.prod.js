import config from './config';

export const payorder = (paysign,orderinfo,callbackfn)=>{
  // let postdata = {
  //     "out_trade_no":orderinfo._id
  // };
  // requestpost('/pay/alipaytest',postdata,(err,result)=>{
  //       console.log("testpost err:" + JSON.stringify(err));
  //       console.log("testpost result:" + JSON.stringify(result));
  //       callbackfn(result);
  // });
  	//console.log(paysign);
  	wx.chooseWXPay({
	    timestamp: paysign.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
	    nonceStr: paysign.noncestr, // 支付签名随机串，不长于 32 位
	    package: paysign.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
	    signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
	    paySign: paysign.sign, // 支付签名
	    success: function (res) {
	        // 支付成功后的回调函数
	        console.log("支付成功");
	        console.log(res);
	    }
	});
}
