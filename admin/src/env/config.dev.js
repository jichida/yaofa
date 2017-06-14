let islocalhost = false;
let serverurl = islocalhost?'http://localhost:43002':'http://xy.mrtejia.cn';
export default {
    restserverurl:serverurl +'/adminapi',
    serverurl:serverurl
};
