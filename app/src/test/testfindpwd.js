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
        password:'123456',
        invitecode:'',
      }
    }
    else if(usertype === 'userlender'){

    }
    else  if(usertype === 'useragency'){

    }
    dispatch(findpwd_request(payload));
}


export {
  test_findpwd,
};