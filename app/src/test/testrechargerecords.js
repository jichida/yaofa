import {
  getrechargerecords_request,
} from '../actions';

//测试新增一个签到获取积分／分享获取积分
let test_getrechargerecords=(dispatch)=>{
  let page = 1;
  let perpagenumber = 10;
  let payload = {
    query:{},
    options:{
      page: page,
      limit: perpagenumber,
    }
  };
  dispatch(getrechargerecords_request(payload));
}


export {
  test_getrechargerecords,
};