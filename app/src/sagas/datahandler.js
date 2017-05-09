import {
    login_request,
    md_login_result,

    register_request,
    register_result,

    findpwd_request,
    findpwd_result,

    sendauth_request,
    md_loginsendauth_result,

    fillprofile_request,
    fillprofile_result,

    getabouthtml_request,
    getabouthtml_result,

    loginwithweixinopenid_request,
    insertorder_request,
    insertorder_result,
    getmyorders_request,
    getmyorders_result,
    acceptorder_request,
    acceptorder_result,
    confirmorder_request,
    confirmorder_result,
    queryintrestedorder_request,
    queryintrestedorder_result,

    userauthentication_request,
    userauthentication_result,

    getrechargerecords_request,
    getrechargerecords_result,

    getmyborrowusers_request,
    getmyborrowusers_result,

    loginwithtoken_request,
    logout_request,
    logout_result,
    common_err,
} from '../actions';

//接收的对应关系
exports.recvmessagetoresultpair = {
  'logout_result':logout_result,
  'getmyborrowusers_result':getmyborrowusers_result,
  'register_result':register_result,
  'login_result':md_login_result,
  'loginsendauth_result':md_loginsendauth_result,
  'fillprofile_result':fillprofile_result,
  'getabouthtml_result':getabouthtml_result,
  'common_err':common_err,
  'findpwd_result':findpwd_result,
  'insertorder_result':insertorder_result,
  'getmyorders_result':getmyorders_result,
  'acceptorder_result':acceptorder_result,
  'confirmorder_result':confirmorder_result,
  'queryintrestedorder_result':queryintrestedorder_result,
  'userauthentication_result':userauthentication_result,
  'getrechargerecords_result':getrechargerecords_result
};

//非验证发送接口
exports.sendmessagefnsz = {
    'loginwithtoken':loginwithtoken_request,
    'logout':logout_request,
    'login':login_request,
    'loginsendauth':sendauth_request,
    'loginwithweixinopenid':loginwithweixinopenid_request,
    'register':register_request,
    'getabouthtml':getabouthtml_request,
    'findpwd':findpwd_request,
    'queryintrestedorder':queryintrestedorder_request,
};

//验证发送接口
exports.sendmessageauthfnsz = {
    'fillprofile':fillprofile_request,
    'insertorder':insertorder_request,
    'acceptorder':acceptorder_request,
    'getmyorders':getmyorders_request,
    'confirmorder':confirmorder_request,
    'userauthentication':userauthentication_request,
    'getrechargerecords':getrechargerecords_request,
    'getmyborrowusers':getmyborrowusers_request,
};
