import {
    register_request,
} from '../actions';

let setusertype = (usertype)=>{
    localStorage.setItem('usertype',usertype);
}

let test_register =(dispatch,usertype)=>{
    setusertype(usertype);

    let payload = {
        username:'15961125167',
        authcode:'9235',
        password:'123456',
    };
    if(usertype === 'userborrow'){
        payload.invitecode = '';
    }
    else if(usertype === 'userlender'){

    }
    else  if(usertype === 'useragency'){

    }
    dispatch(register_request(payload));
}


export {
    test_register,
};