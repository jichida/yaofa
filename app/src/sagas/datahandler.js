import {
    login_request,
    login_result,

    register_request,
    register_result,

    sendauth_request,
    sendauth_result,

    fillprofile_request,
    fillprofile_result,

    getabouthtml_request,
    getabouthtml_result,

    common_err,
} from '../actions';

//接收的对应关系
exports.recvmessagetoresultpair = {
  'register_result':register_result,
  'login_result':login_result,
  'loginsendauth_result':sendauth_result,
  'fillprofile_result':fillprofile_result,
  'getabouthtml_result':getabouthtml_result,
  'common_err':common_err,
};

//非验证发送接口
exports.sendmessagefnsz = {
    'login':`${login_request}`,
    'loginsendauth':`${sendauth_request}`,
    'register':`${register_request}`,
    'getabouthtml':`${getabouthtml_request}`,
};

//验证发送接口
exports.sendmessageauthfnsz = {
    'fillprofile':`${fillprofile_request}`,
};


