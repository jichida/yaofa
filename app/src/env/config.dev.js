let islocalhost = false;
let config = {
  serverurl:islocalhost?'http://localhost:43002':'http://xy.mrtejia.cn',//'http://localhost:3100'
  appversion : "1.0",
  refreshmyorderinterval:5000,//5秒
  refreshsysconfiginterval:60000*5,//5分钟
  appid : "wx8ec8ba53700c0c89",
  redirect_uri : "http://xy.mrtejia.cn/app/getopenid"
};

export default config;
