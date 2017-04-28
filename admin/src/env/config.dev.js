let islocalhost = true;
let serverurl = islocalhost?'http://localhost:3100':'http://shuizhihe.com28.cn:3100';
export default {
    restserverurl:serverurl +'/adminapi',
    serverurl:serverurl
};
