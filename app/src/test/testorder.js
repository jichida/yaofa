import {
  loginwithweixinopenid_request,
  insertorder_request,
  getmyorders_request,
  acceptorder_request,
  confirmorder_request
} from '../actions';

let setusertype = (usertype)=>{
    localStorage.setItem('usertype',usertype);
}

let test_userloginborrow = (dispatch)=>{
    setusertype('userborrow');
    dispatch(loginwithweixinopenid_request({weixinopenid:'39927caa-fa12-4704'}));
}
let test_insertorder =(dispatch)=>{
    let order = {
        moneylimit:1000,//借款额度
        moneyperiod:20,//借款周期（天）
        moneyusefor:'还信用卡',//借款用途
    };
    dispatch(insertorder_request(order));
};
let test_confirmorder =(dispatch)=>{
     let payload = {
        query:{_id:'59049c2211c8c9932f7f2006'},
    };
    dispatch(confirmorder_request(payload));
};
let test_userloginlender =(dispatch)=>{
    setusertype('userlender');
    dispatch(loginwithweixinopenid_request({weixinopenid:'39927caa-fa12-4704'}));
};

let test_acceptorder =(dispatch)=>{
    let payload = {
        query:{_id:'59049c2211c8c9932f7f2006'},
        data:{
            moneylender:800,//放款额度
            feeservice:80,//服务费
            depositratio:10,//押金比
        }
    };
    dispatch(acceptorder_request(payload));
};

let test_userloginagency =(dispatch)=>{
    setusertype('useragency');
    dispatch(loginwithweixinopenid_request({weixinopenid:'39927caa-fa12-4704'}));
};


let test_getmyorders =(dispatch)=>{
    dispatch(getmyorders_request({query:{}}));
};

export {
    test_userloginborrow,
    test_insertorder,
    test_userloginlender,
    test_acceptorder,
    test_getmyorders,
    test_userloginagency,
    test_confirmorder
};