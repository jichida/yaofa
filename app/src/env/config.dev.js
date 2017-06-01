let islocalhost = false;
let config = {
  serverurl:islocalhost?'http://localhost:43002':'http://wx.mrtejia.cn:43002',//'http://localhost:3100'
  appversion : "1.0",
  refreshmyorderinterval:5000,//5秒
  refreshsysconfiginterval:60000*5//5分钟
};

export default config;
