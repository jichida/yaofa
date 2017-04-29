import {
  getabouthtml_request,
} from '../actions';

//测试新增一个签到获取积分／分享获取积分
let test_getabouthtml_request=(dispatch)=>{
  dispatch(getabouthtml_request({keyname:'helpcenter'}));
  dispatch(getabouthtml_request({keyname:'aboutus'}));
  dispatch(getabouthtml_request({keyname:'servicerule'}));
}


export {
  test_getabouthtml_request,
};