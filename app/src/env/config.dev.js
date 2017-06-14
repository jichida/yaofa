let islocalhost = false;
let config = {
  serverurl:islocalhost?'http://localhost:43002':'http://xy.mrtejia.cn',//'http://localhost:3100'
  appversion : "1.0",
  refreshmyorderinterval:5000,//5秒
  refreshsysconfiginterval:60000*5,//5分钟
  appid : "wx3af7abcbb0dc3669",
  redirect_uri : "http://xy.mrtejia.cn/app/getopenid",
  redirect_uri_renzheng : "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx3af7abcbb0dc3669&redirect_uri=http%3A%2F%2Fxy.mrtejia.cn%2fapp%2fgetopenid&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect",
  CustomerService : "0519-88888888",
};

export default config;
