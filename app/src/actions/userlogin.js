/**
 * Created by wangxiaoqing on 2017/3/25.
 */
import { createAction } from 'redux-act';

export const register_request = createAction('register_request');
export const register_result = createAction('register_result');

export const login_request = createAction('login_request');
export const login_result = createAction('login_result');

export const sendauth_request = createAction('sendauth_request');
export const sendauth_result = createAction('sendauth_result');

export const fillprofile_request = createAction('fillprofile_request');
export const fillprofile_result = createAction('fillprofile_result');

export const logout_request = createAction('logout_request');
export const logout_result = createAction('logout_result');