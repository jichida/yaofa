let islocalhost = true;
//let serverurl = islocalhost?'http://localhost:43002':'http://wx.mrtejia.cn';
let serverurl = islocalhost?'http://localhost:43002':'http://wx.yaofabank.com';
export default {
    restserverurl:serverurl +'/adminapi',
    serverurl:serverurl
};
