let islocalhost = true;
let serverurl = islocalhost?'http://localhost:43002':'http://shuizhihe.com28.cn:43002';
export default {
    restserverurl:serverurl +'/adminapi',
    serverurl:serverurl
};
