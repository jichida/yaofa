import {
    userauthentication_request
} from '../actions';

let test_userauthentication_id =(dispatch)=>{
    let payload = {
        type:'id',
        data:{
            truename:'wxq',  //真实用户名
            idcard:'23099123445555',//身份证号
        }
    };
    dispatch(userauthentication_request(payload));
}


let test_userauthentication_phone =(dispatch)=>{
    //注：这个接口很奇怪，照理应该分2步，1步实现不了
    let payload = {
        type:'phone',
        data:{
            phonenumber:'12961125167',//手机号
            phonepassword:'123456',//手机密码
        }
    };
    dispatch(userauthentication_request(payload));
}


let test_userauthentication_zhima =(dispatch)=>{
    let payload = {
        type:'zhima',
        data:{
            truename:'wxq',  //真实用户名
            idcard:'23099123445555',//身份证号
        }
    };
    dispatch(userauthentication_request(payload));
}


let test_userauthentication_taobao=(dispatch)=>{
    let payload = {
        type:'taobao',
        data:{
            taobaoaccount:'wxq',  //真实用户名
            taobaopassword:'23099123445555',//身份证号
        }
    };
    dispatch(userauthentication_request(payload));
}


let test_userauthentication_realname =(dispatch)=>{
    let payload = {
        type:'realname',
        data:{
            urlphoneid1:'wxq',  //真实用户名
            urlphoneid2:'23099123445555',//身份证号
            urlphoneid3:'',
        }
    };
    dispatch(userauthentication_request(payload));
}

export {
  test_userauthentication_id,
  test_userauthentication_phone,
  test_userauthentication_zhima,
  test_userauthentication_taobao,
  test_userauthentication_realname
};