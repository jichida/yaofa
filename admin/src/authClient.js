import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_CHECK, AUTH_ERROR  } from 'admin-on-rest';
import {apipost} from './util/util.js';

export default (type, params) => {
    if (type === AUTH_LOGIN) {
        return apipost('/adminauth',params).then(response => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response.data;
            })
            .then(({ loginsuccess,token }) => {
                console.log(`loginsuccess:${loginsuccess},token:${token}`);
                if(loginsuccess){
                    localStorage.setItem('admintoken', token);
                }
                else{
                    localStorage.removeItem('admintoken');
                }
            });
    }
    if (type === AUTH_ERROR) {
         return Promise.resolve();
    }
    if (type === AUTH_LOGOUT) {
        localStorage.removeItem('admintoken');
        return Promise.resolve();
    }
    if (type === AUTH_CHECK) {
        return localStorage.getItem('admintoken') ? Promise.resolve() : Promise.reject();
    }
    return Promise.reject('Unkown method');
};
