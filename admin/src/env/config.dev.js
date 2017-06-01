let islocalhost = false;
let serverurl = islocalhost?'http://localhost:43002':'http://wx.mrtejia.cn:43002';
export default {
    restserverurl:serverurl +'/adminapi',
    serverurl:serverurl
};
