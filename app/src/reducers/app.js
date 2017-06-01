import { createReducer } from 'redux-act';
import {
  getsystemconfig_result
} from '../actions/index.js';
import $ from "jquery";

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
        console.log("state.weixintoken:::"+JSON.stringify(state.weixintoken)); 
        const {weixintoken:oldweixintoken} = state;
        const statecode = (new Date()).getTime();
        //const posturl = "https://open.weixin.qq.com/connect/qrconnect?appid=wx8ec8ba53700c0c89&redirect_uri=http%3A%2F%2Fwx.mrtejia.cn%2fapp%2fgetopenid&response_type=code&scope=snsapi_login&state="+statecode+"#wechat_redirect"
        const posturl = "https://open.weixin.qq.com/connect/qrconnect?appid=wx8ec8ba53700c0c89&redirect_uri=http%3A%2F%2Fwx.mrtejia.cn%2fapp%2fgetopenid&response_type=code&scope=snsapi_login&state=3d6be0a4035d839573b04816624a415e#wechat_redirect";
        



        // $.ajax({
        //     type: "GET",
        //     url: posturl,
        //     success: function(msg){
        //         console.log("posturl success");
        //         console.log(msg);
        //     },
        //     error : function(msg){
        //         console.log("posturl error");
        //         console.log(msg);
        //     },
        // });




        //获取用户的openid
//         function getBaseInfo(){
//             //1.获取到code
//             let appid="wx8ec8ba53700c0c89";//这里的appid是假的演示用
//             let redirect_uri="http%3A%2F%2Fwx.mrtejia.cn%2fapp%2fgetopenid";//这里的地址需要http://
//             let url="https://open.weixin.qq.com/connect/oauth2/authorize?appid="+appid+"&redirect_uri="+redirect_uri+"&response_type=code&scope=snsapi_base&state=123#wechat_redirect";
//             header('location:'+$url);
//         }

//         function getUserOpenId(){
    //    //2.获取到网页授权的access_token
    //    $appid="qq1813284q1q6q8888";//这里的appid是假的演示用
    //    $appsecret="61qqqq36745987167q73bq1q2552qq75";//这里的appsecret是假的演示用
    //    $code=$_GET['code'];
    //    $url="https://api.weixin.qq.com/sns/oauth2/access_token?appid=".$appid."&secret=".$appsecret."&code=".$code."&grant_type=authorization_code ";
    //    //3.拉取用户的openid
    //    $res = $this->http_curl($url,'get');

// 　var_dump($res);//打印即可看到用户的openid

//}

        const {weixintoken} = payload;

        if((oldweixintoken.signature === '' || oldweixintoken.access_token === '' )
        && weixintoken.signature !== '' && weixintoken.access_token !== '' ){
          window.wx.config({
              debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
              appId: 'wx8ec8ba53700c0c89', // 必填，公众号的唯一标识
              timestamp: weixintoken.timestamp, // 必填，生成签名的时间戳
              nonceStr: weixintoken.nonce, // 必填，生成签名的随机串
              signature: weixintoken.signature,// 必填，签名，见附录1
              jsApiList: [
                "chooseWXPay",
                "getBrandWCPayRequest",
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
