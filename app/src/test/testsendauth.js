import {
  sendauth_request,
} from '../actions';

let setusertype = (usertype)=>{
    localStorage.setItem('usertype',usertype);
}

let test_sendauth=(dispatch)=>{
    setusertype('userborrow');
    let payload = {phonenumber:'15961125167'};
    dispatch(sendauth_request(payload));
}


export {
  test_sendauth,
};