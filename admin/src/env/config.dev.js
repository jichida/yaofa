let islocalhost = false;
let serverurl = islocalhost?'http://localhost:43002':'http://www.mizhimeng.xyz:43002';
export default {
    restserverurl:serverurl +'/adminapi',
    serverurl:serverurl
};
