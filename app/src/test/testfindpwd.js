import {
  findpwd_request,
} from '../actions';

let setusertype = (usertype)=>{
    localStorage.setItem('usertype',usertype);
}

let test_findpwd =(dispatch,usertype)=>{
    setusertype(usertype);

    let payload = {};
    if(usertype === 'userborrow'){
      payload = {
        username:'15961125167',
        authcode:'6699',
      }
    }
    else if(usertype === 'userlender'){
      payload = {
        username:'15961125167',
        authcode:'6699',
      }
    }
    else  if(usertype === 'useragency'){
      payload = {
        username:'15961125167',
        authcode:'6699',
      }
    }
    dispatch(findpwd_request(payload));
}


export {
  test_findpwd,
};