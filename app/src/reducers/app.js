import { createReducer } from 'redux-act';
import {
  getsystemconfig_result
} from '../actions/index.js';


const initial = {
    app: {
        curtabindex: 0,
        type: 'error',
        title: '',
        msg: '',
        ispop: false,
        newmsgnumber:0,
        islogin : false,//判断是否登录
        weixintoken:{
          signature:'',
          timestamp:'',
          nonce:'',
          access_token:'',
          expires_in:'',
        }
    },

};

const app = createReducer({
   [getsystemconfig_result]:(state, payload) => {
       const {weixintoken:oldweixintoken} = state;
       const {weixintoken} = payload;
       if((oldweixintoken.signature === '' || oldweixintoken.access_token === '' )
        && weixintoken.signature !== '' && weixintoken.access_token !== '' ){
          window.wx.config({
              debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
              appId: '', // 必填，公众号的唯一标识
              timestamp: weixintoken.timestamp, // 必填，生成签名的时间戳
              nonceStr: weixintoken.nonce, // 必填，生成签名的随机串
              signature: weixintoken.signature,// 必填，签名，见附录1
              jsApiList: [
                "chooseWXPay",
              ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          });
          window.wx.ready(function() {
            // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，
            // config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。
            // 对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
            // 定位
            // getLocation();
          });

          window.wx.error(function(res) {
          });


       }
       return { ...state,...payload}
   },
}, initial.app);

export default app;
