/**
 * Created by wangxiaoqing on 2017/3/25.
 */
import { createAction } from 'redux-act';

export const register_request = createAction('register_request');
export const register_result = createAction('register_result');
export const loginwithweixinopenid_request  = createAction('loginwithweixinopenid_request');
export const loginwithtoken_request  = createAction('loginwithtoken_request');
export const loginwithusername_request  = createAction('loginwithusername_request');
export const login_request = createAction('login_request');
export const login_result = createAction('login_result');
export const sendauth_request = createAction('sendauth_request');
export const sendauth_result = createAction('sendauth_result');
export const findpwd_request = createAction('findpwd_request');
export const findpwd_result = createAction('findpwd_result');
export const fillprofile_request = createAction('fillprofile_request');
export const fillprofile_result = createAction('fillprofile_result');
export const logout_request = createAction('logout_request');
export const logout_result = createAction('logout_result');
export const userauthentication_request  = createAction('userauthentication_request');
export const userauthentication_result = createAction('userauthentication_result');
export const userauthenticationhtml_request  = createAction('userauthenticationhtml_request');
export const userauthenticationhtml_result = createAction('userauthenticationhtml_result');
export const fillrealnameprofile_request = createAction('fillrealnameprofile_request');
export const fillrealnameprofile_result = createAction('fillrealnameprofile_result');
export const queryuserstatus_request = createAction('queryuserstatus_request');
export const queryuserstatus_result = createAction('queryuserstatus_result');


//选择用户类型
export const user_type = createAction('user_type');
